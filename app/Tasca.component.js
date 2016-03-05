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
                this.min = 0;
                this.seg = 3;
                this.fin = 0;
                var a = new Date();
                this.data = a;
                this.stateTime = 0;
                this.afegirTasca = function (tascaName) {
                    if (tascaName != '') {
                        idTask++;
                        this.model = new app.Tasca(idTask, tascaName, 0, 3, this.data, 0, 0);
                        sessionStorage.setItem(idTask, JSON.stringify(this.model));
                        this.tasques.push(this.model);
                    }
                    /*this.tasques = [];
                    for (var key in sessionStorage) {
                        this.tasques.push(JSON.parse(sessionStorage.getItem(key)));
                    }*/
                };
                this.esborrarTasca = function (id) {
                    var tasca = JSON.parse(sessionStorage.getItem(id));
                    sessionStorage.removeItem(id);
                    this.tasques = [];
                    for (var key in sessionStorage) {
                        this.tasques.push(JSON.parse(sessionStorage.getItem(key)));
                    }
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
                    /* this.tasques.splice(this.tasques.indexOf(tasca), 1);
                       this.tasques.push(tasca);*/
                    this.tasques = [];
                    for (var key in sessionStorage) {
                        this.tasques.push(JSON.parse(sessionStorage.getItem(key)));
                    }
                };
                this.startTime = function () {
                    this.stateTime = 1;
                };
                this.stopTime = function () {
                    this.stateTime = 2;
                };
                this.resetTime = function () {
                    this.min = 0;
                    this.seg = 3;
                    this.stateTime = 0;
                };
                this.afegirTimer = function (id) {
                    var tasca = JSON.parse(sessionStorage.getItem(id));
                    this.id = tasca.id;
                    this.task = tasca.task;
                    this.min = tasca.min;
                    this.seg = tasca.seg;
                    this.stateTime = tasca.stateTime;
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
                            this.fin = 1;
                        }
                    }
                }, 1000);

                this.enviat = false;
            },
            transform: function (v, args) {
                v.forEach(function (item, index) {
                    v[index] = item.toUpperCase();
                })
                return v.sort().join(args[0]);
            },
            valida: function () {
                this.enviat = true;
            },
        });
})(window.app || (window.app = {}));
