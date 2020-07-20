<?php get_header(); ?>

    <aside class="aside">
        <div class="comment">
            <div class="comment_item">
                <p class="comment_item_description">Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum </p>
                <span class="comment_item_author">Author name</span>
                <span class="comment_item_date">15/04/2020</span>
            </div>
            <div class="comment_item-illusfusee">
                <img src="<?php echo get_stylesheet_directory_uri(); ?>/public/images/livre-fusee.png"/>
            </div>
        </div>
    </aside>

    

    

    <div class="wrapper">
        <div class="wrapper_high">
            <!-- left part search-->
            <div class="wrapper_high_search"></div>
            <!-- right part illustration -->
            <div class="wrapper_high_illustration"></div>
        </div>
        <!-- slider or carousel for news books covers-->
        <div class="wrapper_bottom">

        </div>
        
        <div class="search-form">
    
          <form method="post" id="search__form">
            <div class="field">
              <label class="label">Type de recherche</label>
              <div class="control">
                <div class="select">
                  <select class="select" name="searchType" id="searchType">
                    <option value="1">Recherche simple</option>
                    <option value="2">Recherche avancée</option>
                  </select>
                </div>
              </div>
            </div>
            
            <div class="field">
              <label class="label">Mots clés</label>
              <div class="control">
                      <input type="text" class="input" name="searchKeys" placeholder="Mots clés">
              </div>
            </div>
            
            
            <div class="" id="searchBox2">
              <div class="field">
              <label class="label">Titre</label>
                <div class="control">
                        <input type="text" class="input" name="searchTitle" placeholder="Titre">
                </div>
              </div>

              <div class="field">
                <label class="label">Auteur</label>
                <div class="control">
                        <input type="text" class="input" name="searchAuthor" placeholder="Auteur">
                </div>
              </div>

              <div class="field">
                <label class="label">Editeur</label>
                <div class="control">
                        <input type="text" class="input" name="searchEditor" placeholder="Editeur">
                </div>
              </div>

              <div class="field">
                <div class="control">
                  <div class="select">
                    <select name="searchCat" placeholder="Genre">
                    <option value= "0">Genre</option>                    
                    <option value= "1">Education</option> 
                    <option value= "2">Histoire</option>
                    <option value= "3">Littérature</option>                     
                    <option value= "4">Biographie</option>
                    <option value= "5">Fiction</option> 
                    <option value= "6">BD</option>                    
                    <option value= "7">Humour</option>
                    <option value= "8">Design</option> 
                    <option value= "9">Art</option> 
                    <option value="10">Photographie</option>                                        
                    <option value="11">Architecture</option>
                    <option value="12">Musique</option>
                    <option value="13">Science</option>
                    <option value="14">Santé</option>
                    <option value="15">Sport</option>                    
                    <option value="16">Cuisine</option>
                    <option value="17">Economie</option>
                    <option value="18">Technologie</option>
                    <option value="19">Journalisme</option>                     
                    <option value="20">Droit</option> 
                    <option value="21">Religion</option>
                    <option value="22">Psychologie</option>
                    <option value="23">Tourisme</option>
                    <option value="24">Nature</option> 
                    </select>
                  </div>
                </div>
              </div>


            </div>
            
            <div class="field">
              <div class="control">
                  <button class="button is-primary">Rechercher</button>
              </div>     
            </div>    
        
          </form>

        </div>
    </div>


    <div class="card" id="bookList"></div> 

    <div class="card" id="bookDetail"></div> 




        

    <div class="card card_title" id="bookNewsTitle">
      <p class="card__title">Actu des livres</p>           
    </div>



    <div class="card" id="bookNews">
    
        <div class="books-row books-row_color">



            
            <div class="card books-row__card" id="newbook1">
                <div class="card-image">
                  <img class="books-row__image" src="<?php echo get_stylesheet_directory_uri(); ?>/public/images/imagevide.png" id="newbook-im1">
                </div>
                <footer class="card-footer">
                  <a href="#" id="lien1" class="card-footer-item">Voir le livre</a>
                </footer>
            </div>
      
      
            <div class="card books-row__card" id="newbook2">
                <div class="card-image">
                  <img class="books-row__image" src="<?php echo get_stylesheet_directory_uri(); ?>/public/images/imagevide.png" id="newbook-im2">
                </div>
                <footer class="card-footer">
                  <a href="#" id="lien2" class="card-footer-item">Voir le livre</a>
                </footer>
              
            </div>
      
            <div class="card books-row__card" id="newbook3">
                <div class="card-image">
                  <img class="books-row__image" src="<?php echo get_stylesheet_directory_uri(); ?>/public/images/imagevide.png" id="newbook-im3">
                </div>
                <footer class="card-footer">
                  <a href="#" id="lien3" class="card-footer-item">Voir le livre</a>
                </footer>
            </div>
      
            <div class="card books-row__card" id="newbook4">
                <div class="card-image">
                  <img class="books-row__image" src="<?php echo get_stylesheet_directory_uri(); ?>/public/images/imagevide.png" id="newbook-im4">
                </div>
                <footer class="card-footer">
                  <a href="#" id="lien4" class="card-footer-item">Voir le livre</a>
                </footer>
            </div>

          </div> 



    </div>  

    <?php get_footer(); ?>
            





            
            
    