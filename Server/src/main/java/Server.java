import com.sun.net.httpserver.HttpExchange;
import com.sun.net.httpserver.HttpHandler;
import com.sun.net.httpserver.HttpServer;

import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStreamWriter;
import java.io.Writer;
import java.net.InetSocketAddress;
import java.net.URLDecoder;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class Server {

	public static void main(String[] args) throws Exception {
        HttpServer server = HttpServer.create(new InetSocketAddress(8001), 0);
        server.createContext("/hospitalNet_srv", new MyHandler());
        server.setExecutor(null); // creates a default executor
        server.start();
    }

    static class MyHandler implements HttpHandler {
        public void handle(HttpExchange exchange) throws IOException {
        	String encoding = "UTF-8";
        	Utf8LenCounter UTFSize = new Utf8LenCounter();

        	exchange.getResponseHeaders().set("Content-Type", "text/html; charset=" + encoding);
        	exchange.getResponseHeaders().add("Access-Control-Allow-Origin", "*");
        	Map<String,List<String>> postParams = this.decodePost(exchange);
        	String response = new String("");
        	String fuggveny = postParams.get("fuggveny").get(0);
        	if (fuggveny.compareTo("hozzaadas") == 0){      		
        		response = AdatbazisModul.hozzaadas(postParams.get("table").get(0), postParams.get("data").get(0));
        	}else if(fuggveny.compareTo("modositas") == 0){
        		response = AdatbazisModul.modositas(postParams.get("table").get(0), postParams.get("data").get(0));
        	}else if(fuggveny.compareTo("torles") == 0){
        		response = AdatbazisModul.torles(postParams.get("table").get(0), postParams.get("data").get(0));
        	}else if(fuggveny.compareTo("listazas") == 0){
        		response = AdatbazisModul.listazas(postParams.get("table").get(0), postParams.get("data").get(0));
        	}
        	exchange.sendResponseHeaders(200, UTFSize.length(response));
        	Writer out = new OutputStreamWriter(exchange.getResponseBody(), encoding);
        	out.write(response);
        	out.close();
        }
        
        private Map<String,List<String>> decodePost(HttpExchange exchange) throws IOException {
    		String encoding = "UTF-8";

    		// read the query string from the request body
    		String qry;
    		InputStream in = exchange.getRequestBody();
    		try {
    		    ByteArrayOutputStream out = new ByteArrayOutputStream();
    		    byte buf[] = new byte[4096];
    		    for (int n = in.read(buf); n > 0; n = in.read(buf)) {
    		        out.write(buf, 0, n);
    		    }
    		    qry = new String(out.toByteArray(), encoding);
    		} finally {
    		    in.close();
    		}
    		// parse the query
    		Map<String,List<String>> parms = new HashMap<String,List<String>>();
    		String defs[] = qry.split("[&]");
    		for (String def: defs) {
    		    int ix = def.indexOf('=');
    		    String name;
    		    String value;
    		    if (ix < 0) {
    		        name = URLDecoder.decode(def, encoding);
    		        value = "";
    		    } else {
    		        name = URLDecoder.decode(def.substring(0, ix), encoding);
    		        value = URLDecoder.decode(def.substring(ix+1), encoding);
    		    }
    		    List<String> list = parms.get(name);
    		    if (list == null) {
    		        list = new ArrayList<String>();
    		        parms.put(name, list);
    		    }
    		    list.add(value);
    		}
    		return parms;
    	}
        public class Utf8LenCounter {
      	  public int length(CharSequence sequence) {
      	    int count = 0;
      	    for (int i = 0, len = sequence.length(); i < len; i++) {
      	      char ch = sequence.charAt(i);
      	      if (ch <= 0x7F) {
      	        count++;
      	      } else if (ch <= 0x7FF) {
      	        count += 2;
      	      } else if (Character.isHighSurrogate(ch)) {
      	        count += 4;
      	        ++i;
      	      } else {
      	        count += 3;
      	      }
      	    }
      	    return count;
      	  }
      	}   
    }
}
