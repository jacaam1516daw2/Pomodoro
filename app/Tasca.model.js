(function (app) {
    app.Tasca = Tasca;

    function Tasca(id, task, min, seg, stateTime) {
        this.id = id;
        this.task = task;
        this.min = min;
        this.seg = seg;
        this.stateTime = stateTime;
    }
})(window.app || (window.app = {}));
