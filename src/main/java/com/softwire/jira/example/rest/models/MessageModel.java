package com.softwire.jira.example.rest.models;

import javax.xml.bind.annotation.*;
@XmlRootElement(name = "messageContainer")
@XmlAccessorType(XmlAccessType.FIELD)
public class MessageModel {

    @XmlElement
    private String message;

    public MessageModel() {
    }

    public MessageModel(String message) {
        this.message = message;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }
}