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
                };
                this.esborrarTasca = function (id) {
                    var tasca = JSON.parse(sessionStorage.getItem(id));
                    sessionStorage.removeItem(id);
                    this.tasques = [];
                    for (var key in sessionStorage) {
                        this.tasques.push(JSON.parse(sessionStorage.getItem(key)));
                    }
                };
                this.Time = function (state) {
                    this.stateTime = parseInt(state);
                    if (parseInt(state) == 0) {
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
                this.ordenar = function (order) {
                    function compareTask(a, b) {
                        if (a.task < b.task)
                            return -1;
                        else if (a.task > b.task)
                            return 1;
                        else
                            return 0;
                    }

                    function compareDate(a, b) {
                        if (a.data < b.data)
                            return -1;
                        else if (a.data > b.data)
                            return 1;
                        else
                            return 0;
                    }

                    this.tasques = [];
                    for (var key in sessionStorage) {
                        this.tasques.push(JSON.parse(sessionStorage.getItem(key)));
                    }
                    if (parseInt(order) == 1) {
                        this.tasques.sort(compareTask);
                    } else {
                        this.tasques.sort(compareDate);
                    }
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
                    if (this.seg == 0 && this.min == 0) {
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
                }, 1000);

                this.enviat = false;
            },
            valida: function () {
                this.enviat = true;
            },
        });
})(window.app || (window.app = {}));
