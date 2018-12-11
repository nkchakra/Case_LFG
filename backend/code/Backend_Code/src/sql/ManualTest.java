package sql;

import static org.junit.Assert.assertEquals;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;

import org.json.JSONObject;


/**
 * NOTE:: This file was used for some manual testing, ignore it
 * @author nikhil
 *
 */
public class ManualTest {

	public static void main(String[] args) {
		// TODO Auto-generated method stub
		SQL_Connection conn = new SQL_Connection();
		conn.clearDatabase();
		conn.createUser("user", "f", "l", "pw");
		String id = conn.createPost("post1", "user","ALL","title1");
		List<JSONObject>matches = conn.searchInPosts("post");
		
		System.out.println("matches: "+matches.size());
		String db_post = matches.get(0).getString("post_content");
		System.out.println(db_post.equals("post1"));
		
		
		conn.deletePost(id);
		List<JSONObject> ms = conn.searchInPosts("post1");
		System.out.println("post_del: "+ms.size());
		
	}

}
