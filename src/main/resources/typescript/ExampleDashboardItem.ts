import {ExampleDashboardItemView} from "./views/ExampleDashboardItemView";
import {ExampleDashboardItemConfigurationView} from "./views/ExampleDashboardItemConfigurationView";
import {ErrorView} from "./views/ErrorView";

class ExampleDashboardItem {
    private view: ExampleDashboardItemView;
    private configView: ExampleDashboardItemConfigurationView;
    private errorView: ErrorView;

    constructor(private API: DashboardItemAPI, private options: any = {}) {
        this.view = new ExampleDashboardItemView(API);
        this.configView = new ExampleDashboardItemConfigurationView(API);
        this.errorView = new ErrorView(API);
    }

    /**
     * Called to render the view for a fully configured dashboard item.
     *
     * @param $element The surrounding <div/> element that this items should render into.
     * @param preferences The user preferences saved for this dashboard item (e.g. filter id, number of results...)
     */
    public render($element: JQuery, preferences: ExamplePreferences): void {
        this.setupRefresh(preferences, $element);

        this.view.render($element, preferences)
            .fail((errorXhr: JQueryXHR) => { // TODO use bluebird or similar to wrap old version of jQuery and allow it to return new values from the chain
                                             // Then we can have an error message of our choice here
                this.renderError($element, errorXhr.statusText);
            });
    }

    /**
     * Called to render the configuration form for this dashboard item if preferences.isConfigured
     * has not been set yet.
     *
     * @param $element The surrounding <div/> element that this items should render into.
     * @param preferences The user preferences saved for this dashboard item
     */
    public renderEdit($element: JQuery, preferences: ExamplePreferences): void {
        this.configView.render($element, preferences)
    }

    private setupRefresh(preferences: ExamplePreferences, $element: JQuery) {
        this.API.initRefresh({
                refresh: preferences.refreshInterval
            },
            this.render.bind(this, $element, preferences)
        );
    }

    private renderError($element, errorMessage: string) {
        this.errorView.render($element, { message: errorMessage });
    }


}

export = ExampleDashboardItem;