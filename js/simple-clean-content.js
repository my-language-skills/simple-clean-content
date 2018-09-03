(function () {
    tinymce.PluginManager.add('scc-tinymce-plugin', function (scc_editor) {
        // Declare custom icon button
        scc_editor.addButton('scc_tinymce_custom_icon_button', {
            title: 'Clear all text style and formating',
            icon: 'icon scc-icon',
            onclick: function () {
                
                var cont = scc_editor.getContent(); //get the content of the editor
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

                var scc_activeEditor = tinyMCE.get('content');
                var content = strippedTemp;
                if ($('#wp-content-wrap').hasClass('html-active')) { // In text mode
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
