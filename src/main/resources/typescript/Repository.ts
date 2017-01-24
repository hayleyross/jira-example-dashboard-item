declare const AJS: any; // TODO add type

module Repository {
    const JIRA_PREFIX: string = "/jira"; // TODO this changes in different environments (local/test/dev - add config)

    export function get<T>(url:string, data?: any): JQueryPromise<T> {
        return AJS.$.ajax({
            url: JIRA_PREFIX + url,
            data: data,
            type: "GET",
            dataType: "json"
        });
    }
}

export = Repository;