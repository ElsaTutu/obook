<?php 

global $current_user; wp_get_current_user();

//display the current user_login
if ( is_user_logged_in() ) { 
 echo  $current_user->user_login ; } 
else { wp_loginout(); } ?>