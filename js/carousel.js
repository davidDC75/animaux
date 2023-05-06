class carousel {
    carouselContainer = document.getElementById('carousel-container');
    carouselImageList = document.getElementById('carousel-images-list');

    btnBack = document.getElementById('carousel-arrow-back');
    btnForward = document.getElementById('carousel-arrow-forward');

    nbImages = 0;
    offset = 0;

    constructor() {
        this.nbImages = this.carouselImageList.length;

        this.btnBack.addEventListener('click', () => {
            this.clickBack();
        });

        this.btnForward.addEventListener('click', () => {
            this.clickForward();
        });

        this.refreshArrow();
    }

    clickBack() {
        console.log('ClickBack');
        if ( this.offset == 0 ) {
            return false;
        }
        this.offset--;
        this.translateXImages();
        this.refreshArrow();
    }

    clickForward() {
        console.log('ClickForward');
        if ( this.offset == (this.nbImages-1) ) {
            return false;
        }
        this.offset++;
        this.translateXImages();
        this.refreshArrow();
    }

    translateXImages() {
        this.carouselImageList.style.transform = 'translateX(-' + (100*this.offset) + '%)';
    }

    refreshArrow() {
        if ( this.offset == 0 ) {
            this.btnBack.style.display='none';
        } else {
            this.btnBack.style.display='inline';
        }

        if ( this.offset == (this.nbImages-1) ) {
            this.btnForward.style.display = 'none';
        }
        else {
            this.btnForward.style.display='inline';
        }
    }

}

myCarousel = new carousel();



