/*
* main.js
*
* Entry point for beautifulizer
*
* Copyright: Miika Haapalainen 2012. Licensed under GPL.
*/
/*jslint plusplus: true*/
/*global define, $, console, require*/
require(['RemoveTrailingSpaces', 'RemoveEmptyLines', 'CombineFollowingVarStatements', 'CombineVarStatements', 'FixIndentations'], function (removeTralingSpaces, removeEmptyLines, combineFollowingVarStatements, combineVarStatements, fixIndentations) {
    'use strict';
    /*
     *  writeNewCode
     *
     *  Writes new code to the fixed code HTML text area
     *
     * Parameters:
     *  codeArray - Array of strings representing the code. One code line per array item.
     */
    function writeNewCode(codeArray) {
        var i = 0,
            s = '';
        console.log('writeNewCode begins');
        for (i = 0; i < codeArray.length; i++) {
            s = s + codeArray[i] + '\n';
        }
        $('#newcode').val(s);
    }
    /*
     *  beautifulizeCode
     *
     *  Main method, called when user clicks 'beautifulize' button.
     */
    function beautifulizeCode() {
        var oldCode = $('#oldcode').val(),
            codeArray,
            i = 0,
            beautifulizers = [];
        $('#newcode').val('');
        codeArray = oldCode.split('\n');
        console.log('beatifulizeCode begins');
        beautifulizers.push(removeTralingSpaces);
        beautifulizers.push(combineFollowingVarStatements);
        beautifulizers.push(combineVarStatements);
        beautifulizers.push(fixIndentations);
        beautifulizers.push(removeEmptyLines);
        for (i = 0; i < beautifulizers.length; i++) {
            beautifulizers[i].beautifulizeCode(codeArray);
        }
        writeNewCode(codeArray);
    }
    $('#beautifulize').click(function () { // Attach event handler
        beautifulizeCode();
    });
});
