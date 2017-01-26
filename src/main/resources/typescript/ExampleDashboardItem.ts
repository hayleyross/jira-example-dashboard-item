/// <reference path="../typings/index.d.ts" />
/// <amd-dependency path="underscore" />

import {ExampleRepository} from "./repository/ExampleRepository";
import {MessageDto} from "./models/MessageDto";

declare const _: UnderscoreStatic;

class ExampleDashboardItem {
    private message: string = "Message unknown";
    private globalErrorMessage: string = null;
    private $element: JQuery;

    private configValidation: ExampleConfigValidation = {
        nameMaxLength: 60,
        nameRequired: true
    };

    private defaultPreferences: ExamplePreferences = {
        name: "",
        isConfigured: false,
        refreshInterval: '15' // 15 is the default value set by the SOY template for auto-refreshing. What matters is that this is non-null
    };

    constructor(private API: DashboardItemAPI, private options: any = {}) {
    }

    /**
     * Called to render the view for a fully configured dashboard item.
     *
     * @param $element The surrounding <div/> element that this items should render into.
     * @param preferences The user preferences saved for this dashboard item (e.g. filter id, number of results...)
     */
    public render($element: JQuery, preferences: ExamplePreferences): void {
        this.$element = $element;

        this.API.showLoadingBar();

        this.setupRefresh(preferences, $element);

        this.updateMessage().then(() => {
            if (this.hasGlobalErrors()) {
                this.showGlobalError();
            } else {
                this.$element.html(Com.Softwire.Jira.Example.Templates.Main({
                    message: this.message,
                    name: preferences.name || "person without a name"
                }));
            }

            this.API.hideLoadingBar();
            this.API.resize(); // "afterRender" event has already happened by this time
        });
    }

    private resizeOnceRendered() {
        this.API.once('afterRender', () => {
            this.API.resize();
        });
    }

    private setupRefresh(preferences: ExamplePreferences, $element: JQuery) {
        this.API.initRefresh({
                refresh: preferences.refreshInterval
            },
            this.render.bind(this, $element, preferences));
    }

    private showGlobalError() {
        this.$element.html(Com.Softwire.Jira.Example.Templates.Error({
            title: "An error occurred",
            content: this.globalErrorMessage
        }));
    }

    private updateMessage(): JQueryPromise<void> {
        return ExampleRepository.getHelloMessage()
            .then((data: MessageDto) => {
                this.message = data.message;
            })
            .fail((jqXHR: JQueryXHR) => {
                this.globalErrorMessage = "Error while fetching message for dashboard item: " + jqXHR.statusText;
            });
    }

    private hasGlobalErrors(): boolean {
        return !!this.globalErrorMessage;
    }

    public renderEdit($element: JQuery, preferences: ExamplePreferences): void {
        this.$element = $element;

        let preferencesOrDefaults = this.getPreferencesOrDefaults(preferences);

        this.renderEditHtml(preferencesOrDefaults);

        this.setupEditEventHandlers();
        this.resizeOnceRendered();
    }

    private renderEditHtml(preferences: ExamplePreferences, errorMessage?: string) {
        this.$element.html(Com.Softwire.Jira.Example.Templates.Configuration({
            prefix: this.getDashboardItemPrefix(),
            validation: this.configValidation,
            preferences: preferences,
            errorMessage: errorMessage,
        }));
    }

    private getPreferencesOrDefaults(preferences: ExamplePreferences) {
        let copiedPreferences = _.clone(preferences || {});
        let preferencesWithDefaults: ExamplePreferences = _.defaults(copiedPreferences, this.defaultPreferences);
        preferencesWithDefaults.refresh = !!preferencesWithDefaults
            && preferencesWithDefaults.refreshInterval !== "undefined"
            && preferencesWithDefaults.refreshInterval !== "null";
        return preferencesWithDefaults;
    }

    public validateAndSubmitPreferences = (e: Event) => {
        e.preventDefault();

        let newPreferences = this.getPreferencesFromEditForm();
        let validationErrors = this.getValidationErrors(newPreferences);
        if (validationErrors.length == 0) {
            this.API.resize(); // TODO necessary?
            this.API.savePreferences(newPreferences);
        } else {
            this.showValidationErrors(newPreferences, validationErrors);
        }
    };

    private getPreferencesFromEditForm(): ExamplePreferences {
        let $form: JQuery = $("form", this.$element);
        let formFields: any = $form.serializeArray().reduce(function (fieldsObj, field) {
            fieldsObj[field.name] = field.value;
            return fieldsObj;
        }, {});

        return {
            name: formFields.name,
            refreshInterval: formFields.refreshInterval ? formFields.refreshInterval : undefined
        };
    }

    private getValidationErrors(preferences: ExamplePreferences): string[] {
        let validationErrors: string[] = [];
        if (this.configValidation.nameRequired && !preferences.name) {
            validationErrors.push("Please enter a name.");
        }
        if (preferences.name.length > this.configValidation.nameMaxLength) {
            validationErrors.push("The name must be less than " + this.configValidation.nameMaxLength + " characters.")
        }
        return validationErrors;
    }

    private showValidationErrors(newPreferences: ExamplePreferences, validationErrors: string[]): void {
        this.renderEditHtml(newPreferences, validationErrors.join(" ")); // TODO \n or ul
        this.resizeOnceRendered();
    }

    private cancelEdit(): void {
        this.API.closeEdit();
    }

    private setupEditEventHandlers(): void {
        this.$element.on("click", ".cancel", () => {
            this.cancelEdit();
        });
        this.$element.on("submit", this.validateAndSubmitPreferences);
    }

    private getDashboardItemPrefix() {
        return this.API.getGadgetId() + '-';
    }
}

export = ExampleDashboardItem;