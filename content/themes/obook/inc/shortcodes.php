<?php 
// function for the current date for the footer

function currentYear(){
    return date('Y');
}
add_shortcode( 'year', 'currentYear' );