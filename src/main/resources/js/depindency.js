define("JiraDependencyDashboardItem", ["require", "exports"], function (require, exports) {
    "use strict";
    var JiraDependencyDashboardItem = (function () {
        function JiraDependencyDashboardItem(API) {
            this.API = API;
            console.log("Testing Typescript");
        }
        /**
         * Called to render the view for a fully configured dashboard item.
         *
         * @param context The surrounding <div/> context that this items should render into.
         * @param preferences The user preferences saved for this dashboard item (e.g. filter id, number of results...)
         */
        JiraDependencyDashboardItem.prototype.render = function (context, preferences) {
            var renderFunction = function () {
                this.API.showLoadingBar();
            };
            this.API.once("afterRender", renderFunction.bind(this));
        };
        return JiraDependencyDashboardItem;
    }());
    return JiraDependencyDashboardItem;
});
//# sourceMappingURL=depindency.js.map