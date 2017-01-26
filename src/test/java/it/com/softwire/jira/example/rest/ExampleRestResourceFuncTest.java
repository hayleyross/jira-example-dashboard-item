package it.com.softwire.jira.example.rest;

import com.softwire.jira.example.rest.models.MessageModel;
import org.apache.wink.client.Resource;
import org.apache.wink.client.RestClient;
import org.junit.After;
import org.junit.Before;
import org.junit.Test;

import static org.junit.Assert.assertEquals;

public class ExampleRestResourceFuncTest {

    @Before
    public void setup() {

    }

    @After
    public void tearDown() {

    }

    @Test
    public void messageIsValid() {

        String baseUrl = System.getProperty("baseurl");
        String resourceUrl = baseUrl + "/rest/example-api/1.0/message/hello?name=World";

        RestClient client = new RestClient();
        Resource resource = client.resource(resourceUrl);

        MessageModel message = resource.get(MessageModel.class);

        assertEquals("wrong message", "Hello World from the REST resource", message.getMessage());
    }
}
