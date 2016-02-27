(function (app) {
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
                this.afegirTasca = function (tasca) {
                    if (tasca != '') {
                        this.tasques.push(tasca);
                    }
                };
                this.esborrarTasca = function (tasca) {
                    this.tasques.splice(this.tasques.indexOf(tasca), 1)
                };
                this.enviat = false;
            },
            valida: function () {
                this.enviat = true;
            },
        });
})(window.app || (window.app = {}));
