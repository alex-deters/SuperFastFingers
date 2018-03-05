// ==UserScript==
// @name         SuperFastFingers
// @version      0.1
// @description  Show live wpm
// @author       AFriendlyTrashcan (@7v1)
// @match        https://10fastfingers.com/typing-test/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
    var taran = false;
    var realWPM;
    $(document).keydown(function (k)
    {
        realWPM = Math.round((error_keystrokes / 5) / ((60.01 - countdown) / 60));
        if((realWPM > 1000 || taran) || realWPM < 0){
            realWPM = 0;
        }

        $('#preview').html("<font size='+3'><b>WPM:</b> " +
        realWPM + "<br><b>Key Strokes:</b> " +
        error_keystrokes + "<br><b>Words:</b> " +
        error_correct + "</<font size='+3'>");

        $('#words').before("<div id='preview'></div>");
    });
})();
