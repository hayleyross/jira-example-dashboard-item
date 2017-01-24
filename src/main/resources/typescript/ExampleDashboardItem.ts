/// <reference path="../typings/custom/DashboardItemAPI.d.ts" />

import * as Repository from "Repository";
import {MessageDto} from "models/MessageDto";

class ExampleDashboardItem {
    private message: string;
    private errors: string[];

    constructor(private dashboardItemAPI: DashboardItemAPI, private options: any) {
        this.getMessage();
    }

    /**
     * Called to render the view for a fully configured dashboard item.
     *
     * @param context The surrounding <div/> context that this items should render into.
     * @param preferences The user preferences saved for this dashboard item (e.g. filter id, number of results...)
     */
    public render(context: JQuery, preferences: any) {
        this.dashboardItemAPI.once("afterRender", () => {
            this.dashboardItemAPI.showLoadingBar();
        });
    }

    private getMessage() {
        Repository.get<any>("message/hello")
            .done((data: MessageDto) => {
                this.message = data.message.value;
            })
            .fail((jqXHR: JQueryXHR) => {
                this.errors.push("Error while fetching message for dashboard item: " + jqXHR.statusText);
            });
    }
}

export = ExampleDashboardItem;