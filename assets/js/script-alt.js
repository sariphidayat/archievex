function myApp() {
    return {

        /* --- STATE --- */
        mobileMenuOpen : false,
        currentIndex   : 0,
        autoSlide      : null,
        comics         : [],
        searchQuery     : '',

        /* --- INITIALIZE --- */
        async init() {
            await this.loadData();
            this.updateSlider();

            this.autoSlide = setInterval(() => {
                this.moveSlide(1);
            }, 9000);

            window.addEventListener('resize', () => {
                this.updateSlider();
            });

            // TODO: Remove this after debugging
            // console.log("comics:", this.comics);
        },

        async loadData() {
            try {
                const response = await fetch('assets/data.json');
                this.comics = await response.json();

            } catch (error) {
                console.error("Failed to load data:", error);

            }
        },

        /* --- SLIDER CONFIGURATION --- */
        updateSlider() {
            const track = document.getElementById('sliderTrack');
            const banner = document.getElementById('banner-slider');

            if (!track || !banner) return;

            const bannerWidth = banner.offsetWidth;

            track.style.transform =
                `translateX(${-this.currentIndex * bannerWidth}px)`;
        },

        moveSlide(direction) {
            const slides = document.querySelectorAll('.slide');

            if (!slides.length) return;

            this.currentIndex =
                (this.currentIndex + direction + slides.length)
                % slides.length;

            this.updateSlider();
        },

        manualMove(direction) {
            clearInterval(this.autoSlide);

            this.moveSlide(direction);

            this.autoSlide = setInterval(() => {
                this.moveSlide(1);
            }, 5000);
        },

        
    }
}