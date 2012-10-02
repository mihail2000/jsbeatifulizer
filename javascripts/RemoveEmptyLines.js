/*
* RemoveEmptyLines
*
* Deletes empty lines in between the code for good and ensures there's one new line character at the end of the file.
*
* Copyright: Miika Haapalainen 2012. Licensed under GPL.
*/
/*jslint plusplus: true*/
/*global define, $, console*/
define(function () {
    'use strict';
    function removeEmptyLines(codeLines) {
        var i = 0;
        for (i = 0; i < codeLines.length; i++) {
            if ($.trim(codeLines[i]) === '') {
                codeLines.splice(i, 1);
                i--;
            }
        }
        codeLines.push('\n');
    }
    return {
        beautifulizeCode: removeEmptyLines
    };
});
