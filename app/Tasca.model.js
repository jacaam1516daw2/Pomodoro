(function (app) {
    app.Tasca = Tasca;

    function Tasca(id, task, min, seg, data, fin, stateTime) {
        this.id = id;
        this.task = task;
        this.min = min;
        this.seg = seg;
        this.data = data;
        this.fin = fin;
        this.stateTime = stateTime;
    }
})(window.app || (window.app = {}));
