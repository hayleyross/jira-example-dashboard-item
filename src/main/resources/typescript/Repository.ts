/// <reference path="../typings/custom/AJS.d.ts" />

module Repository {
    // Can get this by adding dependency on "wrm/context-path" and then executing the resulting function: wrmContextPath() -> figure out how to do this in typescript
    const JIRA_PREFIX: string = "/jira"; // TODO this changes in different environments (local/test/dev - add config)
    const API_PREFIX: string = "/rest/example-api/1.0/";

    export function get<T>(url:string, data?: any): JQueryPromise<T> {
        return AJS.$.ajax({
            url: JIRA_PREFIX + API_PREFIX + url,
            data: data,
            type: "GET",
            dataType: "json"
        });
    }
}

export = Repository;