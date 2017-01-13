package ut.com.softwire.jira.depindency;

import org.junit.Test;
import com.softwire.jira.depindency.api.MyPluginComponent;
import com.softwire.jira.depindency.impl.MyPluginComponentImpl;

import static org.junit.Assert.assertEquals;

public class MyComponentUnitTest
{
    @Test
    public void testMyName()
    {
        MyPluginComponent component = new MyPluginComponentImpl(null);
        assertEquals("names do not match!", "myComponent",component.getName());
    }
}