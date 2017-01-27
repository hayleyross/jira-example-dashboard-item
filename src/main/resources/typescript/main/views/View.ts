export abstract class View {
    constructor(protected API: DashboardItemAPI) {
    }

    public abstract render($element: JQuery, preferences?: any);

    protected resizeOnceRendered() {
        this.API.once('afterRender', () => {
            this.API.resize();
        });
    }
}