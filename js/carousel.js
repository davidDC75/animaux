class carousel {
    carouselContainer = document.getElementById('carousel-container');
    carouselImageList = document.getElementById('carousel-images-list');

    btnBack = document.getElementById('carousel-arrow-back');
    btnForward = document.getElementById('carousel-arrow-forward');

    nbImages = 0;
    offset = 0;
    isInfinite = false;

    /**
     * Constructeur de la classe
     * @author s3g
     * @param isInfinite A true si on veut que le carousel soit infini
     */
    constructor(isInfinite) {

        this.isInfinite = isInfinite;

        this.nbImages = this.carouselImageList.children.length;

        this.btnBack.addEventListener('click', () => {
            this.clickBack();
        });

        this.btnForward.addEventListener('click', () => {
            this.clickForward();
        });
        console.log('Nb images : ',this.nbImages);
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
        this.carouselImageList.style.transform = 'translateX(-' + (100*this.offset) + '%)';
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

myCarousel = new carousel(true);



