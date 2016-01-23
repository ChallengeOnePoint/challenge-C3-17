(function (global) {

    document.addEventListener('DOMContentLoaded', function () {
        var currentPostIt;

        board.init();
        board.allPostIt(function (data) {
            console.log(data);
            data.forEach(function (d) {
                postit.create(d).render();
            });
        });


        postit.setBoard(board);

        // recognize({
        //     "go": function () {
        //         currentPostIt = postit.create({id:utils.uuid(), content:"salut", author: "mathias"}).render();
        //         currentPostIt.startEdit()
        //     }
        // }, function (word) {
        //         currentPostIt.editContent(word);
        // });


        // postit.create({id:utils.uuid(), content:"salut", author: "mathias"}).render();        


    });

}(this));