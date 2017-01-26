/// <reference path="../../typings/index.d.ts" />

import * as Urls from "./Urls";
import {MessageDto} from "../models/MessageDto";

declare const require: (imports: string[], module: Function) => void;

export module ExampleRepository {
    let jiraPrefix = "/jira";

    require(["wrm/context-path"], function(wrmContextPath) {
        jiraPrefix = wrmContextPath();
    });

    export function getHelloMessage(): JQueryPromise<MessageDto> {
        return get<MessageDto>(Urls.HELLO_MESSAGE);
    }

    function get<T>(url:string, data?: any): JQueryPromise<T> {
        return AJS.$.ajax({
            url: jiraPrefix + Urls.EXAMPLE_API_BASE + url,
            data: data,
            type: "GET",
            dataType: "json"
        });
    }
}