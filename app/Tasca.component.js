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
                this.stateTime = 2;
                this.afegirTasca = function (tascaName) {
                    if (tascaName != '') {
                        idTask++;
                        this.model = new app.Tasca(idTask, tascaName, 0, 3, this.data, 0, 0);
                        sessionStorage.setItem(idTask, JSON.stringify(this.model));
                        this.tasques.push(this.model);
                    }
                };
                this.esborrarTasca = function (id) {
                    var tasca = JSON.parse(sessionStorage.getItem(id));
                    sessionStorage.removeItem(id);
                    this.tasques = [];
                    for (var key in sessionStorage) {
                        this.tasques.push(JSON.parse(sessionStorage.getItem(key)));
                    }
                };
                this.ordenar = function (order) {
                    function compareId(a, b) {
                        return ((a.id < b.id) ? -1 : ((a.id > b.id) ? 1 : 0));
                    }

                    function compareTask(a, b) {
                        return ((a.task < b.task) ? -1 : ((a.task > b.task) ? 1 : 0));
                    }

                    function compareTime(a, b) {
                        return ((a.min * 60 + a.seg < a.seg * 60 + b.seg) ? -1 : ((a.min * 60 + a.seg > b.min * 60 + b.seg) ? 1 : 0));
                    }

                    function compareData(a, b) {
                        return ((a.data < b.data) ? -1 : ((a.data > b.data) ? 1 : 0));
                    }

                    function compareState(a, b) {
                        return ((a.fin < b.fin) ? -1 : ((a.fin > b.fin) ? 1 : 0));
                    }

                    this.tasques = [];
                    for (var key in sessionStorage) {
                        this.tasques.push(JSON.parse(sessionStorage.getItem(key)));
                    }

                    switch (parseInt(order)) {
                        case 1:
                            this.tasques.sort(compareId);
                            break;
                        case 2:
                            this.tasques.sort(compareTask);
                            break;
                        case 3:
                            this.tasques.sort(compareTime);
                            break;
                        case 4:
                            this.tasques.sort(compareData);
                            break;
                        case 5:
                            this.tasques.sort(compareState);
                            break;
                        default:
                    }
                };
                this.afegirTimer = function (id) {
                    if (id != "") {
                        var tasca = JSON.parse(sessionStorage.getItem(id));
                        this.id = tasca.id;
                        this.task = tasca.task;
                        this.min = tasca.min;
                        this.seg = tasca.seg;
                        this.stateTime = tasca.stateTime;
                    }
                };
                this.Time = function (state) {
                    var interval = setInterval(() => {
                        if (this.stateTime == 1) {
                            this.seg--;
                            if (this.seg == 0 && this.min != 0) {
                                this.min--;
                                this.seg = 3;
                            }
                            if (this.seg == 0 && this.min == 0) {
                                this.stateTime = 2;
                                this.fin = 1;

                                var tasca = JSON.parse(sessionStorage.getItem(this.id));
                                tasca.min = this.min;
                                tasca.seg = this.seg;
                                tasca.fin = 1;
                                tasca.stateTime = 0;
                                sessionStorage.removeItem(tasca.id);
                                sessionStorage.setItem(tasca.id, JSON.stringify(tasca));
                                this.tasques = [];
                                for (var key in sessionStorage) {
                                    this.tasques.push(JSON.parse(sessionStorage.getItem(key)));
                                }
                            }
                        } else {
                            clearInterval(interval);
                        }
                    }, 1000);

                    this.stateTime = parseInt(state);

                    if (this.stateTime == 1) {
                        interval;
                    } else if (this.stateTime == 0) {
                        this.min = 0;
                        this.seg = 3;
                    }

                    var tasca = JSON.parse(sessionStorage.getItem(this.id));
                    tasca.min = this.min;
                    tasca.seg = this.seg;
                    tasca.fin = 0;
                    tasca.stateTime = this.stateTime;
                    sessionStorage.removeItem(tasca.id);
                    sessionStorage.setItem(tasca.id, JSON.stringify(tasca));
                    this.tasques = [];
                    for (var key in sessionStorage) {
                        this.tasques.push(JSON.parse(sessionStorage.getItem(key)));
                    }
                };
                this.enviat = false;
            },
            valida: function () {
                this.enviat = true;
            },
        });
})(window.app || (window.app = {}));
