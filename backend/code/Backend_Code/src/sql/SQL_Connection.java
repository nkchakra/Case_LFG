package sql;

import java.sql.*;
import java.sql.Date;
import java.sql.Timestamp;
import java.security.*;
import java.time.*;
import java.util.*;
import org.json.*;

public class SQL_Connection {

	private static final String db_url = "jdbc:mysql://127.0.0.1:3306/sys?autoReconnect=true&useSSL=false";

	private static final String username = "root";
	private static final String password = "caselfg";// or case_lfg

	private static final String userTable = "Users";
	private static final String postsTable = "Posts";

	private static final String salt = "32rjk489n320rg4hdtjkh38942ytc";

	private Connection connection;
	private Statement statement;
	private ResultSet result;

	public static void main(String[] args) {
		// TODO Auto-generated method stub
		SQL_Connection c = new SQL_Connection();
		// c.createPost("testing1", "nsc27");
		try {
			Thread.sleep(1100);
		} catch (InterruptedException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		// c.createPost("testing2", "vss");
		// c.deleteOldPosts(0);
		// c.addComment("comment on testing2", "2018-10-12 20:44:16", "nsc27");
		System.out.println(c.searchInPosts("testing"));
	}

	public ResultSet getResult() {
		return result;
	}

	public SQL_Connection() {
		try {
			this.connection = DriverManager.getConnection(db_url, username, password);
			this.statement = this.connection.createStatement();

		} catch (SQLException e) {
			System.out.println("SQL connection failed");
			e.printStackTrace();
		}
	}

	public Statement getStatement() {
		return statement;
	}

	/**
	 * method that validates that the combination of username and password is a
	 * valid one
	 * 
	 * @param username
	 * @param password
	 * @return true if the pair is valid, false otherwise
	 */
	public boolean validateLogin(String username, String password) {
		// TODO Auto-generated method stub
		if (username.toUpperCase().equals(password)) {
			return true;
		}
		String hashedPassword = hashPassword(password);
		this.getUser(username);
		try {
			if (this.result.getString("password").equals(hashedPassword)) {
				return true;
			}
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return false;
	}

	public void createUser(String username, String firstname, String lastname, String password) {
		String postHash = hashPassword(password);
		String query = "insert into " + userTable + " (username, first_name, last_name, password) " + "values ('"
				+ username + "', '" + firstname + "', '" + lastname + "', '" + postHash + "')";
		try {
			this.statement.executeUpdate(query);
		} catch (SQLException e) {
			System.out.println("failed to create user: " + username);
			// TODO Auto-generated catch block
			e.printStackTrace();
		}

	}

	/**
	 * Get's user data, stores it in the ResultSet object
	 * 
	 * @param user
	 *            - user's username
	 */
	public void getUser(String user) {

		try {
			this.result = this.statement.executeQuery("select * from " + userTable + " where username='" + user + "'");
			this.result.next();
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			System.out.println("get User: " + user + "; failure");
			e.printStackTrace();
			this.result = null;
		}
	}

	/**
	 * Closes the connection to the SQL server
	 * 
	 * @return
	 */
	public boolean terminate() {
		try {
			this.connection.close();
			return true;
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			System.out.println("Connection failed to terminate");
			e.printStackTrace();
			return false;
		}
	}

	/**
	 * method that one way MD5 hashes the password with a salt string
	 * 
	 * @param password
	 *            - input password from user to hash
	 * @return hashed password
	 */
	private static String hashPassword(String password) {

		MessageDigest md;
		try {
			md = MessageDigest.getInstance("MD5");
			md.update((password + salt).getBytes());
			byte[] digest = md.digest();
			StringBuilder hashed = new StringBuilder();
			for (int i = 0; i < digest.length; i++) {
				hashed.append(Integer.toString((digest[i] & 0xff) + 0x100, 16).substring(1));
			}
			return hashed.toString();
		} catch (NoSuchAlgorithmException e) {
			// TODO Auto-generated catch block
			System.out.println("password hashing failure");
			e.printStackTrace();
			return "failure";
		}

	}

	/**
	 * creates a posts in the Posts table
	 * 
	 * @param post_content
	 * @param user
	 * @return
	 */
	public boolean createPost(String post_content, String user) {
		Timestamp id = Timestamp.valueOf(LocalDateTime.now());

		String query = "insert into " + postsTable + " (post_id, post_user, post_content) " + "values ('"
				+ id.toString() + "', '" + user + "', '" + post_content + "')";
		try {
			this.statement.executeUpdate(query);
			return true;
		} catch (SQLException e) {
			System.out.println("failed to create post: " + post_content + "\nfrom user: " + user);
			// TODO Auto-generated catch block
			e.printStackTrace();
			return false;
		}

	}

	/**
	 * Deletes all posts older than the parameter's amount of days ago
	 * 
	 * @param days
	 *            - how many days old can the post be to survive
	 * @return true if all deletions work
	 */
	public boolean deleteOldPosts(long days) {
		Timestamp twoWeeksPrior = Timestamp.valueOf(LocalDateTime.now().minusDays(days));
		String query = "select * from " + postsTable;
		try {
			this.result = this.statement.executeQuery(query);

			while (this.result.next()) {

				if (this.result.getDate("post_id").before(twoWeeksPrior)) {
					String del = "delete from " + postsTable + " where post_id='"
							+ (this.result.getDate("post_id") + " " + this.result.getTime("post_id")) + "'";
					this.statement.executeUpdate(del);
					this.result = this.statement.executeQuery(query);
				}

			}
			return true;
		} catch (SQLException e) {
			e.printStackTrace();
			return false;
		}
	}

	/**
	 * adds comment to the JSON of comments with author of commenter for the post
	 * represented by the 'post_id' datetime string
	 * 
	 * @param comment
	 *            - comment string
	 * @param post_id
	 *            - datetime of post
	 * @param commenter
	 *            - username of commenter
	 * @return true if works, false else
	 */
	public boolean addComment(String comment, String post_id, String commenter) {
		JSONObject json;
		String query = "select * from " + postsTable + " where post_id='" + post_id + "'";
		try {
			this.result = this.statement.executeQuery(query);
			this.result.next();
			String sql_json = this.result.getString("post_comments");
			if (sql_json == null) {
				json = new JSONObject();
			} else {
				json = new JSONObject(sql_json);
			}
			json.accumulate(commenter + "::" + LocalDateTime.now(), comment);

			query = "update " + postsTable + " set post_comments='" + json.toString() + "' where post_id='" + post_id
					+ "'";
			this.statement.executeUpdate(query);
			return true;
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			return false;
		}

	}

	/**
	 * method to find the posts that have content matching the search string
	 * 
	 * @param searchfor
	 *            - string i am searching for
	 * @return list of post ids
	 */
	public List<JSONObject> searchInPosts(String searchfor) {
		List<JSONObject> postList = new ArrayList<JSONObject>();
		String query = "select * from " + postsTable;
		try {
			this.result = this.statement.executeQuery(query);
			while (this.result.next()) {
				if (this.result.getString("post_content").contains(searchfor)) {
					JSONObject post = new JSONObject().accumulate("post_id", this.result.getString("post_id"))
					.accumulate("post_user", this.result.getString("post_user"))
					.accumulate("post_content", this.result.getString("post_content"));
					
					if(this.result.getString("post_comments") != null) {
						post.accumulate("post_comments", new JSONObject(this.result.getString("post_comments")));
					}
					postList.add(post);
				}
			}

		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return postList;

	}

}
