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
                this.breaking = 0;
                this.stateTime = 2;
                var d = new Date();
                for (var key in sessionStorage) {
                    this.tasques.push(JSON.parse(sessionStorage.getItem(key)));
                }

                function pad(s) {
                    return (s < 10) ? '0' + s : s;
                }
                //Li donem format a les dates ja que els pipes de angular de date donen problemes
                this.data = [pad(d.getDate()), pad(d.getMonth() + 1), d.getFullYear()].join('/');
                this.afegirTasca = function (tascaName) {
                    // si la tasca es diferent de buit generem un id, guardem a sessionstorage i afegim a l'array
                    if (tascaName != '') {
                        idTask++;
                        this.model = new app.Tasca(idTask, tascaName, 0, 3, this.data, 0, 0, 0);
                        sessionStorage.setItem(idTask, JSON.stringify(this.model));
                        this.tasques.push(this.model);
                    }
                };
                this.esborrarTasca = function (id) {
                    // borrem l'objecte i reomplim la array de tasques per que l'array i les dades de session storage siguin iguals
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
                        return ((a.min * 60 + a.seg < b.seg * 60 + b.seg) ? -1 : ((a.min * 60 + a.seg > b.min * 60 + b.seg) ? 1 : 0));
                    }

                    function compareData(a, b) {
                        return ((a.data < b.data) ? -1 : ((a.data > b.data) ? 1 : 0));
                    }

                    function compareState(a, b) {
                        return ((a.fin < b.fin) ? -1 : ((a.fin > b.fin) ? 1 : 0));
                    }

                    function compareBreak(a, b) {
                        return ((a.breaking < b.breaking) ? -1 : ((a.breaking > b.breaking) ? 1 : 0));
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
                        case 6:
                            this.tasques.sort(compareBreak);
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
                        this.breaking = tasca.breaking;
                        this.stateTime = tasca.stateTime;
                    }
                };
                this.Time = function (state) {
                    //Temps del pomodoro
                    var interval = setInterval(() => {
                        //segons l'estat start, stop , reset comrpobem
                        if (this.stateTime == 1) {
                            //restem segons
                            this.seg--;
                            //si segons es 0 pero min no es 0 restem in minut
                            if (this.seg == 0 && this.min != 0) {
                                this.min--;
                                this.seg = 3;
                            }
                            // si seg = 0 i min = 0 guardem automaticament la tasca i sumem mes 1 a break(descanso)
                            if (this.seg == 0 && this.min == 0) {
                                this.stateTime = 2;
                                this.fin = 1;
                                this.breaking = this.breaking + 1;

                                // guardem l'objecte i reomplim la array de tasques per que l'array i les dades de session storage siguin iguals
                                var tasca = JSON.parse(sessionStorage.getItem(this.id));
                                tasca.min = this.min;
                                tasca.seg = this.seg;
                                tasca.breaking = this.breaking;
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
                            // si es dona a stop o s'acaba el temps parem el set interval
                            clearInterval(interval);
                        }
                    }, 1000);

                    this.stateTime = parseInt(state);

                    //si donem start al temps posem la tasca a estat = 1 i iniciem el set interval
                    if (this.stateTime == 1) {
                        interval;
                    } else if (this.stateTime == 0) {
                        // si fem reset al temps inicialicem el temps de la tasca
                        this.min = 0;
                        this.seg = 3;
                        this.fin = 0;
                    }

                    // guardem l'objecte i reomplim la array de tasques per que l'array i les dades de session storage siguin iguals
                    var tasca = JSON.parse(sessionStorage.getItem(this.id));
                    tasca.min = this.min;
                    tasca.seg = this.seg;
                    tasca.breaking = this.breaking;
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
                this.mostra = false;
            },
            valida: function () {
                this.enviat = true;
            },
            mostra: function () {
                this.mostra = true;
            },
        });
})(window.app || (window.app = {}));
