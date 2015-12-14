/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */


import java.io.File;
import java.io.IOException;
import java.io.StringReader;
import java.io.StringWriter;
import java.util.logging.Level;
import java.util.logging.Logger;

import javax.xml.parsers.DocumentBuilder;
import javax.xml.parsers.DocumentBuilderFactory;
import javax.xml.parsers.ParserConfigurationException;
import javax.xml.transform.Transformer;
import javax.xml.transform.TransformerException;
import javax.xml.transform.TransformerFactory;
import javax.xml.transform.dom.DOMSource;
import javax.xml.transform.stream.StreamResult;

import org.json.JSONException;
import org.json.JSONObject;
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

    public static String modositas(String xmlNev, String jsonStr) throws JSONException {
        JSONObject jsonObj = new JSONObject(jsonStr);
        String xmlStr = XML.toString(jsonObj);

        DocumentBuilderFactory dbf = DocumentBuilderFactory.newInstance();

        try {
            DocumentBuilder db = dbf.newDocumentBuilder();
            Document xml = db.parse(new InputSource(new StringReader(xmlStr)));
            Document doc = db.parse(xmlNev + ".xml");

            NodeList nl = doc.getElementsByTagName(xml.getDocumentElement().getNodeName());
            NodeList n = xml.getElementsByTagName("id");
            NodeList rt = xml.getDocumentElement().getChildNodes();

            for (int i = 0; i < nl.getLength(); i++) {
                Element elem = (Element) nl.item(i);
                if (elem.getAttribute("id").equals(n.item(0).getTextContent())) {
                    for (int j = 0; j < rt.getLength(); j++) {
                        elem.getElementsByTagName(rt.item(j).getNodeName()).item(0).setTextContent(rt.item(j).getTextContent());
                    }
                }
            }

            TransformerFactory tf = TransformerFactory.newInstance();
            Transformer t = tf.newTransformer();
            DOMSource source = new DOMSource(doc);
            StreamResult sr = new StreamResult(new File(xmlNev + ".xml"));
            t.transform(source, sr);
        } catch (TransformerException ex) {
            Logger.getLogger(AdatbazisModul.class.getName()).log(Level.SEVERE, null, ex);
        } catch (SAXException ex) {
            Logger.getLogger(AdatbazisModul.class.getName()).log(Level.SEVERE, null, ex);
        } catch (IOException ex) {
            Logger.getLogger(AdatbazisModul.class.getName()).log(Level.SEVERE, null, ex);
        } catch (ParserConfigurationException ex) {
            Logger.getLogger(AdatbazisModul.class.getName()).log(Level.SEVERE, null, ex);
        }
        return new String("true");
    }

    public static String hozzaadas(String xmlNev, String jsonStr) throws JSONException {
        JSONObject jsonObj = new JSONObject(jsonStr);
        String xmlStr = XML.toString(jsonObj);

        DocumentBuilderFactory dbf = DocumentBuilderFactory.newInstance();
        try {
            DocumentBuilder db = dbf.newDocumentBuilder();
            Document xml = db.parse(new InputSource(new StringReader(xmlStr)));
            Document doc = db.parse("src/" + xmlNev + ".xml");
            Element root = doc.getDocumentElement();

            NodeList nl = doc.getElementsByTagName(xml.getDocumentElement().getNodeName());
            Integer nextID = nl.getLength()+1;
            
            Element id = xml.createElement("id");
            id.setTextContent(nextID.toString());
            xml.getFirstChild().appendChild(id);
            Node n = xml.getFirstChild();
            
            Node imp = doc.importNode(n, true);

            root.appendChild(imp);

            doc.normalize();

            TransformerFactory tf = TransformerFactory.newInstance();
            Transformer t = tf.newTransformer();
            DOMSource source = new DOMSource(doc);
            StreamResult sr = new StreamResult(new File("src/" + xmlNev + ".xml"));
            t.transform(source, sr);


        } catch (TransformerException ex) {
            Logger.getLogger(AdatbazisModul.class.getName()).log(Level.SEVERE, null, ex);
        } catch (SAXException ex) {
            Logger.getLogger(AdatbazisModul.class.getName()).log(Level.SEVERE, null, ex);
        } catch (IOException ex) {
            Logger.getLogger(AdatbazisModul.class.getName()).log(Level.SEVERE, null, ex);
        } catch (ParserConfigurationException ex) {
            Logger.getLogger(AdatbazisModul.class.getName()).log(Level.SEVERE, null, ex);
        }
        return new String("true");
    }

    public static String torles(String xmlNev, String jsonStr) throws JSONException {
        JSONObject jsonObj = new JSONObject(jsonStr);
        System.out.println(jsonObj);

        int s = (Integer)jsonObj.get("id");

        System.out.println(jsonObj.get("id"));
        DocumentBuilderFactory dbf = DocumentBuilderFactory.newInstance();
        try {
            DocumentBuilder db = dbf.newDocumentBuilder();
            Document doc = db.parse("szemely.xml");
            NodeList nl = doc.getElementsByTagName("szemely");

            System.out.println(nl.getLength());

            for (int i = 0; i < nl.getLength(); i++) {
                Element elem = (Element) nl.item(i);

                if (elem.getAttribute("id").equals(Integer.toString(s))) {
                    System.out.println("jee");
                    elem.getParentNode().removeChild(elem);
                }
            }
            TransformerFactory tf = TransformerFactory.newInstance();
            Transformer t = tf.newTransformer();
            DOMSource source = new DOMSource(doc);
            StreamResult sr = new StreamResult(new File("tzu.xml"));
            t.transform(source, sr);

        } catch (TransformerException ex) {
            Logger.getLogger(AdatbazisModul.class.getName()).log(Level.SEVERE, null, ex);
        } catch (SAXException ex) {
            Logger.getLogger(AdatbazisModul.class.getName()).log(Level.SEVERE, null, ex);
        } catch (IOException ex) {
            Logger.getLogger(AdatbazisModul.class.getName()).log(Level.SEVERE, null, ex);
        } catch (ParserConfigurationException ex) {
            Logger.getLogger(AdatbazisModul.class.getName()).log(Level.SEVERE, null, ex);
        }
        return new String("true");
    }

	public static String listazas(String xmlNev, String jsonStr) {
        DocumentBuilderFactory dbf = DocumentBuilderFactory.newInstance();
        StringWriter writer = new StringWriter();
        try {
            DocumentBuilder db = dbf.newDocumentBuilder();
            Document doc = db.parse("src/" + xmlNev + ".xml");
            DOMSource source = new DOMSource(doc);
            TransformerFactory tf = TransformerFactory.newInstance();
            Transformer t = tf.newTransformer();
            t.transform(source, new StreamResult(writer));

        } catch (SAXException ex) {
            Logger.getLogger(AdatbazisModul.class.getName()).log(Level.SEVERE, null, ex);
        } catch (IOException ex) {
            Logger.getLogger(AdatbazisModul.class.getName()).log(Level.SEVERE, null, ex);
        } catch (ParserConfigurationException ex) {
            Logger.getLogger(AdatbazisModul.class.getName()).log(Level.SEVERE, null, ex);
        } catch (TransformerException ex) {
        	Logger.getLogger(AdatbazisModul.class.getName()).log(Level.SEVERE, null, ex);
		}
        
		return XML.toJSONObject(writer.getBuffer().toString()).toString();
	}
}
