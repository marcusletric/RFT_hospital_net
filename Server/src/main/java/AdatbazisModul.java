
import java.io.File;
import java.io.IOException;
import java.io.StringReader;
import java.io.StringWriter;
import java.util.Set;
import java.util.logging.Level;
import java.util.logging.Logger;

import javax.xml.parsers.DocumentBuilder;
import javax.xml.parsers.DocumentBuilderFactory;
import javax.xml.parsers.ParserConfigurationException;
import javax.xml.transform.Transformer;
import javax.xml.transform.TransformerConfigurationException;
import javax.xml.transform.TransformerException;
import javax.xml.transform.TransformerFactory;
import javax.xml.transform.dom.DOMSource;
import javax.xml.transform.stream.StreamResult;

import org.json.JSONException;
import org.json.JSONObject;
import org.json.JSONArray;
import org.json.XML;
import org.w3c.dom.Document;
import org.w3c.dom.Element;
import org.w3c.dom.Node;
import org.w3c.dom.NodeList;
import org.xml.sax.InputSource;
import org.xml.sax.SAXException;

/**
 *
 * @author Peti
 */
public class AdatbazisModul {

	public static String dbPath = new String("src/xml/");
	
    public static String modositas(String xmlNev, String jsonStr) {
        String eredmeny = "false";
        DocumentBuilderFactory dbf = DocumentBuilderFactory.newInstance();

        try {
            JSONObject jsonObj = new JSONObject(jsonStr);
            String xmlStr = XML.toString(jsonObj);

            DocumentBuilder db = dbf.newDocumentBuilder();
            Document jsonXml = db.parse(new InputSource(new StringReader(xmlStr)));
            Document xml = db.parse(dbPath + xmlNev + ".xml");

            NodeList xmlNodeList = xml.getElementsByTagName(jsonXml.getDocumentElement().getNodeName());
            NodeList jsonIdList = jsonXml.getElementsByTagName("id");
            NodeList jsonChildList = jsonXml.getDocumentElement().getChildNodes();

            for (int i = 0; i < xmlNodeList.getLength(); i++) {
                Element elem = (Element) xmlNodeList.item(i);
                String id = elem.getElementsByTagName("id").item(0).getTextContent();
                if (id.equals(jsonIdList.item(0).getTextContent())) {
                    eredmeny = "true";
                    for (int j = 0; j < jsonChildList.getLength(); j++) {
                        elem.getElementsByTagName(jsonChildList.item(j).getNodeName()).item(0).setTextContent(jsonChildList.item(j).getTextContent());
                    }
                }
            }

            xml.normalize();

            TransformerFactory tf = TransformerFactory.newInstance();
            Transformer t = tf.newTransformer();
            DOMSource source = new DOMSource(xml);
            StreamResult sr = new StreamResult(new File(dbPath + xmlNev + ".xml"));
            t.transform(source, sr);

        } catch (JSONException ex) {
            return "false";
        } catch (TransformerException ex) {
            return "false";
        } catch (SAXException ex) {
            return "false";
        } catch (IOException ex) {
            return "false";
        } catch (ParserConfigurationException ex) {
            return "false";
        }
        return eredmeny;
    }

    public static String hozzaadas(String xmlNev, String jsonStr) {
        DocumentBuilderFactory dbf = DocumentBuilderFactory.newInstance();
        try {
            JSONObject jsonObj = new JSONObject(jsonStr);
            String xmlStr = XML.toString(jsonObj);

            DocumentBuilder db = dbf.newDocumentBuilder();
            Document jsonXml = db.parse(new InputSource(new StringReader(xmlStr)));
            Document xml = db.parse(dbPath + xmlNev + ".xml");

            NodeList nl = xml.getElementsByTagName(jsonXml.getDocumentElement().getNodeName());
			Integer nextID;            
			if(nl.getLength() == 0){
				nextID = 1;
			} else {
				nextID = Integer.parseInt(xml.getDocumentElement().getFirstChild().getLastChild().getElementsByTagName("id").item(0).getTextContent());
			}
            
            Element id = jsonXml.createElement("id");
            id.setTextContent(nextID.toString());
            jsonXml.getFirstChild().appendChild(id);
            
            Node imp = xml.importNode(jsonXml.getFirstChild(), true);
            xml.getDocumentElement().appendChild(imp);

            xml.normalize();

            TransformerFactory tf = TransformerFactory.newInstance();
            Transformer t = tf.newTransformer();
            DOMSource source = new DOMSource(xml);
            StreamResult sr = new StreamResult(new File(dbPath + xmlNev + ".xml"));
            t.transform(source, sr);

        } catch (JSONException ex) {
            return "false";
        } catch (TransformerException ex) {
            return "false";
        } catch (SAXException ex) {
            return "false";
        } catch (IOException ex) {
            return "false";
        } catch (ParserConfigurationException ex) {
            return "false";
        }
        return "true";
    }

