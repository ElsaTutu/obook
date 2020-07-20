<footer class="obookfooter">
        <div class="obookfooter_confidentiality_privacy">
            <!-- <a href="#">Politique de confidentialité</a> -->
            <?php
                    $menu = wp_nav_menu([
                        'theme_location' => 'burger-menu',
                        'container_class' => '<footer class="obookfooter',
                        'echo' => false
                        ]);
                    $menu = strip_tags($menu, '<a><div>');
                    $menu = str_replace(['menu-item', 'class="menu"'], ['main-nav__item', ''], $menu);
                    echo $menu;
                ?>
        </div>
        <div class="obookfooter_copyright"><?php echo currentYear(); ?> - <?php bloginfo('name'); ?></div>
        <div class="obookfooter_social_link">
            <a href="https://telegram.org/"><i class="fa fa-telegram"></i></a>
            <a href="https://www.facebook.com/"><i class="fa fa-facebook"></i></a>
            <a href="https://www.tumblr.com/"><i class="fa fa-tumblr"></i></a>
        </div>
    </footer>

    <?php wp_footer(); ?>
</body>



  

<template id="books-row">

    <div class="books-row">
        <div class="card books-row__card" id="book1">
            <div class="card-image">
              <img class="books-row__image" src="<?php echo get_stylesheet_directory_uri(); ?>/public/images/imagevide.png" id="book-im1">
            </div>
            <footer class="card-footer">
              <a href="#" class="card-footer-item" id="googleid-1">Voir le livre</a>
            </footer>
      </div>


      <div class="card books-row__card" id="book2">
        <div class="card-image">
          <img class="books-row__image" src="<?php echo get_stylesheet_directory_uri(); ?>/public/images/imagevide.png" id="book-im2">
        </div>
          <footer class="card-footer">
            <a href="#" class="card-footer-item" id="googleid-2">Voir le livre</a>
          </footer>
        
      </div>

      <div class="card books-row__card" id="book3">
        <div class="card-image">
          <img class="books-row__image" src="<?php echo get_stylesheet_directory_uri(); ?>/public/images/imagevide.png" id="book-im3">
        </div>
          <footer class="card-footer">
            <a href="#" class="card-footer-item" id="googleid-3">Voir le livre</a>
          </footer>
      </div>

      <div class="card books-row__card" id="book4">
        <div class="card-image">
          <img class="books-row__image" src="<?php echo get_stylesheet_directory_uri(); ?>/public/images/imagevide.png" id="book-im4">
        </div>
          <footer class="card-footer">
            <a href="#" class="card-footer-item" id="googleid-4">Voir le livre</a>
          </footer>
      </div>
    </div>
</template>

<div class="menu">
    <a href="" class="ui-button close-menu">
      <i class="fa fa-close" aria-hidden="true"></i>
    </a>
    <nav class="main-nav">
       <ul>
        <li class="main-nav__item">
          <a href="#" class="menu_burger_navbar_button_connection">Se connecter</a>
        </li>

        <!-- <li class="main-nav__item">
          <a href="#">Home</a>
        </li>
        <li class="main-nav__item">
          <a href="#">Contact</a>
        </li>
        <li class="main-nav__item">
          <a href="#">FAQ</a>
        </li>
        <li class="main-nav__item">
          <a href="#">Règles de publication</a>
        </li> -->

        <!-- dynamisation of the burger menu problem with difference theme -->

        <?php
                //     $menu = wp_nav_menu([
                //         'theme_location' => 'burger-menu',
                //         'container_class' => 'main-nav',
                //         'echo' => false
                //         ]);
                //     // $menu = strip_tags($menu, '<a><div>');
                //     $menu = str_replace(['menu-item', 'class="menu"'], ['main-nav__item', ''], $menu);
                //     echo $menu;
                // ?>

<?php
                    $menu = wp_nav_menu([
                        'theme_location' => 'main-menu',
                        'container_class' => 'main-nav',
                        'echo' => false
                        ]);
                    // $menu = strip_tags($menu, '<a><div>');
                    $menu = str_replace(['menu-item', 'class="menu"'], ['main-nav__item', ''], $menu);
                    echo $menu;
                ?>

      </ul> 
      
    </nav>
  </div>

  <div class="modal editComment">
    <div class="modal-background"></div>
    <div class="modal-card">
        <header class="modal-card-head">
            <span class="modal-card-title">Descriptif du livre</span>
            <span class="icon" id="close-comment-button">
              <i class="fa fa-close"></i>
            </span>
        </header>

        <section class="modal-card-body">
          <div class="card-content">
            <div class="media">
              <div class="media-left">
                <figure class="image is-48x48">
                  <img src="https://bulma.io/images/placeholders/96x96.png" alt="Placeholder image" id="book-image">
                </figure>
              </div>
              <div class="media-content">
                <p class="title is-4" id="book-title">John Smith</p>
                <p class="subtitle is-6"  id="book-author">@johnsmith</p>
                <br/>
              </div>
            </div>
        
            <div class="content" id="book-description">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              Phasellus nec iaculis mauris. <a>@bulmaio</a>.
            </div>
          </div>
        </section>

        <section class="modal-card-body">
            <form class="form">
                <input type="hidden" name="id">
                <div class="field">
                    <label for="edit-title" class="label">Commentaire</label>
                    <p class="control">
                        <input id="edit-comment" class="input" type="text" name="comment">
                        <input type="hidden" id="googleidbook" name="nameofid" value="hello"/>
                    </p>
                </div>
            </form>
        </section>
        <footer class="modal-card-foot">
            <button type="button" class="button is-success submitAddCommentForm"><span class="icon"><i class="fa fa-edit"></i></span><span>Ajouter</span></button>
            <button type="button" class="button closeModal"><span class="icon"><i class="fa fa-close"></i></span><span>Annuler</span></button>
        </footer>
    </div>
  </div>




</html>