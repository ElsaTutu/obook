<?php
// setup function for the menus
if (!function_exists('obook_setup')):

    function obook_setup()
    {
        // https://developer.wordpress.org/reference/functions/add_theme_support/
        add_theme_support('title-tag');
        add_theme_support('post-thumbnails');

        register_nav_menus([
            'main-menu' => __('Menu de navigation en haut de la page', 'obook'),
            'burger-menu' => __('Menu de navigation qui apparait au clic à droite de la page', 'obook'),
        ]);

    }

endif;

add_action('after_setup_theme', 'obook_setup');


// function to add categories to pages https://developer.wordpress.org/reference/functions/register_taxonomy_for_object_type/
function add_categories_to_pages() {
    register_taxonomy_for_object_type( 'category', 'page' );
    }
   add_action( 'init', 'add_categories_to_pages' );


// function to add categories to articles
function add_tags_to_pages() {
    register_taxonomy_for_object_type( 'post_tag', 'page' );
    }
    add_action( 'init', 'add_tags_to_pages');



