package ut.com.softwire.jira.example.rest;

import com.softwire.jira.example.rest.ExampleRestResource;
import com.softwire.jira.example.rest.models.MessageModel;
import org.junit.Test;

import javax.ws.rs.core.Response;

import static org.junit.Assert.assertEquals;

public class ExampleRestResourceTest {

    @Test
    public void messageIsValid() {
        ExampleRestResource resource = new ExampleRestResource();

        Response response = resource.getMessage("World");
        MessageModel message = (MessageModel) response.getEntity();

        assertEquals("wrong message","Hello World from the REST resource", message.getMessage());
    }
}
