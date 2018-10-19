package sql;


import org.json.JSONObject;
import org.junit.*;
import java.sql.*;
import java.util.*;

import static org.junit.Assert.assertEquals;

import java.io.IOException;


public class SQL_Connection_Tester {
	private static final String user = "sray01";
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
		conn.createUser(user, "Soumya", "Ray", pw);
		assertEquals(conn.isUser(user),true);
		assertEquals(conn.validateLogin(user, pw),true);
		assertEquals(conn.deleteUser(user),true);
		assertEquals(conn.isUser(user),false);	
		
	}
	
	@Test
	public void test3() {
		conn.createUser(user, "Soumya", "Ray", pw);
		conn.createPost(post, user);
		List<JSONObject>matches = conn.searchInPosts(post);
		assertEquals(matches.size() == 1,true);
		String db_post = matches.get(0).getString("post_content");
		assertEquals(db_post.equals(post),true);
		conn.deleteOldPosts(0);
		assertEquals(conn.searchInPosts(post).size() == 0, true);
	}
	
	@Test
	public void test4() {
		Timestamp id = conn.createPost(post, user);
		
		conn.addComment(comment, id.toString(), user);
		JSONObject curr_post = conn.getPost(id.toString());
		Map<String, Object> comments = curr_post.getJSONObject("post_comments").toMap();
		// in progress
	}
	
	
	public static void main(String[] args) {
		// TODO Auto-generated method stub

	}

}
