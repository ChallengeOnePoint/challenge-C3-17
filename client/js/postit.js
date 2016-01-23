(function (global) {

    var board;

    var postItClass = {
        instance: null,
        init: function (data) {

            this.isNew = true;
            if (data) {
                this.instance = data;
            }

            return this;
        },
        setInstance: function (data) {
            this.instance = data;
        },
        startEdit: function () {

        },
        stopEdit: function () {

            instance.content = 

            board.newPostIt(instance);
        },
        render: function () {
            var tpl = document.querySelector('.postit-tpl').innerHTML;

            for (var p in this.instance) {
                tpl = tpl.replace("__" + p + "__", this.instance[p]);
            }

            if (this.isNew) {
                document.body.innerHTML += tpl;
            }

            return this;
        }
    }

    global.postit = {
        setBoard: function (b) {
            board = b;
        },
        create: function (data) {
            return Object.assign({}, postItClass, {instance: data}).init();
        }
    }

}(this));