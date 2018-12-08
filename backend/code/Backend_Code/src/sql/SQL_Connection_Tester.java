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
	private static final String title = "test_title";
	private static final String comment = "test_comment_0";
	private static SQL_Connection conn;
	
	
	/**
	 * test to initialize sql connection
	 */
	@Test
	public void test1() {
		System.out.println("initializing SQL connection for testing");
		
		conn = new SQL_Connection();
		conn.clearDatabase();
		assertEquals(conn.getStatement() != null, true);

	}
	
	/**
	 * test to create user, validate login, and delete user
	 */
	@Test
	public void test2() {
		conn.createUser(user1, "Soumya", "Ray", pw);
		assertEquals(conn.isUser(user1),false);
		assertEquals(conn.validateLogin(user1, pw),true);
		assertEquals(conn.validateLogin(user1, pw+'p'),false);
		conn.deleteUser(user1);
		assertEquals(conn.isUser(user1),false);	

		
	}
	
	
	/**
	 * test to create post, search for all posts matching an input, and delete post
	 */
	@Test
	public void test3() {
		
		conn.createUser(user2, "Soumya2.0", "Ray", pw);
		String id = conn.createPost(post, user2,"ALL",title);
		List<JSONObject>matches = conn.searchInPosts(post);
		assertEquals(matches.size() >= 1,true);
		String db_post = matches.get(0).getString("post_content");
		assertEquals(db_post.equals(post),true);
		conn.deletePost(id);
		assertEquals(conn.searchInPosts(post).size() < matches.size(), true);

	}
	
	/**
	 * test to add a comment to a post
	 */
	@Test
	public void test4() {
		String id = conn.createPost(post, user2, "ALL",title);
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
	
	
	/**
	 * test to select posts by category
	 */
	@Test
	public void test5() {
		String id0 = conn.createPost(post, user2, "SPORT",title);
		String id1 = conn.createPost(post, user2, "MISC",title);
		String id2 = conn.createPost(post, user2, "GAME",title);
		
		List<JSONObject> sport = conn.categoryFilter("SPORT");
		List<JSONObject> misc = conn.categoryFilter("MISC");
		List<JSONObject> game = conn.categoryFilter("GAME");
		
		assertEquals(sport.get(0).getString("post_id").equals(id0),true);
		assertEquals(misc.get(0).getString("post_id").equals(id1),true);
		assertEquals(game.get(0).getString("post_id").equals(id2),true);
		
	}
	
	
	/**
	 * test to search for posts by user
	 */
	
	@Test
	public void test6() {
		conn.deleteAllPosts();
		String tempuser = "tempuser";
		String id1 = conn.createPost(tempuser, user1, "ALL", title);
		String id2 = conn.createPost(post, tempuser, "ALL", title);
		List<JSONObject> posts = conn.userRelatedPosts(tempuser);
		for (JSONObject post : posts) {
			assertEquals(true,post.getString("post_id").equals(id1) || post.getString("post_id").equals(id2));
		}
	
	}
	/**
	 * clears database, deletes connection to db
	 */
	@Test
	public void test999() {
		//conn.clearDatabase();
		conn.terminate();
	}


}
