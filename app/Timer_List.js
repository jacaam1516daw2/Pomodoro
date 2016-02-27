function Timer() {
    this.min = 1;
    this.seg = 3;
    this.stateTime = 0;
    this.storage = 0;
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
                this.seg = 3;
            }
            if (this.seg == 0 && this.min == 0) {
                this.stateTime = 2;
            }
        }
    }, 1000);
}

Timer.annotations = [
  new ng.core.ComponentMetadata({
        selector: "taskTime"
    }),
  new ng.core.ViewMetadata({
        templateUrl: 'app/Timer_template.html',
    })
];

document.addEventListener("DOMContentLoaded", function () {
    ng.platform.browser.bootstrap(Timer);

});
