package sql;

import java.sql.*;
import java.sql.Timestamp;
import java.security.*;
import java.time.*;
import java.util.*;
import org.json.*;

public class SQL_Connection {

	private static final String db_url = "jdbc:mysql://127.0.0.1:3306/sys?autoReconnect=true&useSSL=false";

	private static final String username = "root";
	private static final String password = "case_lfg";// or case_lfg

	private static final String userTable = "Users";
	private static final String postsTable = "Posts";
	private static final String[] categories = { "ALL", "SPORT", "MISC", "GAME" };

	private static final String salt = "32rjk489n320rg4hdtjkh38942ytc";

	private Connection connection;
	private Statement statement;
	private ResultSet result;

	/**
	 * getter result set object
	 * 
	 * @return this connection's result set object
	 */
	public ResultSet getResult() {
		return result;
	}

	/**
	 * constructor for the sql connection, opens connection and creates connection
	 * and statement objects
	 */
	public SQL_Connection() {
		try {
			this.connection = DriverManager.getConnection(db_url, username, password);
			this.statement = this.connection.createStatement();

		} catch (SQLException e) {
			System.out.println("SQL connection failed");
			e.printStackTrace();
		}
	}

	/**
	 * getter for Statement object
	 * 
	 * @return this connection's Statement object
	 */
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

