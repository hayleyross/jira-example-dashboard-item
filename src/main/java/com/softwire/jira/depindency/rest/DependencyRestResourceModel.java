package com.softwire.jira.depindency.rest;

import javax.xml.bind.annotation.*;
@XmlRootElement(name = "message")
@XmlAccessorType(XmlAccessType.FIELD)
public class DependencyRestResourceModel {

    @XmlElement(name = "value")
    private String message;

    public DependencyRestResourceModel() {
    }

    public DependencyRestResourceModel(String message) {
        this.message = message;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }
}