import {ExampleRepository} from "../repository/ExampleRepository";
import {MessageDto} from "../models/MessageDto";
import {View} from "./View";

export class ExampleDashboardItemView extends View {
    private message: string = "Message unknown";

    public render($element: JQuery, preferences: ExamplePreferences): void {
        this.API.showLoadingBar();
        this.updateMessage(preferences).then(() => {
            $element.html(Com.Softwire.Jira.Example.Templates.Main({
                message: this.message,
                name: preferences.name
            }));

            this.API.hideLoadingBar();
            this.API.resize(); // "afterRender" event has already happened by this time
        });
    }

    private updateMessage(preferences: ExamplePreferences): JQueryPromise<void> {
        return ExampleRepository.getHelloMessage(preferences.name)
            .then((data: MessageDto) => {
                this.message = data.message;
            })
            .fail((jqXHR: JQueryXHR) => {
                throw new Error("Error while fetching message for dashboard item: " + jqXHR.statusText);
            });
    }
}