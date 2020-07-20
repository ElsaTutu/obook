<?php
// using wp_signon it's ok but to authentification but bug I have to enter twice the data to enter
// global $wpdb, $user_ID;
// if (isset($_POST['user_authentification'])) 
// {  
   
     

//     global $reg_errors;
//     $reg_errors = new WP_Error;
//     $username=$_POST['user_authentification']; 
//     $password=$_POST['password'];   

//     if ( 1 > count( $reg_errors->get_error_messages() ) )
//     {
//     $login_data = array();  
//     $login_data['user_login'] = $username;  
//     $login_data['user_password'] = $password;  
   
//     $user_verify = wp_signon( $login_data); 
//     } 

// }

// function wpdocs_custom_login() {
//     $creds = array(
//         'user_login'    => 'example',
//         'user_password' => 'plaintextpw',
//         'remember'      => true
//     );
//     $user = wp_signon( $creds, false );
//     if ( is_wp_error( $user ) ) {
//         echo $user->get_error_message();
//     }
// }
// // Run before the headers and cookies are sent.
// add_action( 'after_setup_theme', 'wpdocs_custom_login' );

