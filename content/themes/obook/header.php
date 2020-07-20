<!DOCTYPE html>
<html <?php language_attributes(); ?>>
<head>
    <meta charset="<?php bloginfo('charset') ?>">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>oBook</title>
    <!-- <link rel="stylesheet" href="css/style.css" /> -->
    <?php wp_head(); ?>

</head>

<body>

    
    <header class="obookheader">
        <!-- description and logo of the website -->
        <div class="obookheader_logo">
            <img src="<?php echo get_stylesheet_directory_uri(); ?>/public/images/obook_logo.jpg" class="obookheader_logo_img" alt="logo">
        </div>
        
        <div class="obookheader_navbar">
            <!-- links for the differents pages -->
            <div class="obookheader_navbar_links">
                
                <!-- <a href="<?php // echo home_url(); ?>">Home</a>
                <a href="#">Contact</a>
                <a href="#">FAQ</a>
                <a href="#">Règles de publications</a> -->

                <!-- function to dynamise the header menu -->
                <?php
                    $menu = wp_nav_menu([
                        'theme_location' => 'main-menu',
                        'container_class' => 'obookheader_navbar_links',
                        'echo' => false
                        ]);
                    $menu = strip_tags($menu, '<a><div>');
                    $menu = str_replace(['menu-item', 'class="menu"'], ['main-nav__item', ''], $menu);
                    echo $menu;
                ?>
                
            </div>

            
        </div>

        <div>
            
        </div>
        
        <!-- display the current user_login if logged -->
       

        <!-- connection button -->
        <div class="obookheader_navbar_button">
            <a href="#" class="obookheader_navbar_button_connection">Se connecter</a>
        </div>

        <div class="modal_forms" id="modal_forms">
        <div class="modal_forms_content" id="modal_forms_content">

        <span class="close">&times;</span>

      <div class="modal_form_login">
      
          <h3 class="modal_form_login_title">Se connecter</h3>
          <span class="error" id="errorname"></span>
          <form action="" method="post" name="user_authentification" class="modal_form_login_form" id="login-form">
            <div class="modal_form_login_form_pseudo">
                <label>Pseudonyme <span class="error">*</span></label>  
                <input type="text" name="username" id="login-user-name" placeholder="Pseudonyme" class="text" required />
            </div>
              <div class="modal_form_login_form_password">
                  <label>Mot de passe <span class="error">*</span></label>
              <input type="password" name="password" id="login-user-password" class="text" placeholder="Mot de passe" required />
              </div>
              <div class="modal_form_login_form_submit">
                  <input type="submit" name="user_authentification" value="Se connecter" class="modal_form_login_submit" />
              </div>
              <?php  require 'login.php'; ?>
              
          </form> 
      </div>

      <div class="modal_form_signin">
      <?php  require 'signin.php'; ?>
          <h3 class="modal_form_signin_title">Création d'un compte</h3>
          <form action="" method="post" name="user_registeration" class="modal_form_login_form">
            <div class="modal_form_signin_form_pseudo">
                <label>Pseudonyme <span class="error">*</span></label>  
                <input type="text" name="username" placeholder="Pseudonyme" class="text" required />
            </div>
            <div class="modal_form_signin_form_email">
                <label>Email <span class="error">*</span></label>
                <input type="text" name="useremail" class="text" placeholder="Email" required />
            </div>
            <div class="modal_form_signin_form_password">
                <label>Mot de passe <span class="error">*</span></label>
                <input type="password" name="password" class="text" placeholder="Mot de passe" required />
            </div>
            <div class="modal_form_signin_form_submit">
                <input type="submit" name="user_registeration" value="Créer un compte" class="modal_form_signin_submit" />
            </div> 
            
            <?php if(isset($signUpError)){echo '<div>'.$signUpError.'</div>';}?>
          </form>
          
      </div>
      </div>
    </div>
         
        <!-- burger button -->
        <a href="#" class="ui-button open-menu">
            <i class="fa fa-bars" aria-hidden="true"></i>
        </a><a href="#" class="ui-button open-menu">
      </a>

      
    </header>