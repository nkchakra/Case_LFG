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
import java.util.concurrent.Semaphore;

import org.json.JSONException;
import org.json.JSONObject;

import org.eclipse.jetty.server.Server;
import org.eclipse.jetty.websocket.api.annotations.WebSocket;
import org.eclipse.jetty.websocket.api.Session;
import org.eclipse.jetty.websocket.api.WebSocketListener;
import org.eclipse.jetty.websocket.api.annotations.OnWebSocketClose;
import org.eclipse.jetty.websocket.api.annotations.OnWebSocketConnect;
import org.eclipse.jetty.websocket.api.annotations.OnWebSocketError;
import org.eclipse.jetty.websocket.api.annotations.OnWebSocketMessage;
import org.eclipse.jetty.websocket.server.WebSocketHandler;
import org.eclipse.jetty.websocket.servlet.WebSocketServletFactory;

import sql.SQL_Connection;

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


	
	public static String parseQuery(String temp) {
	
		if(temp !=null) {
			temp = temp.substring(temp.indexOf(phrase)+phrase.length(),temp.length());
			return temp;
		}
		else {
			return "";
		}
	}
	
	@WebSocket
	public static class MyWebSocketHandler {
		
		
		//Semaphore sem = new Semaphore(0);
		String response = "default";
	    Session sess;

		
		@OnWebSocketClose
		public void onClose(int statusCode, String reason) {
	        System.out.println("Close: statusCode=" + statusCode + ", reason=" + reason);
	    }

	    @OnWebSocketError
	    public void onError(Throwable t) {
	        System.out.println("Error: " + t.getMessage());
	    }

	    @OnWebSocketConnect
	    public void onConnect(Session session) {
	        System.out.println("Connected to: " + session.getRemoteAddress().getAddress());
	        sess = session;
//	        try {
//	        	//sem.acquire();
//	        	sess = session;
//	            //session.getRemote().sendString(response);
//	            //System.out.println("sent response: "+response);
//	        } catch (IOException e) {
//	            e.printStackTrace();
//	        }
	    }

	    @OnWebSocketMessage
	    public void onMessage(String message) {
	        System.out.println("Message received: " + message);
	        
	        response = new LFG_Server(new JSONObject(message)).run();
	        try {
				sess.getRemote().sendString(response);
				System.out.println("sent response: \n"+response);
			} catch (IOException e) {
				System.out.println("failed to send response");
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
	        
	        //sem.release();
	    }



	}

	public static void main(String[] args) {
		// TODO Auto-generated method stubMap<String, Object> paMap<String, Object> parametersMap<String, Object> parameterMap<String, Object> parameterMap<String, Object> parameters = new HashMap<String, Object>();s = new HashMap<String, Object>();s = new HashMap<String, Object>(); = new HashMap<String, Object>();rameters = new HashMap<String, Object>();

		try {
			conn = new SQL_Connection();
	        Server server = new Server(portno);
	        WebSocketHandler wsHandler = new WebSocketHandler() {
	            @Override
	            public void configure(WebSocketServletFactory factory) {
	                factory.register(MyWebSocketHandler.class);
	            }
	        };
	        server.setHandler(wsHandler);
	        server.start();
	        server.join();
		
		
		} catch (Exception e1) {
			// TODO Auto-generated catch block
			conn.terminate();
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


		private JSONObject request;

		public LFG_Server(JSONObject req) {
			request = req;
		}



		
		public String run() {
			// TODO Auto-generated method stub
			if (request.get("queryType") == null) {
				return null;
				//sendErrorMessage(request);
			} else {
				System.out.println("running for request:\n"+request.toString());
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
					System.out.println("doing for userCreate");
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
			response.accumulate("queryResult", "success");
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
			System.out.println("user created");
			JSONObject response = new JSONObject();

			response.accumulate("queryReponse", "success");
			System.out.println("response made");
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


