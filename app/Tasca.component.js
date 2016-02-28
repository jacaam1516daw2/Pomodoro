(function (app) {
    var id = 0;

    app.TascaFormComponent = ng.core
        .Component({
            selector: 'formulari',
            templateUrl: 'app/Tasca_template.html'
        })
        .Class({
            constructor: function () {
                this.tasques = [];
                this.min = 1;
                this.seg = 3;
                this.stateTime = 0;
                this.afegirTasca = function (tascaName) {
                    if (tascaName != '') {
                        id++;
                        this.model = new app.Tasca(id, tascaName, 24, 59, 0);
                        sessionStorage.setItem(id, JSON.stringify(this.model));
                        //this.tasques.push(this.model);
                        this.tasques.push(tascaName);
                    }
                };
                this.esborrarTasca = function (tasca) {
                    this.tasques.splice(this.tasques.indexOf(tasca), 1)
                };
                this.guarda = function (timerTask, min, seg) {};
                this.startTime = function () {
                    this.stateTime = 1;
                };
                this.stopTime = function () {
                    this.stateTime = 2;
                };
                this.resetTime = function () {
                    this.min = 24;
                    this.seg = 59;
                    this.stateTime = 0;
                };
                this.afegirTimer = function (tasca) {
                    this.timerTask = tasca;
                    this.min = 24;
                    this.seg = 59;
                    this.stateTime = 0;
                    this.storage = 0;
                };
                setInterval(() => {
                    if (this.stateTime == 1) {
                        this.seg--;
                        if (this.seg == 0 && this.min != 0) {
                            this.min--;
                            this.seg = 3;
                        }
                        if (this.seg == 0 && this.min == 0) {
                            this.stateTime = 2;
                        }
                    }
                }, 1000);

                this.enviat = false;
            },
            valida: function () {
                this.enviat = true;
            },
        });
})(window.app || (window.app = {}));
