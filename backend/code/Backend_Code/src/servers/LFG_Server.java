package servers;

import java.io.IOException;
import java.net.ServerSocket;
import java.net.Socket;
import java.sql.Timestamp;
import java.time.LocalDateTime;
import java.util.List;

import org.json.JSONException;
import org.json.JSONObject;

import sql.SQL_Connection;

public class LFG_Server {

	private static final int portno = 6009;
	private static SQL_Connection conn;
	private static ServerSocket server;

	private static final String postCreate = "postCreate"; // done
	private static final String validateLogin = "validateLogin"; // done
	private static final String postComment = "postComment"; // done
	private static final String postSearch = "postSearch"; // done
	private static final String userRelateds = "userRelateds";
	private static final String userCreate = "userCreate"; // done

	public static void main(String[] args) {
		// TODO Auto-generated method stub
		try {
			server = new ServerSocket(portno);
			conn = new SQL_Connection();
			boolean run = true;
			while (run) {
				Socket sock = server.accept();
				System.out.println("conn made");
				new Thread(new LFG_Server().new SQL_Query(sock)).start();

			}
			server.close();
			conn.terminate();

		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}

	private class SQL_Query implements Runnable {

		private Socket socket;

		public SQL_Query(Socket sock) {
			socket = sock;
		}

		private JSONObject getData() {
			byte[] data = new byte[1024];
			try {
				this.socket.getInputStream().read(data);
				return new JSONObject(new String(data));
			} catch (IOException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
				return null;
			}
		}

		@Override
		public void run() {
			// TODO Auto-generated method stub
			JSONObject request = getData();
			if (request.get("queryType") == null) {
				sendErrorMessage(request);
			} else {
				// do stuff based on query type
			}
		}

		/**
		 * sends an error message
		 * 
		 * @param request
		 */
		private void sendErrorMessage(JSONObject request) {
			// TODO Auto-generated method stub
			try {
				this.socket.getOutputStream().write(new JSONObject().accumulate("queryResult", "failure")
						.accumulate("queryType", null).toString().getBytes());
				this.socket.close();
			} catch (JSONException | IOException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}

		}
		
		private void postCreate(JSONObject request) {
			String id = conn.createPost(request.getString("post_content"), request.getString("username"), request.getString("category"));
			JSONObject response = new JSONObject();
			if(!id.equals(LocalDateTime.MIN.toString())) {
				response.accumulate("queryResult", "success");
				response.accumulate("post_id", id);
			} else {
				response.accumulate("queryResult", "failure");
			}
			sendResponse(response);
			
		}

		private void validateLogin(JSONObject request) {
			boolean pass = conn.validateLogin(request.getString("username"), request.getString("password"));
			JSONObject response = new JSONObject();
			if (pass) {
				response.accumulate("queryResult", "success");
			} else {
				response.accumulate("queryResult", "failure");
			}
			sendResponse(response);
		}

		private void createUser(JSONObject request) {

			conn.createUser(request.getString("username"), request.getString("firstname"),
					request.getString("lastname"), request.getString("password"));
			JSONObject response = new JSONObject();
			if (conn.isUser(request.getString("username"))) {
				response.accumulate("queryResponse", "success");
			} else {
				response.accumulate("queryResponse", "failure");
			}
			sendResponse(response);

		}
		
		private void postComment(JSONObject request) {
			boolean success = conn.addComment(request.getString("comment"), request.getString("post_id"), request.getString("username"));
			JSONObject response = new JSONObject();
			
			if (success) {
				response.accumulate("queryResult", "success");
			}else {
				response.accumulate("queryResult", "failure");
			}
			sendResponse(response);
		
		}

		private void postSearch(JSONObject request) {

			List<JSONObject> posts = conn.searchInPosts(request.getString("searchfor"));
			JSONObject response = new JSONObject();
			// jsonListToJson(posts);
			for (JSONObject post : posts) {
				response.accumulate("posts", post);
			}
			response.accumulate("queryResponse", "success");
			response.accumulate("postsFound", posts.size());

			sendResponse(response);

		}
		
		private void userRelateds(JSONObject request) {
			List<JSONObject> posts = conn.userRelatedPosts(request.getString("username"));
			JSONObject response = new JSONObject();
			
			for (JSONObject post : posts) {
				response.accumulate("posts", post);
			}
			response.accumulate("postsFound", posts.size());
			response.accumulate("queryResult", "success");
			sendResponse(response);
			
		}

		private void userCreate(JSONObject request) {

			String time = conn.createPost(request.getString("post_content"), request.getString("username"),
					request.getString("category"));
			JSONObject response = new JSONObject();

			response.accumulate("queryReponse", "success").accumulate("post_id", conn.getPost(time));

			sendResponse(response);
		}
		
		private void sendResponse(JSONObject response) {
			try {
				this.socket.getOutputStream().write(response.toString().getBytes());
				this.socket.close();
			} catch (IOException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
		}
	}

}
