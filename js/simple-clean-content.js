(function () {
    tinymce.PluginManager.add('scc-tinymce-plugin', function (scc_editor) {
        // Declare custom icon button
        scc_editor.addButton('scc_tinymce_custom_icon_button', {
            title: 'Clear all text style and formating',
            icon: 'icon scc-icon',
            onclick: function () {

                var cont = scc_editor.getContent(); //get the content of the editor

                /*
                 *  Search for break tags inside paragraph tags and replace them
                 */
                function breakSearchAndReplace(cont) {
                    var searchMultiBrs = cont.search(/(<br\s*\/?>){2,}/gi); //Search for multiple break tags inside paragraph tags
                    while (searchMultiBrs != -1) {

                        cont = cont.replace(/(<br\s*\/?>){2,}/gi, "+-+");

                        searchMultiBrs = cont.search(/(<br\s*\/?>){3,}/gi);
                    }
                    var searchRes = cont.search("<br />");
                    while (searchRes != -1) {

                        cont = cont.replace("<br />", "+-+"); //replace break tags so they will not be removed on tag cleanup

                        searchRes = cont.search("<br />");
                    }
                    return formatContent(cont);
                }
                
                /*
                 *  Remove all tags except paragraph and trim extra lines and spacing
                 */
                function formatContent(cont) {
                    var stripped = cont.replace(/<(?!\s*\/?\s*p\b)[^>]*>/gi, ""); //remove all tags except paragraph
                    var strippedTemp = stripped.replace(/\s+/g, ' ').trim(); //trim all extra spacing

                    var searchRes1 = strippedTemp.search("<p> </p>");
                    var searchRes2 = strippedTemp.search("<p></p>");

                    while (searchRes1 != -1 || searchRes2 != -1) { //while loop to remove all lines

                        strippedTemp = strippedTemp.replace("<p> </p>", " "); //replace all empty paragraph tags with " "
                        strippedTemp = strippedTemp.replace("<p></p>", " "); //replace all empty paragraph tags with " "

                        searchRes1 = strippedTemp.search("<p> </p>");
                        searchRes2 = strippedTemp.search("<p></p>");
                    }
                    return removeExtraLines(strippedTemp);
                }
                
                /*
                 *  Replace certain combinations that cause extra lines to appear
                 */
                function removeExtraLines(strippedTemp) {
                    var searchResSDF = strippedTemp.search("/\+-\+/</p>");
                    var searchResSDG = strippedTemp.search("<p>/\+-\+/</p>");

                    while (searchResSDF != -1 || searchResSDG != -1) { //while loop to remove all lines

                        strippedTemp = strippedTemp.replace("/\+-\+/</p>", "</p>"); //replace all +-+</p> with "</p>"
                        strippedTemp = strippedTemp.replace("<p>/\+-\+/</p>", ""); //replace all <p>+-+</p> with ""

                        searchResSDF = strippedTemp.search("/\+-\+/</p>");
                        searchResSDG = strippedTemp.search("<p>/\+-\+/</p>");
                    }
                    return replaceBrTagsToP(strippedTemp);
                }
                
                /*
                 *  Replace break tags to paragraph
                 */
                function replaceBrTagsToP(strippedTemp) {
                    var strippedTempNew = strippedTemp.split(/(?=<p>)/g); // Splitting all <p> tags to a table
                    var strippedTempFinal = "";
                    var reg = /\+-\+/; // The combination we set for the break tags before

                    var i;
                    var len = strippedTempNew.length; // Length of the strippedTempNew table
                    for (i = 0; i < len; i++) { // For each table element
                        var searchRes3 = strippedTempNew[i].search(reg);
                        while (searchRes3 != -1) {

                            strippedTempNew[i] = strippedTempNew[i].replace(reg, "</p><p>"); // replace the previous set combination, back to
                            // the break tags if it appears inside a paragraph tag
                            searchRes3 = strippedTempNew[i].search(reg);
                        }
                        strippedTempFinal += strippedTempNew[i];
                    }
                    return strippedTempFinal;
                }
                
                var scc_activeEditor = tinyMCE.get('content');
                var content = formatContent(breakSearchAndReplace(cont));
                if (jQuery('#wp-content-wrap').hasClass('html-active')) { // In text mode
                    $('#content').val(content); // Update the textarea's content
                } else { // In tinyMCE mode
                    var scc_activeEditor = tinyMCE.get('content');
                    if (scc_activeEditor !== null) { // Verify the call of setContent is not on null
                        scc_activeEditor.setContent(content); // Update tinyMCE's content
                    }
                }
            }
        });
    });
})();
