/*
* RemoveTrailingSpaces
*
* Remove trailing spaces from the given code line.
* 
* Copyright: Miika Haapalainen 2012. Licensed under GPL.
*/
/*jslint plusplus: true*/
/*global define, $, console*/
define(function () {
    'use strict';
    function removeTrailingSpaces(codeArray) {
        var i = 0,
            s;
        console.log('codeArray length ' + codeArray.length);
        for (i = 0; i < codeArray.length; i++) {
            s = codeArray[i];
            s = s.replace(/\s+$/, "");
            codeArray[i] = s;
        }
        return codeArray;
    }
    return {
        beautifulizeCode: removeTrailingSpaces
    };
});