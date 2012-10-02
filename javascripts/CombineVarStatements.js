/*
* BeautifulUtils
*
* According to JavaScript conventions, there should only be one 'var' statement per function.
* This beautifulizer function combines multiple var statements into one.
*
* Currently does not take into account var statements here and there in function. Only works if var statements are one after another.
*
* Copyright: Miika Haapalainen 2012. Licensed under GPL.
*/
/*jslint plusplus: true*/
/*global define, $, console*/
define (['BeautifulUtils'], function (beautyUtils) {
    'use strict';
    function CombineVarStatements(codeArray) {
        var varLine = {
                nextVarLine: 0,
                emptyLines: 0
            },
            nextVarLine = {
                nextVarLine: 0,
                emptyLines: 0
            },
            indentation = 0,
            firstOccurrence = true,
            emptyLineCounter = 0;
        console.log('combineVarStatements begins');
        varLine = beautyUtils.findNextVar(codeArray, 0);
        
        while (varLine.nextVarLine !== null) {
            nextVarLine = beautyUtils.findNextVar(codeArray, varLine.nextVarLine + 1);
            while (nextVarLine.nextVarLine - 1 === varLine.nextVarLine) {
                codeArray[varLine.nextVarLine] = codeArray[varLine.nextVarLine].replace(';', ',');
                indentation = beautyUtils.getLeadingSpaces(codeArray[varLine.nextVarLine]);
                codeArray[nextVarLine.nextVarLine] = codeArray[nextVarLine.nextVarLine].replace('var', '');
                codeArray[nextVarLine.nextVarLine] = $.trim(codeArray[nextVarLine.nextVarLine]);
                if (firstOccurrence) {
                    indentation += 4;
                    firstOccurrence = false;
                }
                codeArray[nextVarLine.nextVarLine] = beautyUtils.indentLine(codeArray[nextVarLine.nextVarLine], indentation);
                varLine = nextVarLine;
                nextVarLine = beautyUtils.findNextVar(codeArray, varLine.nextVarLine + 1);
            }
            firstOccurrence = true;
            varLine = beautyUtils.findNextVar(codeArray, nextVarLine.nextVarLine);
        }
    }
    return {
        beautifulizeCode: CombineVarStatements
    }
});