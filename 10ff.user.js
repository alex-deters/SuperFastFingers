// ==UserScript==
// @name         SuperFastFingers
// @require      https://openuserjs.org/src/libs/sizzle/GM_config.js
// @grant        GM_getValue
// @grant        GM_setValue
// @version      1.0
// @description  Show live wpm
// @author       AFriendlyTrashcan (@7v1)
// @match        https://10fastfingers.com/typing-test/*
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
                    'default': 'True'
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
    var realWPM;

    $("#user-online-box").html("<a id='settingsSFF' href='javascript:void()'>SuperFastFingers settings</a>");
    $("#settingsSFF").click(function(){
        GM_config.open();
    });

    $('#preview').html("<font size='+3'><b>WPM:</b> " +
        realWPM + "<br><b>Key Strokes:</b> " +
        error_keystrokes + "<br><b>Words:</b> " +
        error_correct + "</<font size='+3'>");

    $(document).keydown(function (k)
    {
        aagColors = (GM_config.get('aagColors') == 'true');
        greatWPM = GM_config.get('greatWPM');
        goodWPM = GM_config.get('goodWPM');
        normalWPM = GM_config.get('normalWPM');
        taran = (GM_config.get('taran') == 'true');
        m00p = (GM_config.get('m00p') == 'true');

        realWPM = Math.round((error_keystrokes / 4.98) / ((60.01 - countdown) / 60));
        if((realWPM > 1000 && !taran) || realWPM < 0 && !m00p){
            realWPM = 0;
        }

        $('#preview').html("<font size='+3'><b>WPM:</b> " +
        realWPM + "<br><b>Key Strokes:</b> " +
        error_keystrokes + "<br><b>Words:</b> " +
        error_correct + "</<font size='+3'>");

        $('#words').before("<div id='preview'></div>");
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
    });
})();

