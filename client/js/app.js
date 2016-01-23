(function (global) {

    document.addEventListener('DOMContentLoaded', function () {
        var currentPostIt;

        board.init();
        board.allPostIt(function (data) {
            console.log(data);
            Object.keys(data).forEach(function (k) {
                postit.create(data[k]).render();
            });
        });

        board.syncPostIt(function (data) {
            postit.create(data.postIt).render();
        });

        board.deletePostIt(function (id) {
            var n = document.querySelector('id-'+id);
            n.parentNode.removeChild(n);
        });

        postit.setBoard(board);

        recognize({
            "ok": function () {
                currentPostIt = postit.create({id:utils.uuid(), content:"", author: ""}).render();
                currentPostIt.startEdit()
            }
        }, function (word) {
            currentPostIt.editContent(word);
        },
        function () {
            currentPostIt.stopEdit();  
        });


        // postit.create({id:utils.uuid(), content:"salut", author: "mathias"}).render();        


    });

}(this));