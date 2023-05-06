class carousel {

    // Les id des éléments du dom à utliser
    carouselContainer = Object;
    carouselImagesLinksContainer = Object;
    carouselImagesList = Object;
    btnBack = Object;
    btnForward = Object;

    // Le tableau des liens direct vers les images
    imagesLinksArray = new Array;
    // Le nombre d'images
    nbImages = 0;
    // L'offset actuelle
    offset = 0;
    // Si le carousel est infinie ou non
    isInfinite = false;
    // Si les fléches sont visible ou pas
    isArrowVisible = true;
    // Si les liens vers les images sont visibles ou pas
    isImagesLinksVisible = true;


    /**
     * Constructeur de la classe
     * @author s3g
     * @param parameters un objet contenant la configuration
     */
    constructor(parameters) {
        // Initialisation variables
        if (typeof(parameters.carouselContainer)!='undefined') {
            this.carouselContainer = parameters.carouselContainer;
        } else {
            this.carouselContainer = document.getElementById('carousel-container');
        }

        if (typeof(parameters.carouselImagesLinksContainer)!='undefined') {
            this.carouselImagesLinksContainer = parameters.carouselImagesLinksContainer;
        } else {
            this.carouselImagesLinksContainer = document.getElementById('carousel-images-links-container');
        }

        if (typeof(parameters.carouselImagesList)!='undefined') {
            this.carouselImagesList = parameters.carouselImagesList;
        } else {
            this.carouselImagesList = document.getElementById('carousel-images-list');
        }

        if (typeof(parameters.btnBack)!='undefined') {
            this.btnBack = parameters.btnBack;
        } else {
            this.btnBack = document.getElementById('carousel-arrow-back');
        }

        if (typeof(parameters.btnForward)!='undefined') {
            this.btnForward = parameters.btnForward;
        } else {
            this.btnForward = document.getElementById('carousel-arrow-forward');
        }

        if (typeof(parameters.isInfinite)!='undefined') {
            this.isInfinite = parameters.isInfinite;
        }

        if (typeof(parameters.isArrowVisible)!='undefined') {
            this.isArrowVisible = parameters.isArrowVisible;
        }

        if (typeof(parameters.isImagesLinksVisible)!='undefined') {
            this.isImagesLinksVisible = parameters.isImagesLinksVisible;
        }

        // Nombre d'images
        this.nbImages = this.carouselImagesList.children.length;

        if (this.isImagesLinksVisible) {
            this.initImagesLinksContainer();
        }

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

    initImagesLinksContainer() {
        for(let i = 0; i < this.nbImages ; i++) {
            this.imagesLinksArray[i] = document.createElement('div');
            this.imagesLinksArray[i].classList.add('circle');
            this.imagesLinksArray[i].left=i*20+'px';
            this.imagesLinksArray[i].setAttribute('id','image-link-'+i);
            this.carouselImagesLinksContainer.appendChild(this.imagesLinksArray[i]);
            this.imagesLinksArray[i].addEventListener('click', () => {
                this.goToOffset(i);
            });
        }
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
     * Va à l'offet indiqué
     * @author s3g
     * @param targetOffset La valeur que l'on veut attribuer à l'offset
     */
    goToOffset(targetOffset) {
        console.log('Go to offset : ', targetOffset);
        if (typeof(targetOffset)=='number' && targetOffset>=0 && targetOffset<this.nbImages) {
            this.offset = targetOffset;
            this.translateXImages();
            this.refreshArrow();
        }
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
        if ( !this.isArrowVisible ) {
            this.btnBack.style.display='none';
            this.btnForward.style.display='none';
            return;
        }

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

myCarouselParameters = {
    // Le container globale du carousel
    // carouselContainer: document.getElementById('carousel-container'),

    // Le container des pastilles qui permettent de naviguer directement vers une image
    // carouselImagesLinksContainer: document.getElementById('carousel-images-links-container'),

    // Le container qui contient la liste des images
    // carouselImagesList: document.getElementById('carousel-images-list'),

    // La flèche gauche
    // btnBack: document.getElementById('carousel-arrow-back'),

    // La flèche droite
    // btnForward: document.getElementById('carousel-arrow-forward'),

    // Si le carousel est infini
    isInfinite: true,

    // Si les flèches sont visibles
    isArrowVisible: true,

    // Si les liens directs vers les images est visible
    isImagesLinksVisible: true
};

myCarousel = new carousel(myCarouselParameters);



