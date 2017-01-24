/// <reference path="../typings/custom/DashboardItemAPI.d.ts" />

import * as Repository from "Repository";

class JiraDependencyDashboardItem {
    constructor(private dashboardItemAPI: DashboardItemAPI) {
        this.getDataFromApi();
    }

    /**
     * Called to render the view for a fully configured dashboard item.
     *
     * @param context The surrounding <div/> context that this items should render into.
     * @param preferences The user preferences saved for this dashboard item (e.g. filter id, number of results...)
     */
    public render(context, preferences) {
        let renderFunction = function () {
            this.dashboardItemAPI.showLoadingBar();
        };
        this.dashboardItemAPI.once("afterRender", renderFunction.bind(this));
    }

    private getDataFromApi() {
        Repository.get<any>("/rest/depindency-api/1.0/message/hello")
            .done((data: any) => {
                console.log(data);
            })
            .fail((jqXHR: JQueryXHR) => {
                console.log(jqXHR.status);
                console.log(jqXHR.responseText)
            });
    }
}

export = JiraDependencyDashboardItem;