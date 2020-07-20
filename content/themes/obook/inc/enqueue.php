<?php

// style function
if (!function_exists('obook_enqueue')){
    function obook_enqueue()
    {
        wp_enqueue_style(
            'main-style',
            get_theme_file_uri('public/css/style.css'),
            [],
            '20200422'
        );
        wp_enqueue_script(
            'app',
            get_theme_file_uri('public/js/app.js'),
            [],
            '20200422',
            true
        );
    }
}
add_action('wp_enqueue_scripts', 'obook_enqueue');