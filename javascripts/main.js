/*jslint plusplus: true*/
/*global window, require, define, $, Kinetic, console, Modernizr, document, location*/
//require.config({urlArgs: 'bust=' + (new Date()).getTime()});

//require(function () {
//    'use strict';
function removeTrailingSpaces(codeArray) {
    'use strict';
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
function findNextVar(codeArray, startLine) {
    'use strict';
    var s = '',
        retval = null,
        i = 0;
    // Find next occurrence of var
    for (i = startLine; i < codeArray.length; i++) {
        s = codeArray[i];
        s = s.replace(/^\s+/, ""); // Do LTrim
        if (s.substring(0, 3) === 'var') {
            retval = i;
            break;
        }
    }
    return retval;
}
function getLeadingSpaces(s) {
    'use strict';
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
function indentLine(s, indentation) {
    'use strict';
    var i = 0,
        indentString = '';
    for (i = 0; i < indentation; i++) {
        indentString += ' ';
    }
    return indentString + s;
}
function combineVarStatements(codeArray) {
    'use strict';
    var varLine = 0,
        nextVarLine = 0,
        indentation = 0,
        firstOccurrence = true;
    console.log('combineVarStatements begins');
    varLine = findNextVar(codeArray, 0);
    
    while (varLine !== null && varLine < 400) {
        nextVarLine = findNextVar(codeArray, varLine + 1);
        while (nextVarLine - 1 === varLine) {
            console.log('changing...');
            codeArray[varLine] = codeArray[varLine].replace(';', ',');
            indentation = getLeadingSpaces(codeArray[varLine]);
            codeArray[nextVarLine] = codeArray[nextVarLine].replace('var', '');
            codeArray[nextVarLine] = $.trim(codeArray[nextVarLine]);
            if (firstOccurrence) {
                indentation += 4;
                firstOccurrence = false;
            }
            codeArray[nextVarLine] = indentLine(codeArray[nextVarLine], indentation);
            varLine = nextVarLine;
            nextVarLine = findNextVar(codeArray, varLine + 1);
        }
        firstOccurrence = true;
        varLine = findNextVar(codeArray, nextVarLine);
        console.log('varline ' + varLine);
    }
}
function writeNewCode(codeArray) {
    'use strict';
    var i = 0,
        s = '';
    console.log('writeNewCode begins');
    for (i = 0; i < codeArray.length; i++) {
        s = s + codeArray[i] + '\n';
    }
    $('#newcode').val(s);
}
function beatifulizeCode() {
    'use strict';
    var oldCode = $('#oldcode').val(),
        codeArray;
    $('#newcode').val('');
    codeArray = oldCode.split('\n');
    console.log('beatifulizeCode begins');
    removeTrailingSpaces(codeArray);
    combineVarStatements(codeArray);
    writeNewCode(codeArray);
}
$('#beatifulize').click(function () {
    'use strict';
    beatifulizeCode();
});
//});
