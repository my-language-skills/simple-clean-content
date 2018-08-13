<?php
/*
    Plugin Name: Clean Text Style
    Description: This plugin, adds a button on TinyMCE toolbal editor. By clicking the button, all the styles of the text and images that the editor contains are removed, leaving just the paragraphs intact. Additionally, extra spaces as well as extra lines are removed.
    Plugin URI: #
    Version: 1.0
    License: GPL-2.0
*/

// Add required css file for custom icon

function clean_text_style_tinymce_additional_css() {
  wp_enqueue_style( 'clean-text-style-tinymce', plugins_url( 'css/clean-text-style-tinymce.css', __FILE__ ) );
}
add_action( 'admin_enqueue_scripts', 'clean_text_style_tinymce_additional_css' );

// Hook the plugin file for TinyMCE and the button to the editor

function clean_text_style_tinymce_main() {
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
    add_filter( 'mce_external_plugins', 'clean_text_style_tinymce_add_plugin' );
    add_filter( 'mce_buttons_2', 'clean_text_style_tinymce_register_buttons' );
  }
}
add_action('admin_head', 'clean_text_style_tinymce_main');

// Add TinyMCE plugin file to TinyMCE editor

function clean_text_style_tinymce_add_plugin( $plugin_array ) {
  $plugin_array['clean-text-style-tinymce-plugin'] = plugins_url( 'js/clean-text-style-tinymce-plugin.js', __FILE__ );
  return $plugin_array;
}

// Adds the button defined in the plugin file to the button list on TinyMCE

function clean_text_style_tinymce_register_buttons( $buttons ) {
  array_push( $buttons, 'clean_text_style_tinymce_custom_icon_button' );
  return $buttons;
}

?>