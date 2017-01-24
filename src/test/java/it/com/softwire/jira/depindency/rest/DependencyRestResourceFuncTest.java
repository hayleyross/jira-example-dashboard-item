package it.com.softwire.jira.depindency.rest;

import com.softwire.jira.depindency.rest.DependencyRestResourceModel;
import org.apache.wink.client.Resource;
import org.apache.wink.client.RestClient;
import org.junit.After;
import org.junit.Before;
import org.junit.Test;

import static org.junit.Assert.assertEquals;

public class DependencyRestResourceFuncTest {

    @Before
    public void setup() {

    }

    @After
    public void tearDown() {

    }

    @Test
    public void messageIsValid() {

        String baseUrl = System.getProperty("baseurl");
        String resourceUrl = baseUrl + "/rest/depindencyapi/1.0/message";

        RestClient client = new RestClient();
        Resource resource = client.resource(resourceUrl);

        DependencyRestResourceModel message = resource.get(DependencyRestResourceModel.class);

        assertEquals("wrong message","Hello World from the REST resource",message.getMessage());
    }
}
