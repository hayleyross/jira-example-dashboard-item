/// <reference path="../../../typings/index.d.ts" />

import * as Urls from "./Urls";
import {MessageDto} from "../models/MessageDto";
import * as wrmContextPath from "wrm/context-path";

export module ExampleRepository {
    let jiraPrefix = wrmContextPath();

    export function getHelloMessage(name: string): JQueryPromise<MessageDto> {
        return get<MessageDto>(Urls.HELLO_MESSAGE + "?name=" + encodeURIComponent(name));
    }

    function get<T>(url:string): JQueryPromise<T> {
        // Must encode query parameters into URL - usual JQuery 'data' setting isn't respected by AJS.$
        return AJS.$.ajax({
            url: jiraPrefix + Urls.EXAMPLE_API_BASE + url,
            type: "GET",
            dataType: "json"
        });
    }
}