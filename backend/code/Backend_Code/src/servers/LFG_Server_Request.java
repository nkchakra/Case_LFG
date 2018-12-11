package servers;

import java.io.IOException;
import java.time.LocalDateTime;
import java.util.List;
import org.json.JSONObject;

import org.eclipse.jetty.server.Server;
import org.eclipse.jetty.websocket.api.annotations.WebSocket;
import org.eclipse.jetty.websocket.api.Session;
import org.eclipse.jetty.websocket.api.annotations.OnWebSocketClose;
import org.eclipse.jetty.websocket.api.annotations.OnWebSocketConnect;
import org.eclipse.jetty.websocket.api.annotations.OnWebSocketError;
import org.eclipse.jetty.websocket.api.annotations.OnWebSocketMessage;
import org.eclipse.jetty.websocket.server.WebSocketHandler;
import org.eclipse.jetty.websocket.servlet.WebSocketServletFactory;

import sql.SQL_Connection;

/**
 * This file operates a server on port 6009 that receives queries from the front
 * end and sends responses
 * 
 * @author nikhil
 *
 */
public class LFG_Server_Request {
	/**
	 * variables used in the class
	 */
	private static final int portno = 6009;
	private static SQL_Connection conn;

	/**
	 * Strings representing the different types of queries the front end can send
	 */
	private static final String postCreate = "postCreate"; // done
	private static final String validateLogin = "validateLogin"; // done
	private static final String postComment = "postComment"; // done
	private static final String postSearch = "postSearch"; // done
	private static final String userRelateds = "userRelateds"; // done
	private static final String userCreate = "userCreate"; // done
	private static final String categoryFilter = "categoryFilter"; // done
	private static final String deletePost = "deletePost"; // done

	/**
	 * success or failure strings for query result, as well as some other results
	 */
	private static final String success = "success";
	private static final String failure = "failure";
	private static final String badCommand = "NO SUCH COMMAND:";
	private static final String missingCommand = "MISSING QUERY TYPE:";

	/**
	 * Class for websocket, this is what actually connects to the front end 1 web
	 * socket per front end connection
	 * 
	 * @author nikhil
	 *
	 */
	@WebSocket
	public static class MyWebSocketHandler {

		String response = "default";
		Session sess;

		/**
		 * when the socket is closed, state the code and why in the output
		 * 
		 * @param statusCode
		 * @param reason
		 */
		@OnWebSocketClose
		public void onClose(int statusCode, String reason) {
			System.out.println("Close: statusCode=" + statusCode + ", reason=" + reason);
		}

		/**
		 * if an error occurs, print to output
		 * 
		 * @param t
		 */
		@OnWebSocketError
		public void onError(Throwable t) {
			System.out.println("Error: " + t.getMessage());
		}

		/**
		 * when connected, store the session in this specific object
		 * 
		 * @param session
		 */
		@OnWebSocketConnect
		public void onConnect(Session session) {
			System.out.println("Connected to: " + session.getRemoteAddress().getAddress());
			sess = session;
		}

		/**
		 * this is called when the front end query is received. the message is the query
		 * in json format from the frontend, it is parsed and
		 * 
		 * @param message
		 */
		@OnWebSocketMessage
		public void onMessage(String message) {
			System.out.println("Message received: " + message);

			response = new LFG_Server_Request(new JSONObject(message)).run();
			try {
				sess.getRemote().sendString(response);
				System.out.println("sent response: \n" + response);
			} catch (IOException e) {
				System.out.println("failed to send response");
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
			this.sess.close();

			// sem.release();
		}

	}

	/**
	 * main method that runs on the backend. starts up a server for web sockets
	 * 
	 * @param args
	 */
	public static void main(String[] args) {
		// TODO Auto-generated method stub

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

	}

	/**
	 * class that acts as a thread for incoming queries from the front end
	 * 
	 * @author nikhil
	 *
	 */

	private JSONObject request;

	/**
	 * constructor
	 * 
	 * @param req-
	 *            json-style request from the front end, read in from web socket
	 */
	public LFG_Server_Request(JSONObject req) {
		request = req;
	}

