package ut.com.softwire.jira.example.rest;

import com.softwire.jira.example.rest.ExampleRestResource;
import com.softwire.jira.example.rest.models.MessageModel;
import org.junit.After;
import org.junit.Before;
import org.junit.Test;

import javax.ws.rs.core.Response;

import static org.junit.Assert.assertEquals;

public class ExampleRestResourceTest {

    @Before
    public void setup() {

    }

    @After
    public void tearDown() {

    }

    @Test
    public void messageIsValid() {
        ExampleRestResource resource = new ExampleRestResource();

        Response response = resource.getMessage();
        final MessageModel message = (MessageModel) response.getEntity();

        assertEquals("wrong message","Hello World from the REST resource",message.getMessage());
    }
}
