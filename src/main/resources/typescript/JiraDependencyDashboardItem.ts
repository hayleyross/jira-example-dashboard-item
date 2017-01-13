class JiraDependencyDashboardItem {
    constructor(private API) {
        console.log("Testing Typescript");
    }

    /**
     * Called to render the view for a fully configured dashboard item.
     *
     * @param context The surrounding <div/> context that this items should render into.
     * @param preferences The user preferences saved for this dashboard item (e.g. filter id, number of results...)
     */
    public render(context, preferences) {
        let renderFunction = function () {
            this.API.showLoadingBar();
        };
        this.API.once("afterRender", renderFunction.bind(this));
    }
}

export = JiraDependencyDashboardItem;