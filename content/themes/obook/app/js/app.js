var app = 
{

    baseUri:  'https://www.googleapis.com/books/v1/volumes',



    cle:      'AIzaSyCx2844OD5KofhIBH6V0HPjqpQSdXOCBvc',

    iComment:0, // number of the comment displayed

    q:        '',


    genre:   
    [
        "Aucun", "Education", "History", "Literature", "Biography & Autobiography", "Fiction", "Comics & Graphic Novels", 
        "Humor", "Design", "Art", "Photography", "Architecture", "Music", "Science", "Health & Fitness", 
        "Sports & Recreation", "Cooking", "Business & Economics", "Technology & Engineering", 
        "Journalism", "Law", "Religion", "Psychology", "Tourism", "Nature" 
    ],



    baseUriWordPress: 'http://localhost/P03/projet-obook/obook/',

    jwtUrlWordPress: 'wp-json/jwt-auth/v1/',
    jsonUrlWordPress: 'wp-json/wp/v2/',

    // Login status
    loginStatus: false,

    // coordonnées d'un livre dans la grille des
    // résultats de la recherche
    bookNumber:1,
    bookLine:0,

    // ligne (résultats de la recherche) contenant 4 livres
    divLine:'',

    // indique qu'au moins un livre a été trouvé 
    resultat:   false,


    // numéro d'un livre dans les
    // tableaux des caractéristiques d'un livre
    book:1,

    // tableaux des caractéristiques d'un livre
    bookTitle:[],
    bookDescription:[],
    bookAuthors:[],
    bookCategories:[],
    bookPublisher:[],    
 
    bookImage:[],  



    // numéro d'un livre dans les
    // tableaux des caractéristiques d'un livre ACTU
    NewestBook:1,
    NewestBookIndice:1,
    NewestBookMax:1,


    // tableaux des caractéristiques d'un livre ACTU
    book2Id:[],
    book2Title:[],
    book2Description:[],
    book2Authors:[],
    book2Categories:[],
    book2Publisher:[],    
 
    book2Image:[], 

    // indique si le détail d'un livre
    // affiche un livre de la liste des livres trouvés (app.list=true)
    // ou... les détails d'un livre 
    // de la liste des livres ACTU (app.list=false)
    list:true,



    init: function() 
    {


        // masquer les div de l'actu des livres
        const bookNewsTitle   = document.querySelector('#bookNewsTitle');
        bookNewsTitle.classList.add("isnone");
        const bookNews   = document.querySelector('#bookNews');
        bookNews.classList.add("isnone"); 


        // lance la ou les requêtes pour afficher
        // l'ACTU des livres
        app.newestBooksQueries();        

        // DIV pour afficher les détails d'un livre
        const bookDetail     = document.querySelector('#bookDetail');
        bookDetail.addEventListener('click', app.handleChangeDetailTo);

        // masquage de cette DIV
        bookDetail.classList.add("isnone");               

        // DIV pour afficher le form de recherche avancée
        const searchBox2     = document.getElementById('searchBox2');
        searchBox2.classList.add("isnone");    

        // SELECT qui renvoie le type de recherche
        const selectSearch   = document.getElementById('searchType');
        selectSearch.addEventListener('change', app.handleChangeSelectSearch);

        // FORM de la recherche
        const searchForm = document.getElementById('search__form');
        searchForm.addEventListener('submit', app.handleSearchFormSubmit);

        // Show comments in Home
    
        app.showComments2(); // display immediately the first comment
        setInterval(app.showComments2, 10000); // set display in loop every 10 seconds

        // On écoute l'événement click sur les éléments "ui-button"
        $('.ui-button').on('click', app.handleToggleMenu);

        // On écoute le submit du formulaire pour s'authentifier
        const formLoginSubmit = document.getElementById('login-form');
        formLoginSubmit.addEventListener('submit', app.sendLoginForm);

    },

    handleToggleMenu: function(event) {
        // on annule le comportement par défaut (on annule l'action du click sur le lien)
        event.preventDefault();
    
        console.log("tu as cliqué sur un ui-bouton !");
    
        // on "toogle" notre classe "menu-visible" sur le body
        // https://api.jquery.com/toggleclass/

        $('.menu').toggleClass('is-active');
    },

    // Affiche le FORM de recherche simple ou avancée
    handleChangeSelectSearch: function() 
    {
        //suivant le type de la recherche...
        const selectSearch = document.getElementById('searchType');
        
        const searchBox2   = document.getElementById('searchBox2');

        // recherche avancée
        if ( selectSearch.value == "2" )
        {
            searchBox2.classList.remove("isnone");            
        }
        else    // recherche simple
        {
            searchBox2.classList.add("isnone");            
        }


    },




    // Affiche le détail d'un livre
    handleChangeListToDetail: function(event) 
    {
        app.list = true;
        // livre sur lequel on a cliqué
        // dans les résultats de la recherche
        const aBook = event.currentTarget;
        app.book = aBook.dataset.number;

        // DIV pour afficher les résultats de la recherche
        const bookList   = document.querySelector('#bookList');

        // DIV pour afficher le détail d'un livre      
        const bookDetail = document.querySelector('#bookDetail');


        // affichage sommaire du détail d'un livre
        bookDetail.innerHTML = app.bookTitle[app.book]     + "<br>" + "<br>" + app.bookDescription[app.book] + "<br>" + "<br>" + 
                               app.bookAuthors[app.book]   + "<br>" + "<br>" + app.bookCategories[app.book]  + "<br>" + "<br>" + 
                               app.bookPublisher[app.book] + "<br>" + "<br>" + "<img src='" + app.bookImage[app.book] + "'>";


        bookList.classList.add("isnone");
        bookDetail.classList.remove("isnone");

    },



    // Affiche la liste des livres trouvés 
    handleChangeDetailToList: function() 
    {

        const bookList   = document.querySelector('#bookList');

        // DIV pour afficher le détail d'un livre (DIV masqué)
        const bookDetail = document.querySelector('#bookDetail');

        bookDetail.classList.add("isnone"); 
        bookList.classList.remove("isnone");

    },



    // Traitement des données du FORM puis requête AJax
    handleSearchFormSubmit: function(event) 
    {


        event.preventDefault();
    
        const searchForm = event.currentTarget;
   
        const searchFormData = new FormData(searchForm);
    
        const searchInfos = {};
    
        searchInfos.searchType    = searchFormData.get('searchType').trim();
        searchInfos.searchKeys    = searchFormData.get('searchKeys').trim();
        searchInfos.searchTitle   = searchFormData.get('searchTitle').trim();
        searchInfos.searchAuthor  = searchFormData.get('searchAuthor').trim();
        searchInfos.searchEditor  = searchFormData.get('searchEditor').trim();
        searchInfos.searchCat     = searchFormData.get('searchCat').trim();







        app.q = '';
        
        // cas d'une recherche simple
        if ( searchInfos.searchKeys != '' )
        {

            searchInfos.searchKeys = searchInfos.searchKeys.replace(' ', '+'); 

            app.q = encodeURI( searchInfos.searchKeys );

        }


        // cas d'une recherche avancée
        if ( searchInfos.searchType == 2 )
        {

            // recherche de mots dans le titre... et...
            if ( searchInfos.searchTitle != '' )
            {
                searchInfos.searchTitle = searchInfos.searchTitle.replace(' ', '+'); 
                if ( app.q != '' )
                {
                    app.q = app.q + '+intitle:'+ encodeURI( searchInfos.searchTitle );
                }
                else
                {
                    app.q = 'intitle:'+ encodeURI( searchInfos.searchTitle );
                }



            } 
            
            // recherche de mots dans l'auteur'... et...            
            if ( searchInfos.searchAuthor != '' )
            {
                searchInfos.searchAuthor = searchInfos.searchAuthor.replace(' ', '+'); 
                if ( app.q != '' )
                {
                    app.q = app.q + '+inauthor:'+ encodeURI( searchInfos.searchAuthor );
                }
                else
                {
                    app.q = 'inauthor:'+ encodeURI( searchInfos.searchAuthor );
                }

            } 

            // recherche de mots dans l'éditeur' et...            
            if ( searchInfos.searchEditor != '' )
            {
                searchInfos.searchEditor = searchInfos.searchEditor.replace(' ', '+'); 
                if ( app.q != '' )
                {
                    app.q = app.q + '+inpublisher:'+ encodeURI( searchInfos.searchEditor );
                }
                else
                {
                    app.q = 'inpublisher:'+ encodeURI( searchInfos.searchEditor );
                }



            } 

            // recherche de mots dans la catégorie            
            if ( searchInfos.searchCat != '' )
            {
                if ( app.q != '' )
                {
                    if ( searchInfos.searchCat != 0 )
                    {
                        app.q = app.q + '+insubject:' + app.genre[searchInfos.searchCat];
                    }
                }
                else
                {
                    if ( searchInfos.searchCat != 0 )
                    {
                        app.q = 'insubject:' + app.genre[searchInfos.searchCat];
                    }
                }
            }
            
 
            
        }            




        // si la requête n'est pas vide       
        if ( app.q != '' )
        {

            query = app.baseUri + '?q=' + app.q + '&langRestrict=fr&maxResults=20&cle=' + app.cle;


            console.log(query);

            axios.get( query )
            .then(function (response) 
            {

                app.resultat = false;

                app.bookNumber = 1;
                app.bookLine   = 0;

                // si cette requête produit des résultats
                if ( response.data.items != undefined )
                { 


                    // il faut supprimer les résultats d'une recherche antérieure
                    const bookList = document.getElementById('bookList');
                    bookList.innerHTML = '';

                    // pour chaque livre trouvé, on bouble
                    response.data.items.forEach( app.handlePrintBookList );


                    if ( app.resultat == false )
                    { 
                        console.log( "Il y avait des résultats mais ce(s) livre(s) ne comportai(en)t pas de titre" ); 
                    }
                    else
                    {
                        // dans le cas où le nb de livres trouvés n'est pas un multiple
                        // de 4, il faudra construire la dernière ligne (incomplète) de livres
                        if ( app.bookNumber != 1  )
                        {
            
                            const bookList = document.querySelector('#bookList');
                            bookList.appendChild( app.divLine );                  

                        }


                    }

                }
                else   // aucun livre trouvé
                {
                    const bookList = document.querySelector('#bookList');
                    bookList.innerHTML = "<br>Aucun livre ne correspond à votre recherche"; 
                }



                
            })
            .catch(function (error) 
            {
                console.log(error);
            });


        }
        else  
        {
            const bookList = document.querySelector('#bookList');
            bookList.innerHTML = "<br>Vous devez remplir au moins un champ"; 
        } 





    
    },
    














    // fonction qui traite chaque livre trouvé dans l'API :
    // Pour chaque livre, on stocke dans des tableaux JS : titre, auteur, 
    // editeur, image, categorie, description


    handlePrintBookList: function(item) 
    {

        if ( item.volumeInfo.title != undefined  )
        {     
            
            if ( app.bookNumber == 1  )
            {
                // on récupère le template (div) correspondant
                // à une ligne de 4 livres trouvées
                const Template = document.getElementById('books-row');

                const TemplateContent = Template.content;
            
                const TemplateContentDiv = TemplateContent.firstElementChild; 
                
                // On crée un clone de ce div qui contiendra 
                // une ligne de 4 livres
            
                app.divLine = TemplateContentDiv.cloneNode(true);

                // on attribue un numéro (dataset) pour chacun de ces 4 livres
                // qui sera uitilisé dans les tableaux JS

                // on associe à ces 4 livres, une fct qui réagi au
                // clic sur la couverture


                const book1 = app.divLine.querySelector('#book1');
                book1.dataset.number = 1 + 4*app.bookLine;
                //book1.addEventListener('click', app.handleChangeListToDetail);
                book1.addEventListener('click', app.writeresult);
                


                const book2 = app.divLine.querySelector('#book2');
                book2.dataset.number = 2 + 4*app.bookLine;
                //book2.addEventListener('click', app.handleChangeListToDetail);
                book2.addEventListener('click', app.writeresult);

                const book3 = app.divLine.querySelector('#book3');
                book3.dataset.number = 3 + 4*app.bookLine;
                //book3.addEventListener('click', app.handleChangeListToDetail);
                book3.addEventListener('click', app.writeresult);


                const book4 = app.divLine.querySelector('#book4');
                book4.dataset.number = 4 + 4*app.bookLine;
                //book4.addEventListener('click', app.handleChangeListToDetail);
                book4.addEventListener('click', app.writeresult);
                
            }
 

            // indique qu'au moins un livre a été trouvé 
            app.resultat = true;   

            

            // on stocke dans un tableau JS, le titre du livre
            app.bookTitle[ app.bookNumber + 4*app.bookLine ] = item.volumeInfo.title; 


            // s'il existe dans l'API, on stocke l'auteur
            if ( item.volumeInfo.authors != undefined )
            { 
                app.bookAuthors[ app.bookNumber + 4*app.bookLine ] = item.volumeInfo.authors[0];                 
            }
            else
            { 
                app.bookAuthors[ app.bookNumber + 4*app.bookLine ] = '';                 
            }


            // s'il existe dans l'API, on stocke la catégorie            
            if ( item.volumeInfo.categories != undefined )
            { 
                app.bookCategories[ app.bookNumber + 4*app.bookLine ] = item.volumeInfo.categories[0];                 
            }
            else
            { 
                app.bookCategories[ app.bookNumber + 4*app.bookLine ] = '';                 
            }            
 
            // s'il existe dans l'API, on stocke l'éditeur              
            if ( item.volumeInfo.publisher != undefined )
            { 
                app.bookPublisher[ app.bookNumber + 4*app.bookLine ] = item.volumeInfo.publisher;                 
            }
            else
            { 
                app.bookPublisher[ app.bookNumber + 4*app.bookLine ] = '';                 
            }           


            // s'il existe dans l'API, on stocke la description   
            if ( item.volumeInfo.description != undefined )
            {                
                app.bookDescription[ app.bookNumber + 4*app.bookLine ] = item.volumeInfo.description;  
            }
            else
            {   // si elle n'existe pas on tente de stocker le résumé de celle-ci
                if ( item.searchInfo != undefined )
                {
                    if ( item.searchInfo.textSnippet != undefined )
                    {
                        app.bookDescription[ app.bookNumber + 4*app.bookLine ] = item.searchInfo.textSnippet;  
                    }
                    else
                    { 
                        app.bookDescription[ app.bookNumber + 4*app.bookLine ] = '';                 
                    }                     
                    

                }
                else
                { 
                    app.bookDescription[ app.bookNumber + 4*app.bookLine ] = '';                 
                }         

            } 

            if (item.id){
                app.SourceGoogleidBook(item.id);
            }




            // s'il existe dans l'API, on stocke l'image de la couverture     
            if ( item.volumeInfo.imageLinks != undefined )
            { 
                // en grand format si elle existe...
                if ( item.volumeInfo.imageLinks.thumbnail != undefined )
                {                
                    app.SourceImageBook( item.volumeInfo.imageLinks.thumbnail );
                    app.bookImage[ app.bookNumber + 4*app.bookLine ] = item.volumeInfo.imageLinks.thumbnail;  
                }
                else  // ou en petit format si elle existe...
                {
                    if ( item.volumeInfo.imageLinks.smallThumbnail != undefined )
                    { 
                        app.SourceImageBook( item.volumeInfo.imageLinks.smallThumbnail );
                        app.bookImage[ app.bookNumber + 4*app.bookLine ] = item.volumeInfo.imageLinks.smallThumbnail;  
                    }
                    else
                    { 
                        app.bookImage[ app.bookNumber + 4*app.bookLine ] = '';                 
                    }                     

                } 

            }
            else  // sinon, on propose la couverture par defaut
            {
                app.SourceImageBook( "images/imagepardefaut.png" );
                app.bookImage[ app.bookNumber + 4*app.bookLine ] = "images/imagepardefaut.png";  
            }  
            
            
            // si nous disposons de 4 livres trouvés, on peut créer une
            // ligne entière de 4 livres
            if ( app.bookNumber == 4  )
            {

                const bookList = document.querySelector('#bookList');

                bookList.appendChild( app.divLine );                

                // on passera au livre suivant
                app.bookNumber = 1;
                // à la ligne suivante
                app.bookLine   = app.bookLine + 1;                
            }
            else
            { 
                // on passera au livre suivant           
                app.bookNumber = app.bookNumber + 1;

            }  
            
            
        }



    },

    SourceGoogleidBook: function(googleid){
        const googleid1 = app.divLine.querySelector('#googleid-1');
        const googleid2 = app.divLine.querySelector('#googleid-2');
        const googleid3 = app.divLine.querySelector('#googleid-3');
        const googleid4 = app.divLine.querySelector('#googleid-4');

        //console.log(googleid);

        if ( app.bookNumber == 1  )
        {             
            googleid1.id = googleid;            
        }
 
        if ( app.bookNumber == 2  )
        {             
            googleid2.id = googleid;            
        }

        if ( app.bookNumber == 3  )
        {             
            googleid3.id = googleid;            
        }
 
        if ( app.bookNumber == 4  )
        {             
            googleid4.id = googleid;            
        }
    },


    // attribuer une image de couverture à un livre
    // faisant partie des résultats de la recherche
    SourceImageBook: function(lien) 
    {

        const Image1 = app.divLine.querySelector('#book-im1');
        const Image2 = app.divLine.querySelector('#book-im2');
        const Image3 = app.divLine.querySelector('#book-im3');
        const Image4 = app.divLine.querySelector('#book-im4');        
 
        if ( app.bookNumber == 1  )
        {             
            Image1.src = lien;            
        }
 
        if ( app.bookNumber == 2  )
        {             
            Image2.src = lien;            
        }

        if ( app.bookNumber == 3  )
        {             
            Image3.src = lien;            
        }
 
        if ( app.bookNumber == 4  )
        {             
            Image4.src = lien;            
        }


    },


    







    // ACTU : Recherche des 12 livres les plus récents
    newestBooksQueries: function() 
    {
        // numéro du livre trouvé : indice des tableaux JS
        app.NewestBook = 1;

        app.NewestBookIndice = 1;
        app.NewestBookMax = 1;


        // Choisir une catégorie au hasard 
        mygenre = 1 + Math.floor( Math.random() * Math.floor(24) );

        app.q = 'insubject:' + app.genre[mygenre];



        query = app.baseUri + '?q=' + app.q + '&langRestrict=fr&maxResults=40&orderBy=newest&cle=' + app.cle;

        console.log(query);



        axios.get( query )
        .then(function (response) 
            {


                // si cette requête produit des résultats
                if ( response.data.items != undefined )
                { 
                    // pour chaque livre trouvé, on boucle
                    response.data.items.forEach( app.newestBookTest );

                    
                    // on vérifie si la requête a trouvé au moins 4 livres ACTU
                    if ( app.NewestBook >=4 )
                    {
                        app.NewestBookMax = 1;

                        if ( app.NewestBook >=8 )
                        {
                            app.NewestBookMax = 5;
                        }

                        if ( app.NewestBook >=12 )
                        {
                            app.NewestBookMax = 9;
                        }

                        console.log('AVANT AFFICHAGE');
                        console.log(app.NewestBook);
                        console.log(app.NewestBookMax);
                        console.log('AVANT AFFICHAGE'); 



                        app.displayNewestBooksLine(1); 
                        
                        
                        // afficher les div de l'actu des livres
                        const bookNewsTitle   = document.querySelector('#bookNewsTitle');
                        bookNewsTitle.classList.remove("isnone");
                        const bookNews   = document.querySelector('#bookNews');
                        bookNews.classList.remove("isnone"); 

    
                        setInterval( app.displayNewestBooksLine, 10000, app.NewestBookIndice );

                    }
                    


                }
              
            })
            .catch(function (error) 
            {
                console.log(error);
            });
    
          
    
    },




    newestBookTest: function(item) 
    {
        if ( app.NewestBook <=12 )
        {
            app.book2Id[ app.NewestBook ]          = '';  
            app.book2Title[ app.NewestBook ]       = '';  
            app.book2Image[ app.NewestBook ]       = '';
            app.book2Description[ app.NewestBook ] = '';        
            app.book2Authors[ app.NewestBook ]     = ''; 
            app.book2Categories[ app.NewestBook ]  = '';
            app.book2Publisher[ app.NewestBook ]   = ''; 
    
            // Si ce livre a un titre
            if ( item.volumeInfo.title != undefined  )
            {     

                // on stocke dans un tableau JS, le titre du livre
                app.book2Title[ app.NewestBook ] = item.volumeInfo.title;

                // si ce livre a une couverture       
                if ( item.volumeInfo.imageLinks != undefined )
                { 
                    // en grand format si elle existe...
                    if ( item.volumeInfo.imageLinks.thumbnail != undefined )
                    {                
                        app.book2Image[ app.NewestBook ] = item.volumeInfo.imageLinks.thumbnail;
                    }
                    else  // ou en petit format si elle existe...
                    {
                        if ( item.volumeInfo.imageLinks.smallThumbnail != undefined )
                        { 
                            app.book2Image[ app.NewestBook ] = item.volumeInfo.imageLinks.smallThumbnail; 
                        }
    
                    } 


                    // si ce livre a une description
                    if ( item.volumeInfo.description != undefined )
                    { 
                         app.book2Description[ app.NewestBook ] = item.volumeInfo.description; 
                    }
                    else
                    {   // si elle n'existe pas... on vérifie si le résumé existe
                        if ( item.searchInfo != undefined )
                        {
                            if ( item.searchInfo.textSnippet != undefined )
                            {
                                app.book2Description[ app.NewestBook ] = item.searchInfo.textSnippet;
                            }

                        }

                    } 

                    // s'il existe dans l'API, on stocke l'auteur
                    if ( item.volumeInfo.authors != undefined )
                    { 
                        app.book2Authors[ app.NewestBook ] = item.volumeInfo.authors[0]; 
                    }

                    // si elle existe dans l'API, on stocke la catégorie            
                    if ( item.volumeInfo.categories != undefined )
                    { 
                        app.book2Categories[ app.NewestBook ] = item.volumeInfo.categories[0]; 
                    }

                    // s'il existe dans l'API, on stocke l'éditeur              
                    if ( item.volumeInfo.publisher != undefined )
                    { 
                        app.book2Publisher[ app.NewestBook ] = item.volumeInfo.publisher;
                    }

                    // si ce livre dispose d'un titre, d'une couverture et d'une description 
                    // on le conserve en mémoire et on passe au suivant... 
                    if ( app.book2Description[ app.NewestBook ] != ''   ||   app.book2Image[ app.NewestBook ] != '' )
                    { 
                        app.book2Id[ app.NewestBook ] = item.id;
                        console.log(app.book2Id[ app.NewestBook ]);
                        console.log(app.book2Id[ app.NewestBook ]); 
                        console.log(app.book2Image[ app.NewestBook ]);                                                     
                        app.NewestBook = app.NewestBook + 1;
                    }

                }
                
            }

        }

    },





    
   





    displayNewestBooksLine: function(numero) 
    {

        if ( app.NewestBookIndice == app.NewestBookMax )
        {
            app.NewestBookIndice = 1;
            numero = app.NewestBookIndice;    
        }
        else
        {
            app.NewestBookIndice = app.NewestBookIndice + 4;
            numero = app.NewestBookIndice;     
        }
        console.log('AFFICHAGE');
        console.log(app.NewestBookIndice);
        console.log(app.NewestBookMax);        
        console.log('AFFICHAGE');


        const book1  = document.getElementById('newbook1');
        book1.dataset.number = numero;
        const Image1 = document.getElementById('newbook-im1');
        Image1.src   = app.book2Image[numero];
        Image1.addEventListener('click', app.handleChangeNewsToDetailA);
        const lien1 = book1.querySelector('.card-footer-item');
        lien1.id = app.book2Id[numero];
        lien1.addEventListener('click', app.handleChangeNewsToDetailA);        

        const book2  = document.getElementById('newbook2');
        book2.dataset.number = numero+1;
        const Image2 = document.getElementById('newbook-im2');
        Image2.src   = app.book2Image[numero+1];
        Image2.addEventListener('click', app.handleChangeNewsToDetailA);
        const lien2 = book2.querySelector('.card-footer-item');
        lien2.id = app.book2Id[numero+1];
        lien2.addEventListener('click', app.handleChangeNewsToDetailA);         


        const book3  = document.getElementById('newbook3');
        book3.dataset.number = numero+2;
        const Image3 = document.getElementById('newbook-im3');
        Image3.src   = app.book2Image[numero+2];
        Image3.addEventListener('click', app.handleChangeNewsToDetailA);
        const lien3 = book3.querySelector('.card-footer-item');
        lien3.id = app.book2Id[numero+2];
        lien3.addEventListener('click', app.handleChangeNewsToDetailA);

        const book4  = document.getElementById('newbook4');
        book4.dataset.number = numero+3;
        const Image4 = document.getElementById('newbook-im4');
        Image4.src   = app.book2Image[numero+3];
        Image4.addEventListener('click', app.handleChangeNewsToDetailA);
        const lien4 = book4.querySelector('.card-footer-item');
        lien4.id = app.book2Id[numero+3];
        lien4.addEventListener('click', app.handleChangeNewsToDetailA);       



    },




    // Affiche le détail d'un livre
    handleChangeNewsToDetail: function(event) 
    {
        app.list = false;        
        // livre sur lequel on a cliqué
        // dans les résultats de la recherche
        const bookObject = event.currentTarget;
        const bookDiv = bookObject.closest('.card');
        app.book = bookDiv.dataset.number;

        // DIV pour afficher les livres ACTU
        const bookNews   = document.querySelector('#bookNews');

        // DIV pour afficher le détail d'un livre      
        const bookDetail = document.querySelector('#bookDetail');


        // affichage sommaire du détail d'un livre
        bookDetail.innerHTML = app.book2Title[app.book]     + "<br>" + "<br>" + app.book2Description[app.book] + "<br>" + "<br>" + 
                               app.book2Authors[app.book]   + "<br>" + "<br>" + app.book2Categories[app.book]  + "<br>" + "<br>" + 
                               app.book2Publisher[app.book] + "<br>" + "<br>" + "<img src='" + app.book2Image[app.book] + "'>";


        bookNews.classList.add("isnone");
        bookDetail.classList.remove("isnone");

    },






    // Quitte le détail d'un livre
    handleChangeDetailTo: function() 
    {

        if (app.list == true)
        {

            const bookList   = document.querySelector('#bookList');

            // DIV pour afficher le détail d'un livre (DIV masqué)
            const bookDetail = document.querySelector('#bookDetail');

            bookDetail.classList.add("isnone"); 
            bookList.classList.remove("isnone");

        }
        else
        {

            const bookNews   = document.querySelector('#bookNews');

            // DIV pour afficher le détail d'un livre (DIV masqué)
            const bookDetail = document.querySelector('#bookDetail');

            bookDetail.classList.add("isnone"); 
            bookNews.classList.remove("isnone");

        }
           

    },








    // --------------------------------
    // Show comments in Home page
    // PP functionnality 23/04/2020
    // --------------------------------
    // Slider/carousel for 4 comments
    
    showComments2: function()
    {
        let commentsObject = 
        [
            {
                comment: "Bon petit polar digne de l'une des auteurs prolifiques du genre, c'est un livre qui se lit bien. Dans la lignée 'cohorte scolaire qui se retrouve'...",
                author: "Marcel",
                date: "04/04/2020"
            },
            {
                comment: "Ce livre vous transporte directement dans la campagne anglaise du Moyen-Âge. Ce premier volume de la saga reste mon préféré...",
                author: "Utilisateur1",
                date: "06/04/2020"
            },
            {
                comment: "Pour celui qui veut changer de galaxie, c'est ce livre qu'il faut lire",
                author: "Damien",
                date: "09/04/2020"
            },
            {
                comment: "Remarquable et épooooooustouflant",
                author: "Bernard",
                date: "10/04/2020"
            }                        
        ];
        // Arrays of descriptions - authors and dates
        let arrayOfDescriptions = [];
        let arrayOfAuthors = [];
        let arrayOfDates = [];
        commentNumber = 0;
        // forEach on datas, push on arrays of descriptions - authors - dates
        commentsObject.forEach((comment, index) => 
        {
            arrayOfDescriptions.push(comment.comment.substr(0, 280)+'...');
            arrayOfAuthors.push(comment.author);
            arrayOfDates.push(comment.date); 
            commentNumber = commentNumber + 1;
        });

        //const commentDiv = document.querySelector('comment_item');
        let description = document.querySelector('.comment_item_description');

        let author      = document.querySelector('.comment_item_author');
        let date        = document.querySelector('.comment_item_date');
        if (app.iComment == commentNumber-1)
        {
            app.iComment = 0  
        }
        else
        {
            app.iComment = app.iComment + 1;           
        }
        description.textContent = arrayOfDescriptions[app.iComment];
        author.textContent      = arrayOfAuthors[app.iComment];
        date.textContent        = arrayOfDates[app.iComment];
    },

    // --------------------------------
    // Show comments in Home page
    // AG functionnality 16/04/2020
    // --------------------------------
    // Fake object for the moment, after we will use the api





    showComments: function(){
        let commentsObject = [
            {
                comment: "Bon petit polar digne de l'une des auteurs prolifiques du genre, c'est un livre qui se lit bien. Dans la lignée 'cohorte scolaire qui se retrouve', on a clairement l'un des camarades qui a la rancune tenace et des pulsions meurtrières. Reste à savoir qui et pourquoi. Sans dire qu'il nous garde en haleine, il titille la curiosité jusqu'au bout. La Nuit est mon royaume écrit par Mary Higgins Clark",
                author: "Utilisateur5",
                date: "04/04/2020"
            }
        ];

        // Select in html the comments
        const commentsDivs = document.getElementsByClassName('comment_item');
        const item1 = commentsDivs[0];

        // Select the className of the description
        let description0 = item1.getElementsByClassName('comment_item_description')[0];

        // Select the className of author
        let author0 = item1.getElementsByClassName('comment_item_author')[0];

        // Select the className of the date
        let date0 = item1.getElementsByClassName('comment_item_date')[0];

        // Arrays of descriptions - authors and dates
        let arrayOfDescriptions = [];
        let arrayOfAuthors = [];
        let arrayOfDates = [];

        // forEach on datas, push on arrays of descriptions - authors - dates
        commentsObject.forEach((comment, index) => {
            arrayOfDescriptions.push(comment.comment.substr(0, 280)+'...');
            arrayOfAuthors.push(comment.author);
            arrayOfDates.push(comment.date); 
        });

        // Write descriptions - authors and dates to html
        const actualizeHtml = (() => {
            description0.textContent = arrayOfDescriptions[0];
            author0.textContent = arrayOfAuthors[0];
            date0.textContent = arrayOfDates[0];
        });
        
        actualizeHtml();

    },

    // --------------------------------------------------------------------------------------
    // DD 23/04/2020 - Implementing the functionality of the slider/carousel comments
    // --------------------------------------------------------------------------------------
    //slideShowComments: function() {

        // select all comments to slide
     //   slidingComments = document.querySelectorAll(".comment_item");

        // select the element containing the value to slide
     //   var tempo = document.querySelector(".comment_item").getAttribute('value')
        // console.log(tempo);
        // Put value on the variable tempo
     //   var nextCommentDelay =tempo;
     //   var currentCommentCounter = 0;
 
       // slidingComments[currentCommentCounter].style.opacity = 1
        // setInterval (delay): allows us to run a function repeatedly, starting after the interval of time, 
        // then repeating continuously at that interval.
      //  var refreshComments = setInterval(showComments, nextCommentDelay);
      //  function showComments() 

    // -----------------------------------------------------------
    // AG 20/04/2020 - AFFICHER LA CARD DU DESCRIPTIF DU LIVRE 
    // Add Token and add a comment in WORDPRESS POST
    // -----------------------------------------------------------
    writeresult: function(event){
        event.preventDefault();

        // Récupération des données provenant du JS de Pierre
        const aBook = event.currentTarget;

        // Récupération du dataset pour identifier un livre
        app.book = aBook.dataset.number;

        // Récupération du livre en cours et de toutes les informations
        const bookTitle = app.bookTitle[app.book];
        const bookDescription = app.bookDescription[app.book];
        const bookAuthors = app.bookAuthors[app.book];
        const bookCategories = app.bookCategories[app.book];
        const bookPublisher = app.bookPublisher[app.book];
        const bookImage = app.bookImage[app.book];

        // Ciblage à l'aide du dataset sur la bon item de manière à récupérer l'id
        const classOfgoogleBookId = (event.currentTarget).getElementsByClassName('card-footer-item');
        const googleBookId = classOfgoogleBookId[0].id;

        // Définir toutes les propriétés du livre sélectionné afin de les ajouter dans le localstorage
        window.localStorage.setItem('bookTitle', bookTitle); 
        window.localStorage.setItem('bookDescription', bookDescription); 
        window.localStorage.setItem('bookAuthors', bookAuthors); 
        window.localStorage.setItem('bookCategories', bookCategories); 
        window.localStorage.setItem('bookPublisher', bookPublisher); 
        window.localStorage.setItem('googleBookId', googleBookId); 

        // Ajout des champs du livre dans la card
        const bookImageCard = document.getElementById('book-image');
        const bookTitleCard = document.getElementById('book-title');
        const bookAuthorCard = document.getElementById('book-author');
        const bookDescriptionCard = document.getElementById('book-description');
        bookImageCard.src = bookImage;
        bookTitleCard.textContent = bookTitle;
        bookAuthorCard.textContent = bookAuthors;
        bookDescriptionCard.textContent = bookDescription;

        // Cibler le champ input
        const editComment = document.getElementById('edit-comment');
        editComment.value = window.localStorage.getItem('commentLastBook');

        // Cibler le bouton pour ouvrir la card de description + commentaire
        const commentModal = document.querySelector('.editComment');
        commentModal.classList.add('is-active');

        // Cibler le bouton de fermeture de la card
        const closeModal = document.querySelector('.closeModal');
        closeModal.addEventListener('click', app.closeModal);
        // Cibler la croix pour fermer la card
        const closeModalWithButton = document.getElementById('close-comment-button');
        closeModalWithButton.addEventListener('click', app.closeModal);

        // Cibler le bouton pour l'enregistrement du commentaire
        const saveComment = document.querySelector('.submitAddCommentForm');
        saveComment.addEventListener('click', app.saveTheComment);

        // Vérifier si j'ai un token
        const tokenInLocalstorage = window.localStorage.getItem('oBookToken');

        if (tokenInLocalstorage === undefined) {
            const loginText = saveComment.getElementsByTagName('span')[1];
            loginText.textContent = 'Se connnecter';
        }

    },

    closeModal: function(event){
        const commentModal = document.querySelector('.editComment');
        commentModal.classList.remove('is-active');
    },

    saveTheComment: function(event){
        console.log('click');
        
        const editComment = document.getElementById('edit-comment').value;
        const googleIdBook = document.getElementById('googleidbook').value;

        // On ajoute la dernier commentaire dans le localstorage
        window.localStorage.setItem('commentLastBook', editComment); 
        
        app.writeCommentToApi();
    },

    writeCommentToApi: function() {
        // Fonction pour écrire le commntaire dans l'api
        // Récupération du token dans le LS
        const tokenInLocalstorage = window.localStorage.getItem('oBookToken');

        // Dernier livre stocké dans le localstorage
        const bookTitle = window.localStorage.getItem('bookTitle'); 
        const bookDescription = window.localStorage.getItem('bookDescription'); 
        const bookAuthors = window.localStorage.getItem('bookAuthors'); 
        const bookCategories = window.localStorage.getItem('bookCategories'); 
        const bookPublisher = window.localStorage.getItem('bookPublisher'); 
        const googleBookId = window.localStorage.getItem('googleBookId'); 
        const commentLastBook = window.localStorage.getItem('commentLastBook');

        // On rajoute dans le commentaire à la fin, le nom de l'auteur et le titre du livre
        const commentAuthorTitleofBook = commentLastBook + '<br/> Auteur(s) : ' + bookAuthors + '<br/> Titre du livre : ' + bookTitle;

        // Ajout du commentaire
        // On effectue la requete Axios avec le token
        axios({
            method: 'post',
            url: app.baseUriWordPress + app.jsonUrlWordPress + 'posts',
            headers:  {Authorization: 'Bearer ' + tokenInLocalstorage},
            params:{
                title: googleBookId,
                status: 'publish',
                content: commentAuthorTitleofBook
              }
        })
        .then(function (response){
            // Ma requête est un succès
            console.log(response.data);
            app.closeModal();
            // Remove the comment in localstorage when the comment is submitted
            window.localStorage.setItem('commentLastBook', '');
        })
        .catch(function (error) {
          // Ma requête renvoie une erreur
            app.closeModal();
            let modal = document.querySelector(".modal_forms");
            modal.style.display = "block";
        });

    },

    sendLoginForm: function(event){
        event.preventDefault();
        console.log('send form');

        const loginInfos = {};
        loginInfos.username = document.getElementById('login-user-name').value;
        loginInfos.password = document.getElementById('login-user-password').value;

        console.log(loginInfos);

        axios.post(
            app.baseUriWordPress + app.jwtUrlWordPress + 'token',
            loginInfos
        )
        .then(app.getResponseToken)
        .then(app.storeToken)
        .then(app.closeAuthModal)
        .catch(function (error){
            document.getElementById('errorname').innerHTML='<i class="fa fa-exclamation-triangle" aria-hidden="true"></i>Veuillez indiquer des identifiants valides'; 
        })
    },

    getResponseToken: function(response) {
        //console.log(response.data.token);
        return response.data.token;
      },
    
    storeToken: function(token) {
    localStorage.setItem('oBookToken', token);
    },

    closeAuthModal: function(){
        // Reset du message d'erreur sur le formulaire de login
        document.getElementById('errorname').innerHTML="";

        // The span element (little cross) to close the modal
        let modal = document.querySelector(".modal_forms");
        modal.style.display = "none";

        let connectButton = document.querySelector('.obookheader_navbar_button_connection');
        console.log(connectButton);
        connectButton.textContent = 'Se déconnecter';

        app.loginStatus = true;



    },

    handleAddCommentSubmit: function(event) 
    {

        event.preventDefault();
    
        const addCommentSubmit = event.currentTarget;

        console.log(addCommentSubmit);
    },
    
    modal_connexion: function() {

        //https://www.w3schools.com/howto/howto_css_modals.asp
    
        var modal = document.querySelector(".modal_forms");
    
        // the button to open the modal
        var button_to_connect = document.querySelector(".obookheader_navbar_button");
        var button_to_connect_burger = document.querySelector(".menu_burger_navbar_button_connection");

        // the burger menu
        var burger_menu = document.querySelector(".menu")

        // The span element (little cross) to close the modal
        var span = document.getElementsByClassName("close")[0];
    
        // When you click on the button, open the modal 

        button_to_connect_burger.onclick = function() {
            modal.style.display = "block";
            burger_menu.classList.remove("is-active");
        }
        
        button_to_connect.onclick = function() {
            if(app.loginStatus === false){
                modal.style.display = "block";
            }
            else {
                window.localStorage.clear();
                let connectButton = document.querySelector('.obookheader_navbar_button_connection');
                console.log(connectButton);
                connectButton.textContent = 'Se connecter';
                app.loginStatus = false;
            }
        }
    
        // When you click on <span> (x), close the modal
        span.onclick = function() {
          modal.style.display = "none";
        }
    
        // When the user clicks anywhere outside of the modal, close it
        window.onclick = function(event) {
          if (event.target == modal) {
            modal.style.display = "none";
          }
        }
    
      },


      // View card of "les livres à la une"
      handleChangeNewsToDetailA: function(event){
        event.preventDefault();

        // Récupération des données provenant du JS de Pierre
        const bookObject = event.currentTarget;
        const bookDiv = bookObject.closest('.card');

        // Récupération du dataset pour identifier un livre
        app.book = bookDiv.dataset.number;

        // Récupération du livre en cours et de toutes les informations
        const bookTitleUne = app.book2Title[app.book];
        const bookDescriptionUne = app.book2Description[app.book];
        const bookAuthorsUne = app.book2Authors[app.book];
        const bookCategoriesUne = app.book2Categories[app.book];
        const bookPublisherUne = app.book2Publisher[app.book];
        const bookImageUne = app.book2Image[app.book];

        //console.log(app.book)

        // Ciblage à l'aide du dataset sur la bon item de manière à récupérer l'id
        //const classOfgoogleBookId = (event.currentTarget).getElementsByClassName('card-footer-item');
        //const googleBookId = classOfgoogleBookId[0].id;

        // Définir toutes les propriétés du livre sélectionné afin de les ajouter dans le localstorage
        window.localStorage.setItem('bookTitleUne', bookTitleUne); 
        window.localStorage.setItem('bookDescriptionUne', bookDescriptionUne); 
        window.localStorage.setItem('bookAuthorsUne', bookAuthorsUne); 
        window.localStorage.setItem('bookCategoriesUne', bookCategoriesUne); 
        window.localStorage.setItem('bookPublisherUne', bookPublisherUne); 
        //window.localStorage.setItem('googleBookId', googleBookId); 

        // Ajout des champs du livre dans la card
        const bookImageCard = document.getElementById('book-image');
        const bookTitleCard = document.getElementById('book-title');
        const bookAuthorCard = document.getElementById('book-author');
        const bookDescriptionCard = document.getElementById('book-description');
        bookImageCard.src = bookImageUne;
        bookTitleCard.textContent = bookTitleUne;
        bookAuthorCard.textContent = bookAuthorsUne;
        bookDescriptionCard.textContent = bookDescriptionUne;

        // Cibler le bouton pour ouvrir la card de description + commentaire
        const commentModal = document.querySelector('.editComment');
        commentModal.classList.add('is-active');

        // Cibler le bouton de fermeture de la card
        const closeModal = document.querySelector('.closeModal');
        closeModal.addEventListener('click', app.closeModal);
        // Cibler la croix pour fermer la card
        const closeModalWithButton = document.getElementById('close-comment-button');
        closeModalWithButton.addEventListener('click', app.closeModal);

        // Cibler le bouton pour l'enregistrement du commentaire
        const saveComment = document.querySelector('.submitAddCommentForm');
        saveComment.addEventListener('click', app.saveTheComment);

        // Vérifier si j'ai un token
        const tokenInLocalstorage = window.localStorage.getItem('oBookToken');

        if (tokenInLocalstorage === undefined) {
            const loginText = saveComment.getElementsByTagName('span')[1];
            loginText.textContent = 'Se connnecter';
        }

    },

    // animation to display the question into the FAQ
    accordion_faq: function(){
        var acc = document.getElementsByClassName("accordion");
        var i;
        
        for (i = 0; i < acc.length; i++) {
          acc[i].addEventListener("click", function() {
            /* Toggle between adding and removing the "active" class,
            to highlight the button that controls the panel */
            this.classList.toggle("active");
        
            /* Toggle between hiding and showing the active panel */
            var panel = this.nextElementSibling;
            if (panel.style.display === "block") {
              panel.style.display = "none";
            } else {
              panel.style.display = "block";
            }
          });
        }
      },

};

document.addEventListener('DOMContentLoaded', app.init);
$(app.modal_connexion);
$(app.accordion_faq);


