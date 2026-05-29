function myApp() {
    return {

        /* --- STATE --- */
<<<<<<< HEAD
        mobileMenuOpen : false,
        currentIndex   : 0,
        autoSlide      : null,
        comics         : [],
        searchQuery     : '',

        /* --- INITIALIZE --- */
        async init() {
            await this.loadData();
=======
        mobileMenuOpen: false,
        currentIndex: 0,
        autoSlide: null,

        /* --- INITIALIZE --- */
        init() {
>>>>>>> b84b411 (Reorganisasi lokasi file)
            this.updateSlider();

            this.autoSlide = setInterval(() => {
                this.moveSlide(1);
            }, 9000);

            window.addEventListener('resize', () => {
                this.updateSlider();
            });
<<<<<<< HEAD

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
=======
>>>>>>> b84b411 (Reorganisasi lokasi file)
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

<<<<<<< HEAD
        
=======
        /* --- AUDIO PLAYER CONFIGURATION --- */
        togglePlayPause(audioId, btnId) {
            const audio = document.getElementById(audioId);
            const btn = document.getElementById(btnId);

            if (!audio || !btn) return;

            // Pause all other audio
            document.querySelectorAll('audio').forEach(otherAudio => {

                if (otherAudio.id !== audioId) {

                    otherAudio.pause();

                    const otherBtn =
                        document.querySelector(
                            '.btn-play-custom.playing'
                        );

                    if (otherBtn && otherBtn.id !== btnId) {
                        otherBtn.classList.remove('playing');
                    }
                }
            });

            // Toggle current audio
            if (audio.paused) {

                audio.play()
                    .then(() => {
                        btn.classList.add('playing');
                    })
                    .catch(() => {
                        console.log(
                            "User interaction required."
                        );
                    });

            } else {

                audio.pause();

                btn.classList.remove('playing');
            }
        }
>>>>>>> b84b411 (Reorganisasi lokasi file)
    }
}
