/*
* CombineFollowingVarStatements
*
* Removes empty lines between 'var' statements.
* i.e. if there's only empty lines between two 'var' statements, remove empty lines in between.
* 
* Copyright: Miika Haapalainen 2012. Licensed under GPL.
*/
/*jslint plusplus: true*/
/*global define, $, console*/
define(['BeautifulUtils'], function (beautyUtils) {
    'use strict';
    function combineFollowingVarStatements(codeArray) {
        var varLine = {
                nextVarLine: 0,
                emptyLines: 0
            },
            nextVarLine = {
                nextVarLine: 0,
                emptyLines: 0
            };
        varLine = beautyUtils.findNextVar(codeArray, 0);
        var i = 0;
        while (varLine.nextVarLine !== null) {
            console.log(codeArray[varLine.nextVarLine]);
            i++;
            nextVarLine = beautyUtils.findNextVar(codeArray, varLine.nextVarLine + 1);
            if (nextVarLine.nextVarLine !== null) {
                // If there's only empty lines in between these two 'var' statement lines, remove all those empty lines for good.
                if (nextVarLine.emptyLines > 0) {
                    codeArray.splice(varLine.nextVarLine + 1, nextVarLine.emptyLines);
                }
                varLine = beautyUtils.findNextVar(codeArray, nextVarLine.nextVarLine - nextVarLine.emptyLines);
            } else {
                varLine.nextVarLine = null;
            }
        }
    }
    return {
        beautifulizeCode: combineFollowingVarStatements
    };
});