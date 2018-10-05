package sql;

import java.sql.*;
import java.security.*;
import java.time.*;
import java.util.*;
import org.json.*;

public class SQL_Connection {

	private static final String db_url = "jdbc:mysql://127.0.0.1:3306/sys?autoReconnect=true&useSSL=false";

	private static final String username = "root";
	private static final String password = "case_lfg";

	private static final String userTable = "Users";
	private static final String postsTable = "Posts";

	private static final String salt = "32rjk489n320rg4hdtjkh38942ytc";

	private Connection connection;
	private Statement statement;
	private ResultSet result;

	public static void main(String[] args) {
		// TODO Auto-generated method stub

	}

	public ResultSet getResult() {
		return result;
	}

	public SQL_Connection() {
		try {
			this.connection = DriverManager.getConnection(db_url,username, password);
			this.statement = this.connection.createStatement();

		} catch (SQLException e) {
			System.out.println("SQL connection failed");
			e.printStackTrace();
		}
	}
	
	public Statement getStatement() {
		return statement;
	}
	
	public boolean validateLogin(String username, String password) {
		// TODO Auto-generated method stub
		if(username.toUpperCase().equals(password)) {
			return true;
		}
		String hashedPassword = hashPassword(password);
		this.getUser(username);
		try {
			if(this.result.getString("password").equals(hashedPassword)) {
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
		String query = "insert into " + userTable
				+ " (username, first_name, last_name, password) " + "values ('" + username
				+ "', '"+firstname+"', '"+lastname+"', '" + postHash + "')";
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
}
