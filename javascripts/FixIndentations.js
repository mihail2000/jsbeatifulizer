/*
* FixIndentations
*
* Mother of all problems with JSLint - indentations!
* After running the automatic indentations, there should be ZERO warnings from JSLint
*
* Copyright: Miika Haapalainen 2012. Licensed under GPL.
*/
/*jslint plusplus: true*/
/*global define, $, console*/
define(['BeautifulUtils'], function (beautyUtils) {
    'use strict';
    /*
    * getLineWithoutComments
    *
    * Extracts comments out form the given code line and returns the extracted line.
    *
    * Parameters:
    *  codeLine - Line of code to parse
    *
    * Returns:
    *  Code line w/o comment lines (currently only works, if comment lines are in the end of the line)
    */
    function getLineWithoutComments(codeLine) {
        // ASSUMPTION: If there's '//' at some point of the line, rest of the line is commented
        var idx = codeLine.indexOf('//'),
            tmpString = '',
            s = '';
        if (idx !== -1) {
            // ASSUMPTION: Line is only commented, if there is no ' or " character right before // characters.
            if (idx > 0) {
                tmpString = codeLine.substring(idx - 1, idx);
                if (tmpString === "'" || tmpString === '"') {
                    s = codeLine;
                } else {
                    s = codeLine.substring(0, idx);
                }
            }
            if (s === '') {
                s = codeLine.substring(0, idx);
            }
        } else {
            s = codeLine;
        }
        return s;
    }
    function getClosureIndentationStep(s) {
        var i,
            indentation = 0;
        for (i = 0; i < s.length; i++) {
            
        }
    }
    /*
    * fixIndentations
    *
    * Automatically fixes JavaScript indentations to satisfy JSLint
    *
    * Parameters:
    *  codeArray - array of strings, where one item in the array represents one line of code.
    *
    * Returns:
    *  n/a
    */
    function fixIndentations(codeArray) {
        var CONST_DEFAULT_INDENTATION = 4,
            indentationLevel = 0,
            blockStart = 0,
            blockEnds = 0,
            semicolonpos = 0,
            commapos = 0,
            blockEndsCount = 0,
            blockStartsCount = 0,
            i = 0,
            s = '',
            waitingForEndLine = false;
        for (i = 0; i < codeArray.length; i++) {
            s = beautyUtils.ltrim(codeArray[i]);
            if (s.substring(0, 2) !== '//') {
                blockStartsCount = (getLineWithoutComments(s).split(/{/g).length - 1);
                blockEndsCount = (getLineWithoutComments(s).split(/}/g).length - 1);                
                blockStart = getLineWithoutComments(s).lastIndexOf('{');
                blockEnds = getLineWithoutComments(s).lastIndexOf('}');
                semicolonpos = getLineWithoutComments(s).lastIndexOf(';');
                commapos = getLineWithoutComments(s).lastIndexOf(',');
                if (blockEnds > -1 && (blockEndsCount > blockStartsCount || getLineWithoutComments(s).indexOf('}') === 0)) {
                    indentationLevel -= CONST_DEFAULT_INDENTATION * blockEndsCount;
                }
                codeArray[i] = beautyUtils.indentLine(s, indentationLevel);
                if (i === 39) {
                    console.log(i);
                }
                // Does this line start a new block that does not end on this line?
                if (blockStart !== -1 &&  blockEnds < blockStart) {
                    //if (codeArray[i].indexOf("'{'") === -1) {
                    indentationLevel += CONST_DEFAULT_INDENTATION;
                    //}
                } else if (waitingForEndLine && s.indexOf(';') !== -1) {
                    indentationLevel -= CONST_DEFAULT_INDENTATION;
                    waitingForEndLine = false;
                    // Does this line end with ',' or not end in ';' --> if yes, increase indentation
                } else if (!waitingForEndLine && commapos === (getLineWithoutComments(s).length - 1)) {
                    if (s.substring(0, 3) === 'var') {
                        indentationLevel += CONST_DEFAULT_INDENTATION;
                        waitingForEndLine = true;                        
                    }
                    // Does this line end a block (decrease indentation)
                } //else if (codeArray[i].indexOf('}') !== -1) {
                //indentationLevel -= CONST_DEFAULT_INDENTATION;
                //}
            } else {
                codeArray[i] = beautyUtils.indentLine(s, indentationLevel);
            }
            console.log(codeArray[i]);
        }
    }
    return {
        beautifulizeCode: fixIndentations
    };
});
