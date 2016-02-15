(function (app) {
    app.TareaFormComponent = ng.core
        .Component({
            selector: 'formulari',
            templateUrl: 'app/Tarea_template.html'
        })
        .Class({
            constructor: function () {
                this.cursos = ['ASIX', 'DAW', 'DAM'];
                this.model = new app.Tarea('Tarea', this.cursos[0]);
                this.enviat = false;
            },
            agregar: function () {
                this.enviat = false;
            },
            valida: function () {
                this.enviat = true;
            },
        });
})(window.app || (window.app = {}));