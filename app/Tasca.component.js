(function (app) {
    var idTask = 0;
    app.TascaFormComponent = ng.core
        .Component({
            selector: 'formulari',
            templateUrl: 'app/Tasca_template.html'
        })
        .Class({
            constructor: function () {
                this.tasques = [];
                this.min = 24;
                this.seg = 59;
                this.stateTime = 0;
                this.afegirTasca = function (tascaName) {
                    if (tascaName != '') {
                        idTask++;
                        this.model = new app.Tasca(idTask, tascaName, 24, 59, 0);
                        sessionStorage.setItem(idTask, JSON.stringify(this.model));
                        this.tasques.push(this.model);
                    }
                    //this.tasques = [];
                    /*for (i = 1; i <= sessionStorage.length; i++) {
                        this.tasques.push(JSON.parse(sessionStorage.getItem(i)));
                    }*/
                };
                this.esborrarTasca = function (id) {
                    var tasca = JSON.parse(sessionStorage.getItem(id));
                    sessionStorage.removeItem(id);
                    this.tasques.splice(this.tasques.indexOf(tasca), 1);
                };
                this.guarda = function (id, task, min, seg) {
                    var tasca = JSON.parse(sessionStorage.getItem(id));
                    tasca.id = id;
                    tasca.task = task;
                    tasca.min = min;
                    tasca.seg = seg;
                    tasca.stateTime = 0;
                    sessionStorage.removeItem(id);
                    sessionStorage.setItem(id, JSON.stringify(tasca));
                    this.tasques.splice(this.tasques.indexOf(tasca), 1);
                    this.tasques.push(tasca);
                };
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
                this.afegirTimer = function (id) {
                    var t = JSON.parse(sessionStorage.getItem(id));
                    this.id = t.id;
                    this.task = t.task;
                    this.min = t.min;
                    this.seg = t.seg;
                    this.stateTime = t.stateTime;
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