	/**
	 * runs the
	 * 
	 * @return
	 */
	public String run() {
		// TODO Auto-generated method stub
		if (request.get("queryType") == null) {
			return missingCommand + "\n" + request.toString();
			// sendErrorMessage(request);
		} else {
			System.out.println("running for request:\n" + request.toString());
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
			} else if(request.getString("queryType").endsWith(deletePost)) {
				return this.deletePost(request).toString();
			}
			return badCommand + "\n" + request.toString();
		}

	}



	private JSONObject postCreate(JSONObject request) {
		JSONObject response = new JSONObject();
		try {
			String id = conn.createPost(request.getString("post_content"), request.getString("username"),
					request.getString("category"), request.getString("post_title"));

			if (!id.equals(LocalDateTime.MIN.toString())) {
				response.accumulate("queryResult", success);
				response.accumulate("post_id", id);
			} else {
				response.accumulate("queryResult", failure);
			}
		} catch (Exception e) {
			e.printStackTrace();
			response.accumulate("queryResult", failure);
		}
		return response;

	}

	private JSONObject validateLogin(JSONObject request) {
		JSONObject response = new JSONObject();
		try {
			boolean pass = conn.validateLogin(request.getString("username"), request.getString("password"));

			if (pass) {
				response.accumulate("queryResult", success);
			} else {
				response.accumulate("queryResult", failure);
			}
		} catch (Exception e) {
			e.printStackTrace();
			response.accumulate("queryResult", failure);
		}
		return response;
	}

	private JSONObject postComment(JSONObject request) {
		JSONObject response = new JSONObject();
		try {
			boolean worked = conn.addComment(request.getString("comment"), request.getString("post_id"),
					request.getString("username"));

			if (worked) {
				response.accumulate("queryResult", success);
			} else {
				response.accumulate("queryResult", failure);
			}
		} catch (Exception e) {
			e.printStackTrace();
			response.accumulate("queryResult", failure);
		}
		return response;
	}

	private JSONObject postSearch(JSONObject request) {
		JSONObject response = new JSONObject();
		try {
			List<JSONObject> posts = conn.searchInPosts(request.getString("searchfor"));

			// jsonListToJson(posts);
			for (JSONObject post : posts) {
				response.accumulate("posts", post);
			}
			response.accumulate("queryResult", success);
			response.accumulate("postsFound", posts.size());
		} catch (Exception e) {
			e.printStackTrace();
			response.accumulate("queryResult", failure);
		}

		return response;

	}

	private JSONObject userRelateds(JSONObject request) {
		JSONObject response = new JSONObject();
		try {
			List<JSONObject> posts = conn.userRelatedPosts(request.getString("username"));

			for (JSONObject post : posts) {
				response.accumulate("posts", post);
			}
			response.accumulate("postsFound", posts.size());
			response.accumulate("queryResult", success);
		} catch (Exception e) {
			e.printStackTrace();
			response.accumulate("queryResult", failure);
		}
		return response;

	}

	private JSONObject userCreate(JSONObject request) {

		JSONObject response = new JSONObject();
		try {

			boolean result = conn.createUser(request.getString("username"), request.getString("first_name"),
					request.getString("last_name"), request.getString("password"));
			System.out.println("user created");
			if (result) {
				response.accumulate("queryResult", success);
			} else {
				response.accumulate("queryResult", failure);
			}
		} catch (Exception e) {
			e.printStackTrace();
			response.accumulate("queryResult", failure);
		}

		return response;

	}

	private JSONObject categoryFilter(JSONObject request) {
		JSONObject response = new JSONObject();
		try {
			List<JSONObject> posts = conn.categoryFilter(request.getString("category"));
			response.accumulate("postsFound", posts.size());
			for (JSONObject post : posts) {
				response.accumulate("posts", post);
			}
			response.accumulate("queryResult", success);
			return response;
		} catch (Exception e) {
			e.printStackTrace();
			response.accumulate("queryResult", failure);
		}
		return response;

	}

	private JSONObject deletePost(JSONObject request) {
		JSONObject response = new JSONObject();
		try {
			boolean worked = conn.deletePost(request.getString("post_id"));
			if (worked) {
				response.accumulate("queryResult", success);
			} else {
				response.accumulate("queryResult", failure);
			}
			return response;
		} catch (Exception e) {
			e.printStackTrace();
			response.accumulate("queryResult", failure);
		}
		return response;
	}
}
