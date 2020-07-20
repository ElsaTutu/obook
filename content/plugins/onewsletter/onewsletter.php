<?php

/*
Plugin Name: oNewsletter
Description: Plugin permettant d'enregistrer dans une table custom les e-mails des personnes désirant recevoir la newsletter  
Author: Team oBook
Version: 1.0
*/

// On sécurise le plugin
if (!defined('WPINC')) { die; }



class oNewsletter
{

    public function __construct()
    {
        add_action('init', [$this, 'onewsletter_table_create']);
    }



    // crée la table wp_onewsletter
    // lors de l'activation du plugin !
    public function onewsletter_table_create()
    {

        /**
        * Si inexistante, on crée la table SQL "wp_onewsletter" 
        */

        global $wpdb;

        $charset = $wpdb->get_charset_collate();

        //$wpdb->prefix vaut souvent "wp_"
        $table_name = $wpdb->prefix . 'onewsletter';

        // requête sql pour créer la table  wp_onewsletter si elle n'existe pas
        $query = "CREATE TABLE IF NOT EXISTS $table_name 
        (
            id         int(10)       NOT NULL  AUTO_INCREMENT,
            user_name  varchar(20)   DEFAULT '',
            email      varchar(60)   DEFAULT '',
            PRIMARY KEY  (id)

        ) $charset;"; 


        // dbDelta est définie dans upgrade.php
        require_once(ABSPATH."wp-admin/includes/upgrade.php");

        // exécuter cette requête
        dbDelta($query);

    }








    // méthode qui supprime la table wp_onewsletter
    public function onewsletter_table_remove()
    {
        global $wpdb;

        
        $table_name = $wpdb->prefix . 'onewsletter';

        // requête pour supprimer la  table wp_onewsletter
        $query = "DROP TABLE IF EXISTS $table_name;";

        // exécuter cette requête
        $wpdb->query($query);

    }



    // méthode qui affiche le formulaire d'inscription
    // en ENTIER, ne permettant pas d'insérer d'autres balises
    // dans ce formulaire    
    public function onewsletter_form_display()
    {


        $adWordpress = get_site_url();

        echo "<form action = '" . $adWordpress . "/wp-admin/admin-post.php' method = 'post' class='onewsletterform'>";

        echo "<input  type='hidden'  name='action' value='onewsletter'>";
        echo "<input  type='email'   name='email'  class='onewsletterform__input'>";

        echo "<button type='submit'  name='save'   class='onewsletterform__button'>Save</button>";


        echo "</form>";  
    }


    // OU...


    // 4 méthodes qui affichent 4 parties distinctes du formulaire 
    // permettant d'insérer d'autres balises entre les différentes 
    // balises du formulaire
    // --------------------------------------------------------------------

    // méthode qui affiche seulement la balise <FORM>
    public function onewsletter_form_display_1form()
    {
        $adWordpress = get_site_url();
        echo "<form action = '" . $adWordpress . "/wp-admin/admin-post.php' method = 'post' class='onewsletterform'>";
    }

    // méthode qui affiche seulement la balise <INPUT>
    public function onewsletter_form_display_2input()
    {
        echo "<input  type='hidden'  name='action' value='onewsletter'>";
        echo "<input  type='email'   name='email'  class='onewsletterform__input'>";
    }

    // méthode qui affiche seulement la balise <BUTTON>
    public function onewsletter_form_display_3button()
    {
        echo "<button type='submit'  name='save'   class='onewsletterform__button'>Save</button>";
    }

    // méthode qui affiche seulement la balise </FORM>
    public function onewsletter_form_display_4form()
    {
        echo "</form>";  
    }

















    // méthode qui crée un enregistrement dans la table wp_onewsletter
    public function onewsletter_table_insert()
    {
        
        if ( isset($_POST['save']) )
        {        
            // si le champ email n'est pas vide
            if ( $_POST['email'] != '' )
            { 

                global $wpdb;

                $table_name = $wpdb->prefix . 'onewsletter';
                
                // traitement de la donnée récupérée
                $DB_email      = sanitize_email( $_POST['email'] ); 

                // recherche d'une adresse email identique dans la table des users de wordpress
                $DB_user_login = $wpdb->get_row( "SELECT user_login FROM $wpdb->users WHERE user_email = '$DB_email'", ARRAY_N );

        
                $wpdb->insert(
                    $table_name,
                    array
                    (
                        'user_name' => (string)$DB_user_login[0],  // s'il existe un user_login correspondant 
                                                                   // sinon ce champ sera vide
                        'email'     => $DB_email 
                    ),
                    array
                    (
                        '%s',  
                        '%s'  
                    )
                );



            }

        }


        // retour à la page index.php
        wp_redirect( home_url() );
        exit;


    }



    // Nous n'utiliserons pas cette fonction
    // préférant utiliser la fdestyles du projet : style.css  
    // pour associer des styles aux classes du formulaire du plugin

    public function onewsletter_style() 
    {
        // classes de notre formulaire
        echo 
        '<style type="text/css">

            .onewsletterform
            {
                width: 20%;
                height:2em;
            }


            .onewsletterform__input
            {
                width:100%;
                height:2em;
                margin-bottom:1em;               
            }


            .onewsletterform__button
            {
                width:100%;
                height:2em;  
                margin-bottom:1em;                                
            }


        </style>';
    }
    






    public function onewsletter_activate()
    {
        $this->onewsletter_table_create();
    }


    public function onewsletter_deactivate()
    {
        $this->onewsletter_table_remove();
    }
   
}



$onewsletter = new oNewsletter();






// A l'activation du plugin
register_activation_hook  ( __FILE__,        [$onewsletter, 'onewsletter_activate'] );

// A la désactivation du plugin
register_deactivation_hook( __FILE__,        [$onewsletter, 'onewsletter_deactivate'] );
 



// hook qui survient lors de la soummision de notre formulaire (user non connecté)
add_action( 'admin_post_nopriv_onewsletter', [$onewsletter, 'onewsletter_table_insert'] );

// hook qui survient lors de la soummision de notre formulaire (user connecté)
add_action( 'admin_post_onewsletter',        [$onewsletter, 'onewsletter_table_insert'] );

// Nous n'utiliserons pas cette fonction
// add_action( 'wp_head',                       [$onewsletter, 'onewsletter_style'] );



// hook pour afficher le form ENTIER
add_action( 'onewsletterform',               [$onewsletter, 'onewsletter_form_display'] );




// hook pour afficher seulement la balise <form>
add_action( 'onewsletterform1',              [$onewsletter, 'onewsletter_form_display_1form'] );

// hook pour afficher seulement la balise <INPUT>
add_action( 'onewsletterform2',              [$onewsletter, 'onewsletter_form_display_2input'] );

// hook pour afficher seulement la balise <BUTTON>
add_action( 'onewsletterform3',              [$onewsletter, 'onewsletter_form_display_3button'] );

// hook pour afficher seulement la balise </form>
add_action( 'onewsletterform4',              [$onewsletter, 'onewsletter_form_display_4form'] );


   
