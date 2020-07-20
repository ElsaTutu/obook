<?php 
global $wpdb, $user_ID;


//errors processing
if (isset($_POST['user_registeration']))
{
    //registration_validation($_POST['username'], $_POST['useremail']);
    global $reg_errors;
    $reg_errors = new WP_Error;
    $username=$_POST['username'];
    $useremail=$_POST['useremail'];
    $password=$_POST['password'];
    
    if(empty( $username ) || empty( $useremail ) || empty($password))
    {
        $reg_errors->add('field', 'Vous avez oublié de remplir ce champ');
    }    
    if ( 6 > strlen( $username ) )
    {
        $reg_errors->add('username_length', 'Votre pseudo est trop court. Un minimum de 6 caractères est requis' );
    }
    if ( username_exists( $username ) )
    {
        $reg_errors->add('user_name', 'Ce pseudonyme est déjà utilisé');
    }
    if ( ! validate_username( $username ) )
    {
        $reg_errors->add( 'username_invalid', 'Le pseudonyme utilisé est invalide !' );
    }
    if ( !is_email( $useremail ) )
    {
        $reg_errors->add( 'email_invalid', ' L\'email n\'est pas valide!' );
    }
    
    if ( email_exists( $useremail ) )
    {
        $reg_errors->add( 'email', 'Cet email est déjà utilisé par un autre compte!' );
    }
    if ( 5 > strlen( $password ) ) {
        $reg_errors->add( 'password', 'Le mot de passe doit faire au moins 5 catactères !' );
    }
    
    if (is_wp_error( $reg_errors ))
    { 
        foreach ( $reg_errors->get_error_messages() as $error )
        {
             $signUpError='<p style="color:#FF0000; text-aling:left;"><strong>Oups, il y a un problème</strong>: '.$error . '<br /></p>';
        } 
    }
    if ( 1 > count( $reg_errors->get_error_messages() ) )
    {
        // sanitize user form input
        global $username, $useremail;
        $username   =   sanitize_user( $_POST['username'] );
        $useremail  =   sanitize_email( $_POST['useremail'] );
        $password   =   esc_attr( $_POST['password'] );
        
        $userdata = array(
            'user_login'    =>   $username,
            'user_email'    =>   $useremail,
            'user_pass'     =>   $password,
            );
        $user = wp_insert_user( $userdata );
    };
    if (isset($userdata)) {
        echo 'Bravo, votre compte a bien été créé, vous pouvez vous connecter';}
    

}