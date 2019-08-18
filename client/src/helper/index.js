import React from 'react'

export function placeCaretAtEnd(el) {
    el.focus();
    if (typeof window.getSelection != "undefined"
            && typeof document.createRange != "undefined") {
        var range = document.createRange();
        range.selectNodeContents(el);
        range.collapse(false);
        var sel = window.getSelection();
        sel.removeAllRanges();
        sel.addRange(range);
    } else if (typeof document.body.createTextRange != "undefined") {
        var textRange = document.body.createTextRange();
        textRange.moveToElementText(el);
        textRange.collapse(false);
        textRange.select();
    }
}

export const findColNum = () => Math.floor(window.innerWidth / 300)

// paragraph separators such as <br> and <div> in contentEditable html elements are escaped
// meaning they are intrepreted as strings instead of html elements
// this function should replace the strings with the html elements so we can display line breaks created by that html
export function replaceEscapedStringWithHtmlElement(string) {
	if (string.includes('<div>')) {
		string = string.replace(/<\/div>/g,'')
		string = string.replace(/<div>/g,'<br>')
	}
	return string.split('<br>').map((s, index) => index !== 0 ? <><br/>{s}</> : s)
}

export function sanitize(str) {
	// remove line feed characters that are inserted by contentEditable span
	return str.replace(/\n/gi, ' ')
}

export function preventLineBreak (e) {
	// prevent 'enter' key from creating line break in title box
	if (e.keyCode === 13) {
		e.preventDefault()
		// instead go to TextInputBox
		document.querySelector('#text').focus()
	}
}