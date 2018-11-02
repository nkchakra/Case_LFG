package sql;

import static org.junit.Assert.assertEquals;
//import org.junit.internal.MethodSorter;

import java.sql.Timestamp;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.Map;

import org.json.JSONObject;
import org.junit.Test;

import org.junit.FixMethodOrder;
//import org.junit.jupiter.api.Test;
import org.junit.runners.MethodSorters;

@FixMethodOrder(MethodSorters.NAME_ASCENDING)
public class SQL_Connection_Tester {
	private static final String user1 = "sray01";
	private static final String user2 = "sray02";
	private static final String pw = "password1";
	private static final String post = "test_post_0";
	private static final String comment = "test_comment_0";
	private static SQL_Connection conn;
	
	
	
	@Test
	public void test1() {
		System.out.println("initializing SQL connection for testing");
		
		conn = new SQL_Connection();
		
		assertEquals(conn.getStatement() != null, true);

	}
	
	@Test
	public void test2() {
		conn.createUser(user1, "Soumya", "Ray", pw);
		assertEquals(conn.isUser(user1),true);
		assertEquals(conn.validateLogin(user1, pw),true);
		conn.deleteUser(user1);
		assertEquals(conn.isUser(user1),false);	
		
	}
	
	@Test
	public void test3() {
		
		conn.createUser(user2, "Soumya2.0", "Ray", pw);
		String id = conn.createPost(post, user2,"ALL");
		List<JSONObject>matches = conn.searchInPosts(post);
		assertEquals(matches.size() >= 1,true);
		String db_post = matches.get(0).getString("post_content");
		assertEquals(db_post.equals(post),true);
		conn.deletePost(id);
		assertEquals(conn.searchInPosts(post).size() < matches.size(), true);
	}
	
	@Test
	public void test4() {
		String id = conn.createPost(post, user2, "ALL");
		conn.addComment(comment, id, user2);
		JSONObject curr_post = conn.getPost(id.toString());
		Map<String, Object> comments = curr_post.getJSONObject("post_comments").toMap();
		assertEquals(comments.size()==1,true);
		for(String s : comments.keySet()) {
			String[] header = s.split("::");
			assertEquals(header[0].equals(user2),true);
			assertEquals(comments.get(s).equals(post),true);
		}
		conn.deletePost(id);
	}
	
	
	public static void main(String[] args) {
		// TODO Auto-generated method stub

	}

}
