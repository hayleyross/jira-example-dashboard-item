/// <reference path="../../typings/index.d.ts" />

import * as Urls from "./Urls";
import {MessageDto} from "../models/MessageDto";

declare const require: (imports: string[], module: Function) => void;

export module ExampleRepository {
    // Can get this by adding dependency on "wrm/context-path" and then executing the resulting function: wrmContextPath() -> figure out how to do this in typescript
    // const JIRA_PREFIX: string = "/jira"; // TODO this changes in different environments (local/test/dev - add config)
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