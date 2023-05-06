class carousel {

    // Les id des éléments du dom à utliser
    carouselContainer = Object;
    carouselImagesList = Object;
    btnBack = Object;
    btnForward = Object;

    // Le nombre d'images
    nbImages = 0;
    // L'offset actuelle
    offset = 0;
    // Si le carousel est infinie ou non
    isInfinite = false;

    /**
     * Constructeur de la classe
     * @author s3g
     * @param carouselContainer Le getElementById du container du carousel
     * @param carouselImagesList Le getElementById du container des images
     * @param btnBack Le getElementById du bouton gauche
     * @param btnForward Le getElementById du bouton droite
     * @param isInfinite A true si on veut que le carousel soit infini
     */
    constructor( carouselContainer, carouselImagesList, btnBack, btnForward, isInfinite) {
        // Initialisation variables
        this.carouselContainer = carouselContainer;
        this.carouselImagesList = carouselImagesList;
        this.btnBack = btnBack;
        this.btnForward = btnForward;
        this.isInfinite = isInfinite;

        // Nombre d'images
        this.nbImages = this.carouselImagesList.children.length;

        // Ecoute sur les boutons
        this.btnBack.addEventListener('click', () => {
            this.clickBack();
        });

        this.btnForward.addEventListener('click', () => {
            this.clickForward();
        });

        console.log('Nb images : ',this.nbImages);
        // On raffraichit l'affichage des flèches
        this.refreshArrow();
    }

    /**
     * Lorsque l'on click sur la fléche de gauche
     * @author s3g
     * @param none
     */
    clickBack() {
        console.log('ClickBack');
        this.offset = ( this.offset > 0 ) ? --this.offset : this.nbImages-1;
        console.log('Offset : ',this.offset);
        this.translateXImages();
        this.refreshArrow();
    }

    /**
     * Lorsque l'on click sur la fléche de droite
     * @author s3g
     * @param none
     */
    clickForward() {
        console.log('ClickForward');
        this.offset = ( this.offset < this.nbImages-1 ) ? ++this.offset : 0;
        console.log('Offset : ',this.offset);
        this.translateXImages();
        this.refreshArrow();
    }

    /**
     * Gére le défilement vers l'image cible
     * @author s3g
     * @param none
     */
    translateXImages() {
        this.carouselImagesList.style.transform = 'translateX(-' + (100*this.offset) + '%)';
    }

    /**
     * Raffraichie
     */
    refreshArrow() {
        if ( this.offset == 0 ) {
            if (!this.isInfinite) this.btnBack.style.display='none';
        } else {
            this.btnBack.style.display='block';
        }

        if ( this.offset == (this.nbImages-1) ) {
            if (!this.isInfinite)  this.btnForward.style.display = 'none';
        }
        else {
            this.btnForward.style.display='block';
        }
    }

}

carouselContainer = document.getElementById('carousel-container');
carouselImagesList = document.getElementById('carousel-images-list');

btnBack = document.getElementById('carousel-arrow-back');
btnForward = document.getElementById('carousel-arrow-forward');

myCarousel = new carousel(carouselContainer,carouselImagesList,btnBack,btnForward,true);



