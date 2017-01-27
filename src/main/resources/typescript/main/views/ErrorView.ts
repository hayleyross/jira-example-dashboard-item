import {View} from "./View";
export class ErrorView extends View {
    public render($element: JQuery, error: { message: string }) {
        $element.html(Com.Softwire.Jira.Example.Templates.Error({
            title: "An error occurred",
            content: error.message
        }));

        this.API.resize();
    }
}