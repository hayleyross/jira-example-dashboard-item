import {ExampleRepository} from "../repository/ExampleRepository";
import {MessageDto} from "../models/MessageDto";
import {View} from "./View";

export class ExampleDashboardItemView extends View {
    private message: string = "Message unknown";

    public render($element: JQuery, preferences: ExamplePreferences): JQueryPromise<void|JQueryXHR> {
        this.API.showLoadingBar();
        return this.updateMessage(preferences).then(() => {
            $element.html(Com.Softwire.Jira.Example.Templates.Main({
                message: this.message,
                name: preferences.name
            }));

            this.API.resize(); // "afterRender" event has already happened by this time
        }).always(() => {
            this.API.hideLoadingBar();
        });
    }

    private updateMessage(preferences: ExamplePreferences): JQueryPromise<void|JQueryXHR> {
        return ExampleRepository.getHelloMessage(preferences.name)
            .then((data: MessageDto) => {
                this.message = data.message;
            });
    }
}