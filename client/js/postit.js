(function (global) {

    var board;

    var postItClass = {
        instance: null,
        dom: null,
        init: function (data) {

            this.isNew = true;
            if (data) {
                this.instance = data;
            }

            // if (this.)

            return this;
        },
        setInstance: function (data) {
            this.instance = data;
        },
        startEdit: function () {
            this.dom.querySelector('.content div:first-child').style.display = "none";
            var t = this.dom.querySelector('.content .textarea')
            t.style.display = "block";
            t.value = this.instance.content;
        },
        stopEdit: function () {
            var t = this.dom.querySelector('.content .textarea');
            t.style.display = 'none';
            this.dom.querySelector('.content div:first-child').style.display = 'block';

            console.log(t);

            this.instance.content = t.querySelector('textarea').value;
            this.render();

            board.newPostIt(this.instance);
        },
        editContent: function (w) {
            instance.content += " " + w;
            this.render();
        },
        render: function () {
            var self = this;

            if (!this.dom) {
                var tpl = document.querySelector('.postit-tpl').innerHTML;

                for (var p in this.instance) {
                    tpl = tpl.replace("__" + p + "__", this.instance[p]);
                }

                if (this.isNew) {
                    document.body.innerHTML += tpl;
                }

                this.dom = document.querySelector('.id-'+this.instance.id);

                this.dom.querySelector('.header').addEventListener('contextmenu', function (e) {
                    e.preventDefault();
                    self.startEdit();
                });

                this.dom.querySelector('button').addEventListener('click', function (e) {
                    self.stopEdit();
                });

            }

            this.dom.querySelector('.content div').innerHTML = this.instance.content;
            this.dom.querySelector('.content textarea').value = this.instance.content;

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