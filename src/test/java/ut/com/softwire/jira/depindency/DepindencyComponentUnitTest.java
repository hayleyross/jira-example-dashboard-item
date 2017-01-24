package ut.com.softwire.jira.depindency;

import org.junit.Test;
import com.softwire.jira.depindency.api.DepindencyPluginComponent;
import com.softwire.jira.depindency.impl.DepindencyPluginComponentImpl;

import static org.junit.Assert.assertEquals;

public class DepindencyComponentUnitTest
{
    @Test
    public void testMyName()
    {
        DepindencyPluginComponent component = new DepindencyPluginComponentImpl(null);
        assertEquals("names do not match!", "depindencyComponent",component.getName());
    }
}