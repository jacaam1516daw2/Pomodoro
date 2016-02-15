(function (app) {
    app.AppComponent = ng.core
        .Component({
            selector: 'aplicacio',
            template: '<formulari></formulari>',
            directives: [app.TareaFormComponent]
        })
        .Class({
            constructor: function () {}
        });
})(window.app || (window.app = {}));