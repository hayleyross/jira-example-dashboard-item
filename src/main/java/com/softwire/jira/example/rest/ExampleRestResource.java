package com.softwire.jira.example.rest;

import com.atlassian.plugins.rest.common.security.AnonymousAllowed;
import com.softwire.jira.example.rest.models.MessageModel;

import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

/**
 * A resource of message.
 */
@Path("/message")
public class ExampleRestResource {

    @GET
    @AnonymousAllowed
    @Produces({MediaType.APPLICATION_JSON})
    @Path("/hello")
    public Response getMessage()
    {
       return Response.ok(new MessageModel("Hello World from the REST resource")).build();
    }
}