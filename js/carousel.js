/********************************
    PREMIER CAROUSEL FROM SCRATCH
    PARTIE JAVASCRIPT
*********************************/
class carousel {

    // Les id des éléments du dom à utliser
    carouselContainer = Object;
    carouselImagesLinksContainer = Object;
    carouselImagesList = Object;
    divFullscreen = Object;
    btnBack = Object;
    btnForward = Object;
    btnFullscreen = Object;
    btnCloseFullscreen = Object;

    // Le tableau des puces vers les images
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
    // Si les numéros d'images sont affichés
    isNumberImageVisible = false;


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

        // console.log(this.carouselImagesList.children[0]);

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

        if (typeof(parameters.isNumberImageVisible)!='undefined') {
            this.isNumberImageVisible = parameters.isNumberImageVisible;
        }

        // Nombre d'images
        this.nbImages = this.carouselImagesList.children.length;

        if (this.isImagesLinksVisible) {
            this.initImagesLinksContainer();
        }

        // Ecoute sur les boutons des flèches si besoin
        if (this.isArrowVisible) {
            this.btnBack.addEventListener('click', () => {
                this.clickBack();
            });

            this.btnForward.addEventListener('click', () => {
                this.clickForward();
            });
        }

        this.imagesLinksArray[0].classList.add('circle-current');

        this.divFullscreen=document.getElementById('carousel-image-fullscreen');
        this.btnFullscreen=document.getElementById('fullscreen-button');
        this.btnFullscreen.addEventListener('click', () => {
            this.showFullscreen();
        });
        this.btnCloseFullscreen=document.getElementById('close-fullscreen-button');
        this.btnCloseFullscreen.addEventListener('click', () => {
            this.closeFullscreen();
        })

        console.log('Nb images : ',this.nbImages);
        // On raffraichit l'affichage des flèches
        this.refreshArrow();
    }

    /**
     * Génère le container qui contient les puces pour sauter d'une image à une autre directement
     * @author s3g
     * @param none
     */
    initImagesLinksContainer() {
        for(let i = 0; i < this.nbImages ; i++) {
            this.imagesLinksArray[i] = document.createElement('div');
            this.imagesLinksArray[i].classList.add('circle');
            this.imagesLinksArray[i].left=i*20+'px';
            this.imagesLinksArray[i].setAttribute('id','image-link-'+i);
            // On ajoute le numéro si il le faut
            if (this.isNumberImageVisible) {
                this.imagesLinksArray[i].textContent=i+1;
            }
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
        if (this.offset > 0) {
            this.removeCurrentCircle(this.offset);
            this.offset--;
            this.addCurrentcircle(this.offset);
        } else {
            this.removeCurrentCircle(this.offset);
            this.offset=this.nbImages-1;
            this.addCurrentcircle(this.offset);
        }
        console.log('Offset : ',this.offset);
        this.refreshAll();
    }

    /**
     * Lorsque l'on click sur la fléche de droite
     * @author s3g
     * @param none
     */
    clickForward() {
        console.log('ClickForward');
        if ( this.offset < this.nbImages-1 ) {
            this.removeCurrentCircle(this.offset);
            this.offset++;
            this.addCurrentcircle(this.offset);
        } else {
            this.removeCurrentCircle(this.offset);
            this.offset=0;
            this.addCurrentcircle(this.offset);
        }
        console.log('Offset : ',this.offset);
        this.refreshAll();
    }

    /**
     * Enlève la classe circle-curent à l'ancien offset
     * @author s3g
     * @param none
     */
    removeCurrentCircle(offset) {
        this.imagesLinksArray[offset].classList.remove('circle-current');
    }

    /**
     * Ajoute la classe circle-current à l'offset courant
     * @author s3g
     * @param none
     */
    addCurrentcircle(offset) {
        this.imagesLinksArray[offset].classList.add('circle-current');
    }

    /**
     * Va à l'offet indiqué
     * @author s3g
     * @param targetOffset La valeur que l'on veut attribuer à l'offset
     */
    goToOffset(targetOffset) {
        console.log('Go to offset : ', targetOffset);
        if (typeof(targetOffset)=='number' && targetOffset>=0 && targetOffset<this.nbImages) {
            this.removeCurrentCircle(this.offset);
            this.offset = targetOffset;
            this.addCurrentcircle(this.offset);
            this.refreshAll();
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
     * Raffraichie l'affichages des flèches
     * @author s3g
     * @param none
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

    refreshAll() {
        this.translateXImages();
        this.refreshArrow;
    }

    /**
     * Affiche l'image sur tout l'écran
     * @author s3g
     * @param none
     */
    showFullscreen() {
        console.log('show fullscreen');
        let currentImg=this.carouselImagesList.children[this.offset];
        let srcImg=currentImg.getAttribute('src');
        this.divFullscreen.style.backgroundImage="url('"+srcImg+"')";
        this.divFullscreen.style.display='block';
    }

    /**
     * Ferme l'image en plein écran
     * @author s3g
     * @param none
     */
    closeFullscreen() {
        console.log('close fullscreen');
        this.divFullscreen.style.display='none';
    }

}

myCarouselParameters = {
    // Si un paramètre n'est pas fourni alors c'est sa valeur par défaut qui sera initialisée

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
    isImagesLinksVisible: true,

    // Si on voit les numéros des images affichés
    isNumberImageVisible: false
};

myCarousel = new carousel(myCarouselParameters);



