function Llista() {
    this.tasques = [];
    this.afegirTasca = function (tasca) {
        if (tasca != '') {
            this.tasques.push(tasca);
        }
    };
    this.esborrarTasca = function (tasca) {
        this.tasques.splice(this.tasques.indexOf(tasca), 1)
    };
    this.afegirTimer = function (tasca) {
        this.timerTask = tasca;
        this.min = 24;
        this.seg = 59;
        this.stateTime = 0;
        this.storage = 0;
    };
    this.startTime = function () {
        this.stateTime = 1;
    };
    this.stopTime = function () {
        this.stateTime = 2;
        this.tiempo = this.min + ':' + this.seg
    };
    this.resetTime = function () {
        this.min = 24;
        this.seg = 59;
        this.stateTime = 0;
    };
    setInterval(() => {
        if (this.stateTime == 1) {
            this.seg--;
            if (this.seg == 0 && this.min != 0) {
                this.min--;
                this.seg = 59;
            }
            if (this.seg == 0 && this.min == 0) {
                this.stateTime = 2;
            }
        }
    }, 1000);
}

function Timer() {
    this.timerTask = 'ss';
    this.min = 24;
    this.seg = 59;
    this.stateTime = 0;
    this.storage = 0;
    this.afegirTimer = function (tasca) {
        this.timerTask = tasca;
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
    setInterval(() => {
        if (this.stateTime == 1) {
            this.seg--;
            if (this.seg == 0 && this.min != 0) {
                this.min--;
                this.seg = 59;
            }
            if (this.seg == 0 && this.min == 0) {
                this.stateTime = 2;
            }
        }
    }, 1000);
}

Llista.annotations = [
  new ng.core.ComponentMetadata({
        selector: "aplicacio"
    }),
  new ng.core.ViewMetadata({
        templateUrl: 'app/Tasca_template.html',
    })
];

document.addEventListener("DOMContentLoaded", function () {
    ng.platform.browser.bootstrap(Llista);
});

Timer.annotations = [
  new ng.core.ComponentMetadata({
        selector: "taskTime"
    }),
  new ng.core.ViewMetadata({
        templateUrl: 'app/Timer_template.html',
    })
];
