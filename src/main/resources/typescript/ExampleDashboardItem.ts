/// <reference path="../typings/custom/DashboardItemAPI.d.ts" />

import * as Repository from "Repository";
import {MessageDto} from "models/MessageDto";

declare const Com: {
    Softwire: {
        Jira: {
            Example: {
                Templates: {
                    HelloMessage: (params: any) => string // TODO not sure what this actually returns
                }
            }
        }
    }
}; // Soy template namespace/syntax - TODO want this in all files ideally, and could specify list of Soy templates

class ExampleDashboardItem {
    private message: string = "Message unknown";
    private errors: string[] = [];

    constructor(private API: DashboardItemAPI, private options: any) {
    }

    /**
     * Called to render the view for a fully configured dashboard item.
     *
     * @param $element The surrounding <div/> element that this items should render into.
     * @param preferences The user preferences saved for this dashboard item (e.g. filter id, number of results...)
     */
    public render($element: JQuery, preferences: any) {
        this.API.initRefresh(preferences, this.render.bind(this, $element, preferences)); // TODO what does this do?
        this.API.showLoadingBar();

        this.updateMessage().then(() => {
            if (this.errors.length == 0) {
                $element.html(Com.Softwire.Jira.Example.Templates.HelloMessage({
                    message: this.message,
                    name: preferences.name || "person without a name"
                }));
            } else {
                $element.html("<div>" + this.errors[0] + "</div>"); // TODO fix me
            }

            this.API.hideLoadingBar();
            this.API.resize();
        });
    }

    private updateMessage(): JQueryPromise<void> {
        return Repository.get<any>("message/hello")
            .then((data: MessageDto) => {
                this.message = data.message;
            })
            .fail((jqXHR: JQueryXHR) => {
                this.errors.push("Error while fetching message for dashboard item: " + jqXHR.statusText);
            });
    }
}

export = ExampleDashboardItem;