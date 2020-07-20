
        <div class="review">
                    <img src="<?php echo get_stylesheet_directory_uri(); ?>/public/images/book.jpg" alt="Avatar" class="review_img">
                    <div class="container">
                        <h4 class="review_title"><?php the_title(); ?></h4> 
                        <p class="review_content"><?php the_excerpt(); ?></p> 
                        <a href="<?php the_permalink(); ?>" class="review_a"> Lire la suite</a>
                    </div>
                    
        </div>
        
