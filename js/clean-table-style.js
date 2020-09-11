QTags.addButton('cleanTableStyle', 'cleanTableStyle', do_something);
function do_something() {
  ( function( ) {
      ( function(editor) {
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
        if ( table ) {
          editor.$( table ).attr( attr ).find( 'tr, th, td, thead, tbody, tfoot' ).each( function( i, element ) {
            editor.$( element ).attr( attr );
          } );
        }
      }( window.tinymce ));

  }( window.tinymce ));
    
}
  