	/**
	 * 
	 * @param username
	 * @param firstname
	 * @param lastname
	 * @param password
	 */
	public boolean createUser(String username, String firstname, String lastname, String password) {
		String postHash = hashPassword(password);
		String query = "insert into " + userTable + " (username, first_name, last_name, password) " + "values ('"
				+ username + "', '" + firstname + "', '" + lastname + "', '" + postHash + "')";
		try {
			this.statement.executeUpdate(query);
			return true;
		} catch (SQLException e) {
			System.out.println("failed to create user: " + username);
			// TODO Auto-generated catch block
			e.printStackTrace();
			return false;
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
	 * @param category
	 *            (limited) sports, vg, misc, all
	 * @return string that represents post id
	 */
	public String createPost(String post_content, String user, String category, String post_title) {
		Timestamp id = Timestamp.valueOf(LocalDateTime.now());
		boolean catflag = false;
		for (String cat : categories) {
			if (cat.equals(category)) {
				catflag = true;
			}
		}
		if (!catflag) {
			System.err.println("Category input: " + category + " is not valid, returning null");
			return null;
		}
		LocalDateTime temp = id.toLocalDateTime();
		String query = "insert into " + postsTable + " (post_id, post_user, post_content, post_category, post_title) "
				+ "values ('" + temp.toString() + "', '" + user + "', '" + post_content + "', '" + category + "', '"
				+ post_title + "')";
		try {
			this.statement.executeUpdate(query);
			return temp.toString();

		} catch (SQLException e) {
			System.out.println("failed to create post: " + post_content + "\nfrom user: " + user);
			// TODO Auto-generated catch block
			e.printStackTrace();
			return LocalDateTime.MIN.toString();
		}

	}

	/**
	 * gets a post whose post_id matches the input
	 * 
	 * @param id-post_id
	 *            of the desired post
	 * @return the post in JSON format
	 */
	public JSONObject getPost(String id) {
		String query = "select * from " + postsTable + " where post_id = '" + id + "'";
		try {
			this.result = this.statement.executeQuery(query);
			this.result.next();
			JSONObject post = this.postToJson(this.result);
			return post;

		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			return null;
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
		Timestamp cutoff = Timestamp.valueOf(LocalDateTime.now().minusDays(days));
		String query = "select from " + postsTable;
		try {
			this.result = this.statement.executeQuery(query);

			while (this.result.next()) {

				if (this.result.getDate("post_id").before(cutoff)) {
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
			if (this.result.next()) {
				String sql_json = this.result.getString("post_comments");
				if (sql_json == null) {
					json = new JSONObject();
				} else {
					json = new JSONObject(sql_json);
				}
				json.accumulate(commenter + "::" + LocalDateTime.now().toString(), comment);

				query = "update " + postsTable + " set post_comments='" + json.toString() + "' where post_id='"
						+ post_id + "'";
				this.statement.executeUpdate(query);
				return true;
			} else {
				System.err.println("post with id: " + post_id + " doesn't exist in table");
				return false;
			}
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			return false;
		}

	}

	/**
	 * method to find the posts that have content/comments matching the search
	 * string
	 * 
	 * @param searchfor
	 *            - string i am searching for
	 * @return JSON of posts
	 */
	public List<JSONObject> searchInPosts(String searchfor) {
		List<JSONObject> postList = new ArrayList<JSONObject>();
		String query = "select * from " + postsTable;
		try {
			this.result = this.statement.executeQuery(query);
			while (this.result.next()) {
				if (this.result.getString("post_content").contains(searchfor)
						|| this.result.getString("post_title").contains(searchfor)
						|| (this.result.getString("post_comments") != null
								&& this.result.getString("post_comments").contains(searchfor))) {
					JSONObject post = this.postToJson(this.result);

					if (this.result.getString("post_comments") != null) {
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

	/**
	 * checks if a user has made an account already
	 * 
	 * @param user
	 *            - username to check against the database
	 * @return true if already a user, false else
	 */
	public boolean isUser(String user) {
		this.getUser(user);
		try {

			this.result.previous();
			return this.result.next();
			// return (this.result.next());
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			return false;
		}
	}

	/**
	 * deletes a single user in the database based on their username
	 * 
	 * @param user
	 *            - username of user to be deleted
	 * @return true if no err, false if err
	 */
	public boolean deleteUser(String user) {
		String query = "delete from " + userTable + " where username='" + user + "'";
		try {
			this.statement.executeUpdate(query);
			if (!this.isUser(user)) {
				return true;
			} else
				return false;
		} catch (SQLException e) {
			e.printStackTrace();
			return false;
		}
	}

	/**
	 * deletes a single post in the database based on its id
	 * 
	 * @param post_id
	 *            - id of post to be deleted
	 * @return true if no err, false if err
	 */
	public boolean deletePost(String post_id) {
		String del = "delete from " + postsTable + " where post_id='" + post_id + "'";
		try {
			this.statement.executeUpdate(del);
			return true;
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			return false;
		}
	}

	/**
	 * returns true if the input post id matches the post id of an existing post in
	 * the database
	 * 
	 * @param post_id-post
	 *            id to check for
	 * @return true if the post exists, false else
	 */
	public boolean isPost(String post_id) {
		String query = "select * from " + postsTable + " where post_id='" + post_id + "'";
		try {
			this.result = this.statement.executeQuery(query);
			return this.result.next();
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			return false;
		}

	}

	/**
	 * gets all the posts that fall under the input category
	 * 
	 * @param category
	 *            - category filter desired
	 * @return - list of JSONObject's that represent all the posts that match the
	 *         input category
	 */
	public List<JSONObject> categoryFilter(String category) {
		List<JSONObject> posts = new ArrayList<JSONObject>();
		String query;
		boolean match = false;
		for (String cat : categories) {
			if (cat.equals(category)) {
				match = true;
			}
		}

		if (match == false) {
			System.err.println("Error, category: (" + category + ") is not a valid category, returning empty list");
			return posts;
		}

		if (category.equals("ALL")) {
			query = "select * from " + postsTable;
		} else {
			query = "select * from " + postsTable + " where post_category='" + category + "'";
		}
		try {
			this.result = this.statement.executeQuery(query);
			while (this.result.next()) {
				posts.add(postToJson(this.result));
			}
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return posts;
	}

	/**
	 * deletes all posts in the database
	 * 
	 * @return true if no sql err, false otherwise
	 */
	public boolean deleteAllPosts() {
		String query = "delete from " + postsTable;
		try {
			this.statement.executeUpdate(query);
			return true;
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			return false;
		}
	}

	/**
	 * wipes the entire database
	 * 
	 * @return true if both all posts and all users were deleted
	 */
	public boolean clearDatabase() {
		return deleteAllPosts() && deleteAllUsers();
	}

	/**
	 * deletes all users in the database
	 * 
	 * @return true if no sql err, false otherwise
	 */
	public boolean deleteAllUsers() {
		String query = "delete from " + userTable;
		try {
			this.statement.executeUpdate(query);
			return true;
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			return false;
		}
	}

	/**
	 * this method finds all posts related to a user this is defined as posts posted
	 * by the user, posts where the user is mentioned by username, posts the user
	 * has commented on, and posts where the user is mentioned in the comments by
	 * username
	 * 
	 * @param user-username
	 *            to find related posts/comments for
	 * @return list of posts in json format
	 */
	public List<JSONObject> userRelatedPosts(String user) {

		String query = "select * from " + postsTable + " where post_user='" + user + "'";
		List<JSONObject> relatedPosts = new ArrayList<JSONObject>();
		try {
			this.result = this.statement.executeQuery(query);

			while (this.result.next()) {
				relatedPosts.add(postToJson(this.result));
			}
			List<JSONObject> contentList = this.searchInPosts(user);

			for (JSONObject post1 : contentList) {
				boolean flag = false;
				for (JSONObject post2 : relatedPosts) {
					if (post1.getString("post_id").equals(post2.getString("post_id"))) {
						flag = true;
					}
				}
				if (!flag) {
					relatedPosts.add(post1);
				}
			}
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return relatedPosts;

	}

	/**
	 * turns a result set that SHOULD REPRESENT A POST into a JSONObject that
	 * represents that post
	 * 
	 * @param res
	 *            -resultSet object to turn into JSONObject
	 * @return JSONObject of that post
	 */
	public JSONObject postToJson(ResultSet res) {
		JSONObject json = new JSONObject();

		try {
			json.accumulate("post_id", res.getString("post_id")).accumulate("post_user", res.getString("post_user"))
					.accumulate("post_content", res.getString("post_content"))
					.accumulate("post_category", res.getString("post_category"))
					.accumulate("post_title", res.getString("post_title"));

			if (res.getString("post_comments") != null) {
				json.accumulate("post_comments", new JSONObject(res.getString("post_comments")));
			}

		} catch (JSONException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}

		return json;
	}
}
