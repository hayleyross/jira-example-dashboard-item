package com.softwire.jira.depindency.impl;

import com.atlassian.plugin.spring.scanner.annotation.export.ExportAsService;
import com.atlassian.plugin.spring.scanner.annotation.imports.ComponentImport;
import com.atlassian.sal.api.ApplicationProperties;
import com.softwire.jira.depindency.api.DepindencyPluginComponent;

import javax.inject.Inject;
import javax.inject.Named;

@ExportAsService ({DepindencyPluginComponent.class})
@Named ("depindencyPluginComponent")
public class DepindencyPluginComponentImpl implements DepindencyPluginComponent
{
    @ComponentImport
    private final ApplicationProperties applicationProperties;

    @Inject
    public DepindencyPluginComponentImpl(final ApplicationProperties applicationProperties)
    {
        this.applicationProperties = applicationProperties;
    }

    public String getName()
    {
        if(null != applicationProperties)
        {
            return "depindencyComponent:" + applicationProperties.getDisplayName();
        }
        
        return "depindencyComponent";
    }
}