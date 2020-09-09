QTags.addButton('cleanTableStyle', 'cleanTableStyle', do_something);
function do_something() {
  ( function( ) {
    console.log("Works1");
 
      console.log("Works2");
      ( function(editor) {
        console.log("Works3");
        //var node = editor.selection.getStart();
        var table = editor.dom.getParents(  'table' );
        var attr = {
          style: null,
          'data-mce-style': null,
          width: null,
          height: null,
          minWidth: null,
          maxWidth: null,
          minHeight: null,
          maxHeight: null,
          align: null,
          valign: null,
          axis: null,
          'char': null,
          charoff: null,
          bgcolor: null,
          border: null,
          cellspacing: null,
          cellpadding: null
        };
        console.log("Works4");
        if ( table ) {
          console.log("Works5");
          editor.$( table ).attr( attr ).find( 'tr, th, td, thead, tbody, tfoot' ).each( function( i, element ) {
            editor.$( element ).attr( attr );
          } );
          console.log("Works6");
        }
      }( window.tinymce ));

  }( window.tinymce ));
    
}
  
