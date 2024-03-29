(function (global) {

    var recognizer = null;
    var result;
    var result2;
    var post = [];

    function recognize(param, wordcallback, end) {

        var words = Object.keys(param);
        console.log(words);

        //speechRecognization interface is the heart of recognization API
        window.speechRecognition = window.speechRecognition || window.webkitSpeechRecognition || window.mozSpeechRecognition || window.webkitSpeechRecognition;

        if(window.speechRecognition == undefined)
        {
            alert("Speech Recogniztion API Not Supported");
        }
        else {
            //create a speechRecognization object
            recognizer = new speechRecognition();
            recognizer2 = new speechRecognition();

            //If set to "false" then recognizer stops listening automatically when user stops speaking the first sentence.
            recognizer.continuous = false;
            recognizer2.continuous = false;

            //specify the language of speech. langauge must be in BCP 47 standard.
            recognizer.lang = "fr-FR";
            recognizer2.lang = "fr-FR";

            //it set to true then onresult callback is fired after every word spoken by the user. Otherwise after end of sentence.
            recognizer.interimResults = false;
            recognizer2.interimResults = false;

            //fired when speech recognization starts listening.
            recognizer.onstart = function(){
                console.log("Recogniztion API started");
            }

            //fired everytime user stops speaking.
            recognizer.onresult = function(event){  
                //event.resultIndex returns the index of first word spoken in the currently stoped sentence.
                //event.results.length is the total number of words spoken in this session.
                result = event.results[0][0].transcript;
                console.log(result.toLowerCase());
                if (result.toLowerCase() == words[0]) {
                    console.log("Post-it Cree !");
                    param[words[0]]();
                    recognizer2.start();
                    recognizer2.onstart = function(){
                        console.log("Recogniztion2 API started");
                    }
                } else if (result.toLowerCase() != words[0]) {
                    recognize(param, wordcallback, end);   
                }
            }

            recognizer2.onresult = function(event){
                result2 = event.results[0][0].transcript;
                console.log("WTF SA MARCHE");
                post.push(result2.toLowerCase());
                wordcallback(result2.toLowerCase());
                console.log(post.join());
            }

        }

        recognizer2.onend = function(){
            recognizer2 = null;
            console.log("Recogniztion2 API stopped");
            end();
            recognize(param, wordcallback, end);
        }
        //fired when recognization is stopped manually or automatically.
        recognizer.onend = function(){
            recognizer = null;
            console.log("Recogniztion API stopped");
        }

        recognizer.start();
    }

    function stop() {
        if(recognizer != null) {
            //stop it manually
            recognizer.stop();
            console.log("Recognization API stopped");
        }
    }

    global.recognize = recognize;

}(this));