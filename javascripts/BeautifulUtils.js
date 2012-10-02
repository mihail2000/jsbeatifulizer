/*
* BeautifulUtils
*
* String manipulation functions used by all code beautifulizer functions.
*
* Copyright: Miika Haapalainen 2012. Licensed under GPL.
*/
/*jslint plusplus: true*/
/*global define, $, console*/
define(function () {
    'use strict';
    /*
    * findLine
    *
    * Finds the first line from the code, containing the given search string and returns the number of the line.
    *
    * Parameters:
    *  codeArray - Array of strings, one array item containing one line of code
    *  startLine - Line number (index of the array) where to begin the search
    *  searchString - string to be searched
    *
    * Returns:
    *  Line number = index in codeArray containing the given string or NULL if the string does not exist.
    */
    function findLine(codeArray, startLine, searchString) {
        var i = startLine,
            s = '',
            retval = null;
        while (i !== null && i < (codeArray.length - 1)) {
            s = codeArray[i];
            if (s !== undefined) {
                if (s.indexOf(searchString) !== -1) {
                    retval = i;
                    break;
                }
            }
            i++;
        }
        return retval;
    }
    /*
    * ltrim
    *
    * Performs LTrim
    *
    * Parameters:
    *  s - string to trim
    *
    * Returns:
    *  LTrim'd string
    */
    function ltrim(s) {
        return s.replace(/^\s+/, "");
    }
    /*
    * findNextVar
    *
    * Finds next line containing 'var' statement
    *
    * Parameters:
    *  codeArray - Array of strings (each item containing one line of code)
    *  startLine - Where to start the search (line number)
    *
    * Returns:
    *  NULL if not found or object with the following properties:
    *      nextVarLine - line number of the next line with 'var' statement
    *      emptyLines - number of empty lines between 'startLine' and the this 'var' statement
    */
    function findNextVar(codeArray, startLine) {
        var s = '',
            retval = null,
            i = startLine,
            emptyLineCounter = 0,
            onlyEmptyLinesBetween = true;
        // Find next occurrence of var
        while (i !== null && i < (codeArray.length - 1) && retval === null) {
            console.log(i);
            s = codeArray[i];
            if (s !== undefined) {
                if ($.trim(s) === '') {
                    emptyLineCounter++;
                } else {
                    onlyEmptyLinesBetween = false;
                }
                s = ltrim(s);
                if (s.substring(0, 3) === 'var') {
                    retval = i;
                    break;
                } else {
                    retval = null;
                }
            } else {
                retval = null;
            }
            i++;
        }
        return {
            nextVarLine: retval,
            emptyLines: emptyLineCounter
        };
    }
    /*
    * getLeadingSpaces
    *
    * Finds the character index of the first space in the given line.
    *
    * Parameters:
    *  s - line of code
    *
    * Returns:
    *  Returns the index of the first space character
    */
    function getLeadingSpaces(s) {
        var i = 0,
            retval = null;
        for (i = 0; i < s.length; i++) {
            if (s[i] !== ' ') {
                retval = i;
                break;
            }
        }
        return retval;
    }
    /*
    * indentLine
    *
    * Indents given code line with spaces.
    * Note this function does not give a rats ass if the line is trimmed or not.
    * Simply just adds space characters to the line.
    *
    * Parameters:
    *  s - line of code to indent
    *  indentation - indentation level, i.e. number of spaces to indent.
    *
    * Returns:
    *  Indented string.
    */
    function indentLine(s, indentation) {
        var i = 0,
            indentString = '';
        for (i = 0; i < indentation; i++) {
            indentString += ' ';
        }
        return indentString + s;
    }
    return {
        findLine: findLine,
        ltrim: ltrim,
        findNextVar: findNextVar,
        getLeadingSpaces: getLeadingSpaces,
        indentLine: indentLine
    };
});
