package sql;

import static org.junit.Assert.assertEquals;

import java.util.List;
import java.util.Map;

import org.json.JSONObject;
import org.junit.Test;

import org.junit.FixMethodOrder;
import org.junit.runners.MethodSorters;

@FixMethodOrder(MethodSorters.NAME_ASCENDING)
public class SQL_Connection_Tester {
	
	/**
	 * some variables to be used in the testing, as well as the SQL connection 'conn'
	 */
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
		assertEquals(conn.isUser(user1),true);
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
		String id = conn.createPost(post+"1", user2,"ALL",title);
		List<JSONObject>matches = conn.searchInPosts(post);
		assertEquals(matches.size() == 1,true);
		String db_post = matches.get(0).getString("post_content");
		assertEquals(db_post.equals(post+'1'),true);
		conn.deletePost(id);
		List<JSONObject> ms = conn.searchInPosts(post);
		assertEquals(ms.size() < matches.size(), true);

	}
	
	/**
	 * test to add a comment to a post
	 */
	@Test
	public void test4() {
		String id = conn.createPost(post+"2", user2, "ALL",title);
		conn.addComment(comment, id, user2);
		JSONObject curr_post = conn.getPost(id.toString());
		Map<String, Object> comments = curr_post.getJSONObject("post_comments").toMap();
		assertEquals(comments.size()==1,true);
		for(String s : comments.keySet()) {
			String[] header = s.split("::");
			assertEquals(header[0].equals(user2),true);
			assertEquals(comments.get(s).equals(comment),true);
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
		conn.createUser(tempuser, "first", "last", "pw0");
		String other = "someoneelse";
		String id1 = conn.createPost("content", tempuser, "ALL", title);
		String id2 = conn.createPost("content plus "+tempuser, other, "ALL", title);
		String id3 = conn.createPost("will have comment", other, "SPORT", title);
		conn.addComment("comment with: "+tempuser, id3, other);
		
		String id4 = conn.createPost("will have comment from", other, "SPORT", title);
		conn.addComment("comment", id4, tempuser);
		List<JSONObject> posts = conn.userRelatedPosts(tempuser);
		assertEquals(posts.get(0).getString("post_id").equals(id1),true);
		assertEquals(posts.get(1).getString("post_id").equals(id2),true);
		assertEquals(posts.get(2).getString("post_id").equals(id3),true);
		assertEquals(posts.get(3).getString("post_id").equals(id4),true);
	}
	/**
	 * clears database, terminates connection to SQL DB
	 */
	@Test
	public void test999() {
		conn.clearDatabase();
		conn.terminate();
	}


}
