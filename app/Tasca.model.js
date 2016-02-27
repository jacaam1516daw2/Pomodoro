(function (app) {
    app.Tasca = Tasca;

    function Tasca(nom, curs, min, seg, stateTime) {
        this.nom = nom;
        this.curs = curs;
        this.min = min;
        this.seg = seg;
        this.stateTime = stateTime;
    }
})(window.app || (window.app = {}));
