// ==UserScript==
// @name         SuperFastFingers
// @require      https://openuserjs.org/src/libs/sizzle/GM_config.js
// @grant        GM_getValue
// @version      1.1
// @description  Show live wpm
// @author       AFriendlyTrashcan (@7v1)
// @match        https://10fastfingers.com/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
    GM_config.init(
        {
            'id': 'SFF-conf',
            'fields':
            {
                'aagColors':
                {
                    'label': 'Enable live WPM colors',
                    'type': 'select',
                    'options': ['true','false'],
                    'default': 'true'
                },
                'greatWPM':
                {
                    'label': 'Choose what WPM triggers great background color',
                    'type': 'text',
                    'default': '150'
                },
                'goodWPM':
                {
                    'label': 'Choose what WPM triggers good background color',
                    'type': 'text',
                    'default': '140'
                },
                'normalWPM':
                {
                    'label': 'Choose what WPM triggers normal background color',
                    'type': 'text',
                    'default': '130'
                },
                'taran':
                {
                    'label': 'Enable WPM >1000',
                    'type': 'select',
                    'options': ['true','false'],
                    'default': 'false'
                },
                'm00p':
                {
                    'label': 'Enable negative WPM',
                    'type': 'select',
                    'options': ['true','false'],
                    'default': 'false'
                }
            }
    });

    var aagColors = true;
    var greatWPM = 150;
    var goodWPM = 140;
    var normalWPM = 130;
    var taran = false;
    var m00p = false;
    var keystrokes;
    var wordIndex = 0;
    var correctWords;
    var realWPM;
    var wordList;

    $("#user-online-box").html("<a id='settingsSFF' href='javascript:void()'>SuperFastFingers settings</a>");
    $("#settingsSFF").click(function(){
        GM_config.open();
    });

    $(document).keydown(function (k){
        if(k.which == 32){
            aagColors = (GM_config.get('aagColors') == 'true');
            greatWPM = GM_config.get('greatWPM');
            goodWPM = GM_config.get('goodWPM');
            normalWPM = GM_config.get('normalWPM');
            taran = (GM_config.get('taran') == 'true');
            m00p = (GM_config.get('m00p') == 'true');
            if(window.location.href.indexOf("competition") > -1) {
                if(word_pointer == 0){
                    // row_counter = 0;
                    previous_position_top = p.top;
                    var zeilensprung_hoehe = (-1 * line_height) * row_counter;
                    $("#row1").css('top', zeilensprung_hoehe+"px"); //bei einem zeilensprung wird der text um "line_height" verschoben
                    $('#row1 span[wordnr="'+word_pointer+'"]').addClass('highlight');
                    fill_line_switcher();

                    keystrokes = 0;
                    correctWords = 0;
                    wordIndex = 0;
                    wordList = word_string.split("|");
                }

                if(user_input_stream.split(" ")[wordIndex - 1] == wordList[wordIndex - 1]){
                    keystrokes += wordList[wordIndex].length;
                    correctWords++;
                }else{
                    keystrokes -= wordList[wordIndex].length;
                }
                wordIndex++;
            }else{
                keystrokes = error_keystrokes;
                correctWords = error_correct;
            }
            realWPM = Math.round((keystrokes / 5) / ((60.01 - countdown) / 60));
            if((realWPM > 1000 && !taran) || realWPM < 0 && !m00p){
                realWPM = 0;
            }

            $('#words').before("<div id='preview'></div>");
            $('#preview').html("<font size='+3'><b>WPM:</b> " +
                               realWPM + "<br><b>Key Strokes:</b> " +
                               keystrokes + "<br><b>Words:</b> " +
                               correctWords + "</<font size='+3'>");

            if(aagColors){
                if(realWPM > greatWPM){
                    $("#preview").css({"backgroundColor":"green","color":"black"});
                }else if(realWPM > goodWPM){
                    $("#preview").css({"backgroundColor":"blue","color":"black"});
                }else if(realWPM > normalWPM){
                    $("#preview").css({"backgroundColor":"orange","color":"black"});
                }else if(realWPM == 0){
                    $("#preview").css({"backgroundColor":"white","color":"black"});
                }else{
                    $("#preview").css({"backgroundColor":"red","color":"black"});
                }
            }
        }
    });
})();



