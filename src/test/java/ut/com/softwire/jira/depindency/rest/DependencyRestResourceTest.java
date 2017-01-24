package ut.com.softwire.jira.depindency.rest;

import com.softwire.jira.depindency.rest.DependencyRestResource;
import com.softwire.jira.depindency.rest.DependencyRestResourceModel;
import org.junit.After;
import org.junit.Before;
import org.junit.Test;

import javax.ws.rs.core.Response;

import static org.junit.Assert.assertEquals;

public class DependencyRestResourceTest {

    @Before
    public void setup() {

    }

    @After
    public void tearDown() {

    }

    @Test
    public void messageIsValid() {
        DependencyRestResource resource = new DependencyRestResource();

        Response response = resource.getMessage();
        final DependencyRestResourceModel message = (DependencyRestResourceModel) response.getEntity();

        assertEquals("wrong message","Hello World from the REST resource",message.getMessage());
    }
}