    public static String torles(String xmlNev, String jsonStr) {
        String eredmeny = "false";
        DocumentBuilderFactory dbf = DocumentBuilderFactory.newInstance();

        try {
            JSONObject jsonObj = new JSONObject(jsonStr);
            int id = (Integer) jsonObj.get("id");
            DocumentBuilder db = dbf.newDocumentBuilder();
            Document xml = db.parse(dbPath + xmlNev + ".xml");
            NodeList xmlIdList = xml.getElementsByTagName("id");

            for (int i = 0; i < xmlIdList.getLength(); i++) {
                Element elem = (Element) xmlIdList.item(i);
                if (xmlIdList.item(i).getTextContent().equals(Integer.toString(id))) {
                    eredmeny = "true";
                    Node idParent = elem.getParentNode();
                    idParent.getParentNode().removeChild(idParent);
                }
            }
            TransformerFactory tf = TransformerFactory.newInstance();
            Transformer t = tf.newTransformer();
            DOMSource source = new DOMSource(xml);
            StreamResult sr = new StreamResult(new File(dbPath + xmlNev + ".xml"));
            t.transform(source, sr);

        } catch (JSONException ex) {
            return "false";
        } catch (TransformerException ex) {
            return "false";
        } catch (SAXException ex) {
            return "false";
        } catch (IOException ex) {
            return "false";
        } catch (ParserConfigurationException ex) {
            return "false";
        }
        return eredmeny;
    }

	public static String listazas(String xmlNev, String jsonStr) {
        DocumentBuilderFactory dbf = DocumentBuilderFactory.newInstance();
        String eredmeny = "";
		StringWriter writer = new StringWriter();
        try {
            DocumentBuilder db = dbf.newDocumentBuilder();
            Document xml = db.parse(dbPath + xmlNev + ".xml");
            
            if(jsonStr.length() > 0 ){
            	JSONObject jsonObj = new JSONObject(jsonStr);
            	Object[] keySet = jsonObj.keySet().toArray();
            	NodeList nl = xml.getElementsByTagName(xml.getChildNodes().item(0).getChildNodes().item(0).getNodeName());
            	
            	int i = 0;
            	while ( i < nl.getLength()) {
	                Element elem = (Element) nl.item(i);
	
	                boolean found = true;
	                NodeList elemNodeList = elem.getChildNodes();
	                int childNodesNum = elemNodeList.getLength();
	                for(int j = 0; j < keySet.length; j++){	
		            	for (int k = 0; k < childNodesNum; k++) {
		                	if(elemNodeList.item(k).getNodeName().equals(keySet[j])){
		                		JSONArray filterValues = jsonObj.getJSONArray((String)keySet[j]);
		                		boolean hasValue = false;
		                		for(int l = 0; l < filterValues.length(); l++){
		                			hasValue = hasValue || elemNodeList.item(k).getTextContent().equals(filterValues.getString(l));
		                		}
			                	if(!hasValue){
		                			elem.getParentNode().removeChild(elem);
			                		found = false;
			                		break;
			                	}
		                	}
		                }
		            	if(!found){
		            		break;
		            	}
	                }
	                if(found){
	                	i++;
	                }
	            }
            }
            DOMSource source = new DOMSource(xml);
            TransformerFactory tf = TransformerFactory.newInstance();
            Transformer t = tf.newTransformer();
            t.transform(source, new StreamResult(writer));

		} catch (TransformerException ex) {
        	return "";        
		} catch (JSONException ex) {
            return "";
        } catch (SAXException ex) {
            return "";
        } catch (IOException ex) {
            return "";
        } catch (ParserConfigurationException ex) {
            return "";
        }
        
		return XML.toJSONObject(writer.getBuffer().toString()).toString();
	}
}
