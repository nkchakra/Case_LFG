package servers;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.OutputStream;
import java.io.UnsupportedEncodingException;
import java.net.InetSocketAddress;
import java.net.ServerSocket;
import java.net.Socket;
import java.net.URLDecoder;
import java.sql.Timestamp;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.concurrent.Executors;

import org.json.JSONException;
import org.json.JSONObject;

import sql.SQL_Connection;

import com.sun.net.httpserver.HttpExchange;
import com.sun.net.httpserver.HttpHandler;
import com.sun.net.httpserver.HttpServer;

public class LFG_Server {

	private static final int portno = 6009;
	private static SQL_Connection conn;
	private static ServerSocket server;

	private static final String postCreate = "postCreate"; // done
	private static final String validateLogin = "validateLogin"; // done
	private static final String postComment = "postComment"; // done
	private static final String postSearch = "postSearch"; // done
	private static final String userRelateds = "userRelateds"; // done
	private static final String userCreate = "userCreate"; // done
	private static final String categoryFilter = "categoryFilter"; // done
	private static final String phrase = "(msg_start)";

	static class postHandler implements HttpHandler{

		@Override
		public void handle(HttpExchange he) throws IOException {
			// TODO Auto-generated method stub
            Map<String, Object> parameters = new HashMap<String, Object>();
            InputStreamReader isr = new InputStreamReader(he.getRequestBody(), "utf-8");
            BufferedReader br = new BufferedReader(isr);
            String query = br.readLine();
            System.out.println("query: \n"+query);
            query = parseQuery(query);
           // send response
            
            String response = new LFG_Server().new SQL_Query(new JSONObject(query)).run();
            
            he.sendResponseHeaders(200, response.length());
            OutputStream os = he.getResponseBody();
            os.write(response.toString().getBytes());
            os.close();
			
			
		}
		
	}
	
	public static String parseQuery(String temp) {
	
		if(temp !=null) {
			temp = temp.substring(temp.indexOf(phrase)+phrase.length(),temp.length());
			return temp;
		}
		else {
			return "";
		}
	}
	

	
	
	public static void main(String[] args) {
		// TODO Auto-generated method stub

		try {
			HttpServer serv = HttpServer.create(new InetSocketAddress(portno),0);
			serv.createContext("/",new postHandler());
			serv.setExecutor(Executors.newCachedThreadPool());
			serv.start();
			System.out.println("server listening on port: "+portno);
		
		
		} catch (IOException e1) {
			// TODO Auto-generated catch block
			e1.printStackTrace();
		}
		
		
		
//		try {
//			server = new ServerSocket(portno);
//			conn = new SQL_Connection();
//			boolean run = true;
//			while (run) {
//				Socket sock = server.accept();
//				System.out.println("conn made");
//				new Thread(new LFG_Server().new SQL_Query(sock)).start();
//
//			}
//			server.close();
//			conn.terminate();
//
//		} catch (IOException e) {
//			// TODO Auto-generated catch block
//			e.printStackTrace();
//		}
	}

	/**
	 * class that acts as a thread for incoming queries from the front end
	 * 
	 * @author nikhil
	 *
	 */
	private class SQL_Query {

		private JSONObject request;

		public SQL_Query(JSONObject sock) {
			request = sock;
		}



		
		public String run() {
			// TODO Auto-generated method stub
			if (request.get("queryType") == null) {
				return null;
				//sendErrorMessage(request);
			} else {
				// do stuff based on query type
				if (request.getString("queryType").equals(postCreate)) {
					return this.postCreate(request).toString();
				} else if (request.getString("queryType").equals(validateLogin)) {
					return this.validateLogin(request).toString();
				} else if (request.getString("queryType").equals(postComment)) {
					return this.postComment(request).toString();

				} else if (request.getString("queryType").equals(postSearch)) {
					return this.postSearch(request).toString();

				} else if (request.getString("queryType").equals(userRelateds)) {
					return this.userRelateds(request).toString();

				} else if (request.getString("queryType").equals(userCreate)) {
					return this.userCreate(request).toString();
				} else if (request.getString("queryType").equals(categoryFilter)) {
					return this.categoryFilter(request).toString();
				}
			}
			return null;
		}

		/**
		 * sends an error message
		 * 
		 * @param request
		 */
		private void sendErrorMessage(JSONObject request) {
			// TODO Auto-generated method stub
//			try {
//				this.socket.getOutputStream().write(new JSONObject().accumulate("queryResult", "failure")
//						.accumulate("queryType", null).toString().getBytes());
//				this.socket.close();
//			} catch (JSONException | IOException e) {
//				// TODO Auto-generated catch block
//				e.printStackTrace();
//			}

		}

		private JSONObject postCreate(JSONObject request) {
			String id = conn.createPost(request.getString("post_content"), request.getString("username"),
					request.getString("category"));
			JSONObject response = new JSONObject();
			if (!id.equals(LocalDateTime.MIN.toString())) {
				response.accumulate("queryResult", "success");
				response.accumulate("post_id", id);
			} else {
				response.accumulate("queryResult", "failure");
			}
			return response;
			

		}

		private JSONObject validateLogin(JSONObject request) {
			boolean pass = conn.validateLogin(request.getString("username"), request.getString("password"));
			JSONObject response = new JSONObject();
			if (pass) {
				response.accumulate("queryResult", "success");
			} else {
				response.accumulate("queryResult", "failure");
			}
			return response;
		}

		private JSONObject createUser(JSONObject request) {

			conn.createUser(request.getString("username"), request.getString("firstname"),
					request.getString("lastname"), request.getString("password"));
			JSONObject response = new JSONObject();
			if (conn.isUser(request.getString("username"))) {
				response.accumulate("queryResponse", "success");
			} else {
				response.accumulate("queryResponse", "failure");
			}
			
			return response;
		}

		private JSONObject postComment(JSONObject request) {
			boolean success = conn.addComment(request.getString("comment"), request.getString("post_id"),
					request.getString("username"));
			JSONObject response = new JSONObject();

			if (success) {
				response.accumulate("queryResult", "success");
			} else {
				response.accumulate("queryResult", "failure");
			}
			
			return response;
		}

		private JSONObject postSearch(JSONObject request) {

			List<JSONObject> posts = conn.searchInPosts(request.getString("searchfor"));
			JSONObject response = new JSONObject();
			// jsonListToJson(posts);
			for (JSONObject post : posts) {
				response.accumulate("posts", post);
			}
			response.accumulate("queryResponse", "success");
			response.accumulate("postsFound", posts.size());

			return response;

		}

		private JSONObject userRelateds(JSONObject request) {
			List<JSONObject> posts = conn.userRelatedPosts(request.getString("username"));
			JSONObject response = new JSONObject();

			for (JSONObject post : posts) {
				response.accumulate("posts", post);
			}
			response.accumulate("postsFound", posts.size());
			response.accumulate("queryResult", "success");
			return response;

		}

		private JSONObject userCreate(JSONObject request) {

			conn.createUser(request.getString("username"), request.getString("first_name"),
					request.getString("last_name"), request.getString("password"));
			JSONObject response = new JSONObject();

			response.accumulate("queryReponse", "success");
			return response;
			
		}



		private JSONObject categoryFilter(JSONObject request) {
			List<JSONObject> posts = conn.categoryFilter(request.getString("category"));
			JSONObject response = new JSONObject();

			for (JSONObject post : posts) {
				response.accumulate("posts", post);
			}
			response.accumulate("queryResult", "success");
			return response;

		}
	}

}
