package com.softwire.jira.depindency.rest;

import com.atlassian.plugins.rest.common.security.AnonymousAllowed;

import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

/**
 * A resource of message.
 */
@Path("/message")
public class DependencyRestResource {

    @GET
    @AnonymousAllowed
    @Produces({MediaType.APPLICATION_JSON})
    @Path("/hello")
    public Response getMessage()
    {
       return Response.ok(new DependencyRestResourceModel("Hello World from the REST resource")).build();
    }
}