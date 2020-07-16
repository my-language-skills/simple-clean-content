<?php

/**
 * Simple Clean Content
 *
 * This file is read by WordPress to generate the plugin information in the plugin
 * admin area. This file also includes all of the dependencies used by the plugin,
 * registers the activation and deactivation functions, and defines a function
 * that starts the plugin.
 *
 * @link              https://github.com/my-language-skills/simple-clean-content
 * @since             1.0
 * @package           simple-clean-content
 *
 * @wordpress-plugin
 * Plugin Name:       Simple Clean Content
 * Plugin URI:        https://github.com/my-language-skills/simple-clean-content
 * Description:       This plugin, adds a button on TinyMCE toolbal editor. By clicking the button, all the styles of the text and images that the editor contains are removed, leaving just the paragraphs intact. Additionally, extra spaces as well as extra lines are removed.
 * Version:           1.1
 * Author:            My Language Skills team
 * Author URI:        https://github.com/my-language-skills/
 * License:           GPL 3.0
 * License URI:       http://www.gnu.org/licenses/gpl-3.0.txt
 * Text Domain:       simple-clean-content
 * Domain Path:       /languages
 */

 /**
  * Add required css file for custom icon
  *
  * @since 1.0
  *
  */

function scc_tinymce_additional_css() {
  wp_enqueue_style( 'clean-text-style-tinymce', plugins_url( 'css/simple-clean-content.css', __FILE__ ) );
}
//Load css for all admin pages. It is the first action hooked into the admin scripts actions
add_action( 'admin_enqueue_scripts', 'scc_tinymce_additional_css' );

/**
 * Hook the plugin file for TinyMCE and the button to the editor
 *
 * @since 1.0
 *
 */

function scc_tinymce_main() {
  global $typenow;
  // check the current user's permissions
  if ( !current_user_can('edit_posts') && !current_user_can('edit_pages') ) {
    return;
  }

  // Include only in posts and pages
  if ( !in_array( $typenow, array( 'post', 'page' ) ) ) {
    return;
  }

  // check if WYSIWYG is enabled
  if ( get_user_option('rich_editing') == 'true' ) {
    add_filter( 'mce_external_plugins', 'scc_tinymce_add_plugin' );
    add_filter( 'mce_buttons_2', 'scc_tinymce_register_buttons' );
  }
}
add_action('admin_head', 'scc_tinymce_main');

/**
 * Add TinyMCE plugin file to TinyMCE editor
 *
 * @since 1.0
 *
 */

function scc_tinymce_add_plugin( $plugin_array ) {
  $plugin_array['scc-tinymce-plugin'] = plugins_url( 'js/simple-clean-content.js', __FILE__ );
  return $plugin_array;
}

/**
 * Adds the button defined in the plugin file to the button list on TinyMCE
 *
 * @since 1.0
 *
 */

function scc_tinymce_register_buttons( $buttons ) {
  array_push( $buttons, 'scc_tinymce_custom_icon_button' );
  return $buttons;
}
function load_my_quicktags_inline() {
 
  if ( wp_script_is( 'quicktags' ) ) { ?>
   
      <script>
       
       QTags.addButton('table-mylng', 'table Mylng', '<table><tbody>', '</tbody></table>');
       QTags.addButton('table-myln', 'table tr', '<tr>', '</tr>');
       QTags.addButton('table-myl', 'table td', '<td>', '</td>');

      </script>
   
  <?php }

}
function load_my_quicktags_inline2() {
  if ( wp_script_is( 'quicktags' ) ) { ?>
   
    <script>
      QTags.addButton('alert', 'alert', do_something);
      function do_something() {
        editor.addCommand( 'RemoveTableStyles', function() {
          var node = editor.selection.getStart();
          var table = editor.dom.getParents( node, 'table' );
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
        } );
  }</script>
  <?php }

}
function load_my_quicktags_inline3() {
 
  if ( wp_script_is( 'quicktags' ) ) { ?>
   
      <script>
       QTags.addButton('do something', 'do something', do_something);
       function do_something() {
        var cont = scc_editor.getContent();
       }


      </script>
   
  <?php }

}
add_action( 'admin_print_footer_scripts', 'load_my_quicktags_inline' );
add_action( 'admin_print_footer_scripts', 'load_my_quicktags_inline2' );

?>
