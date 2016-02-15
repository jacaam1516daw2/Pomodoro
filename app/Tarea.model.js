(function (app) {
    app.Tarea = Tarea;

    function Tarea(nom, curs) {
        this.nom = nom;
        this.curs = curs;
    }
})(window.app || (window.app = {}));