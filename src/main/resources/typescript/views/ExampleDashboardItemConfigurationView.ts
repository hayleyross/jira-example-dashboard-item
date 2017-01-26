/// <amd-dependency path="underscore" />

import {View} from "./View";

export class ExampleDashboardItemConfigurationView extends View {
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

    public render($element: JQuery, preferences: ExamplePreferences): void {
        this.$element = $element;

        let preferencesOrDefaults = this.getPreferencesOrDefaults(preferences);
        this.renderHtml(preferencesOrDefaults);

        this.setupEditEventHandlers();
        this.resizeOnceRendered();
    }

    private getPreferencesOrDefaults(preferences: ExamplePreferences) {
        let copiedPreferences = _.clone(preferences || {});
        let preferencesWithDefaults: ExamplePreferences = _.defaults(copiedPreferences, this.defaultPreferences);
        preferencesWithDefaults.refresh = !!preferencesWithDefaults
            && preferencesWithDefaults.refreshInterval !== "undefined"
            && preferencesWithDefaults.refreshInterval !== "null";
        return preferencesWithDefaults;
    }

    private renderHtml(preferences: ExamplePreferences, errorMessage?: string) {
        this.$element.html(Com.Softwire.Jira.Example.Templates.Configuration({
            prefix: this.getDashboardItemPrefix(),
            validation: this.configValidation,
            preferences: preferences,
            errorMessage: errorMessage,
        }));
    }

    private getDashboardItemPrefix() {
        return this.API.getGadgetId() + '-';
    }

    private setupEditEventHandlers(): void {
        this.$element.on("click", ".cancel", this.cancelEdit);
        this.$element.on("submit", this.validateAndSubmitPreferences);
    }

    private cancelEdit = () => {
        this.API.closeEdit();
    };

    public validateAndSubmitPreferences = (e: Event) => {
        e.preventDefault();

        let newPreferences = this.getPreferencesFromEditForm();
        let validationErrors = this.getValidationErrors(newPreferences);
        if (validationErrors.length == 0) {
            this.API.savePreferences(newPreferences);
        } else {
            this.showValidationErrors(newPreferences, validationErrors);
        }
    };

    private getPreferencesFromEditForm(): ExamplePreferences {
        let $form: JQuery = $("form", this.$element);
        let formFields: any = ExampleDashboardItemConfigurationView.getFormFieldsAsObject($form);

        return {
            name: formFields.name,
            refreshInterval: formFields.refreshInterval ? formFields.refreshInterval : undefined
        };
    }

    private static getFormFieldsAsObject($form: JQuery) {
        return $form.serializeArray().reduce(function (fieldsObj, field) {
            fieldsObj[field.name] = field.value;
            return fieldsObj;
        }, {});
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
        this.renderHtml(newPreferences, validationErrors.join(" "));
        this.API.resize();
    }
}