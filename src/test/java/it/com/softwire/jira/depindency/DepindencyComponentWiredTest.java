package it.com.softwire.jira.depindency;

import org.junit.Test;
import org.junit.runner.RunWith;
import com.atlassian.plugins.osgi.test.AtlassianPluginsTestRunner;
import com.softwire.jira.depindency.api.DepindencyPluginComponent;
import com.atlassian.sal.api.ApplicationProperties;

import static org.junit.Assert.assertEquals;

@RunWith(AtlassianPluginsTestRunner.class)
public class DepindencyComponentWiredTest
{
    private final ApplicationProperties applicationProperties;
    private final DepindencyPluginComponent depindencyPluginComponent;

    public DepindencyComponentWiredTest(ApplicationProperties applicationProperties, DepindencyPluginComponent depindencyPluginComponent)
    {
        this.applicationProperties = applicationProperties;
        this.depindencyPluginComponent = depindencyPluginComponent;
    }

    @Test
    public void testMyName()
    {
        assertEquals("names do not match!", "depindencyComponent:" + applicationProperties.getDisplayName(), depindencyPluginComponent.getName());
    }
}