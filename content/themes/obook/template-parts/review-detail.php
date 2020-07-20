<div class="review_detail">
        <img src="<?php the_post_thumbnail_url(); ?>" alt="Avatar" class="review_detail_img">
        <div class="container_review_detail">
            <h4 class="review_detail_title"><?php the_title(); ?></h4> 
            <p class="review_detail_content"><?php the_content(); ?></p> 
            <h3 class="review_detail_author"><?php the_author(); ?> - <?php the_date(); ?></h3>
            
    </div>