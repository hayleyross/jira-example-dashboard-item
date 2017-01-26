/// <reference path="../typings/index.d.ts" />
/// <amd-dependency path="underscore" />

import {ExampleRepository} from "./repository/ExampleRepository";
import {MessageDto} from "./models/MessageDto";
import {ExamplePreferences} from "./models/ExamplePreferences";

declare const _: UnderscoreStatic;

class ExampleDashboardItem {
    private message: string = "Message unknown";
    private errorMessage: string = null;

    private configValidation: ExampleConfigValidation = {
        maxNameLength: 60
    };

    private defaultPreferences: ExamplePreferences = {
        name: "",
        isConfigured: false,
        refresh: '60' // TODO
    };

    constructor(private API: DashboardItemAPI, private options: any) {
    }

    /**
     * Called to render the view for a fully configured dashboard item.
     *
     * @param $element The surrounding <div/> element that this items should render into.
     * @param preferences The user preferences saved for this dashboard item (e.g. filter id, number of results...)
     */
    public render($element: JQuery, preferences: ExamplePreferences): void {
        this.API.initRefresh(preferences, this.render.bind(this, $element, preferences)); // TODO what does this do?
                                                                                          // I think this sets which function to call when the item auto-refreshes
                                                                                          // So actually we only need to do this once? Pull this out.
        this.API.showLoadingBar();

        this.updateMessage().then(() => {
            if (this.hasErrors()) {
                $element.html(Com.Softwire.Jira.Example.Templates.Error({
                    title: "An error occurred",
                    content: this.errorMessage
                }));
            } else {
                $element.html(Com.Softwire.Jira.Example.Templates.Main({
                    message: this.message,
                    name: preferences.name || "person without a name"
                }));
            }

            this.API.hideLoadingBar();
            this.API.resize();
        });
    }

    private updateMessage(): JQueryPromise<void> {
        return ExampleRepository.getHelloMessage()
            .then((data: MessageDto) => {
                this.message = data.message;
            })
            .fail((jqXHR: JQueryXHR) => {
                this.errorMessage = "Error while fetching message for dashboard item: " + jqXHR.statusText;
            });
    }

    private hasErrors(): boolean {
        return !!this.errorMessage;
    }

    public renderEdit($element: JQuery, preferences: ExamplePreferences): void {
        let copiedPreferences = _.clone(preferences || {});
        let preferencesWithDefaults: ExamplePreferences = _.defaults(copiedPreferences, this.defaultPreferences);

        $element.html(Com.Softwire.Jira.Example.Templates.Configuration({
            prefix: this.getDashboardItemPrefix(),
            validation: this.configValidation,
            preferences: preferencesWithDefaults
        }));
    }

    private getDashboardItemPrefix() {
        return this.API.getGadgetId() + '-';
    }
}

export = ExampleDashboardItem;