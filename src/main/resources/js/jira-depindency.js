console.log("Hello world");

define("jira-depindency/main", [
    'underscore'
], function (_) {
    var DashboardItem = function (API) {
        this.API = API;
    };
    /**
     * Called to render the view for a fully configured dashboard item.
     *
     * @param context The surrounding <div/> context that this items should render into.
     * @param preferences The user preferences saved for this dashboard item (e.g. filter id, number of results...)
     */
    DashboardItem.prototype.render = function (context, preferences) {
        //TODO: render the view with the preferences provided
        this.API.once("afterRender", _.bind(function () {
            this.API.showLoadingBar();
        }, this));
    };

    /**
     * Called to render the configuration form for this dashboard item if preferences.isConfigured
     * has not been set yet.
     *
     * @param context The surrounding <div/> context that this items should render into.
     * @param preferences The user preferences saved for this dashboard item
     */
    DashboardItem.prototype.renderEdit = function (context, preferences) {
        //TODO: render a config form here using provided SOY templates and assign it
        //      to the 'form' variable
        // form.on("submit", _.bind(function (e) {
        //     e.preventDefault();
        //     if (!validateFields()) {  //TODO: validateFields needs to implemented
        //         this.API.forceLayoutRefresh();
        //         return;
        //     }
        //     this.API.savePreferences({
        //         //provide parsed prefs from your config form here
        //         //to store them for this dashboard item
        //     });
        // }, this));
        // form.find("input.button.cancel").on("click", _.bind(function () {
        //     this.API.closeEdit();
        // }, this));
    };
    return DashboardItem;
});