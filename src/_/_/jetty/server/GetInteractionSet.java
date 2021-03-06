package _._.jetty.server;

import java.io.IOException;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.json.simple.JSONArray;

import _.myParser.ParserGameDescription;
import _.utils.Utils;
import core.Node;
import tools.IO;

@SuppressWarnings("serial")
public class GetInteractionSet extends HttpServlet
{
    @Override
    protected void doGet( HttpServletRequest request,
                          HttpServletResponse response ) throws ServletException,
                                                        IOException
    {
		String toSend = getInteractionSetJSONObject("examples/gridphysics/cakybaky.txt");
		
    	response.setContentType("text/html");
        response.setStatus(HttpServletResponse.SC_OK);
        response.getWriter().println(toSend);
    }

	/**
	 * @return
	 */
	public String getInteractionSetJSONObject(String gamePath) {
		String toSend = "";

		ParserGameDescription parser = new ParserGameDescription();
    	String[] desc_lines = new IO().readFile(gamePath);
    	if(desc_lines != null)
    	{
    		Node rootNode = parser.indentTreeParser(desc_lines);

    		//Parse here blocks of VGDL.
    		for(Node n : rootNode.children)
    		{
    			if(n.content.identifier.equals("InteractionSet"))
    			{
    				JSONArray arr = parser.parseInteractionSet(n);
    				toSend =  arr.toJSONString();
    			}
    		}
    	}
		return toSend;
	}
}

