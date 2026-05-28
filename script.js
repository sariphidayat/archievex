/* --- SLIDER CONFIGURATION --- */
let currentIndex = 0;
let autoSlide = setInterval(() => moveSlide(1), 5000);

function updateSlider() {
    const track = document.getElementById('sliderTrack');
    const banner = document.getElementById('banner-slider');
    
    if (!track || !banner) return;
    
    const bannerWidth = banner.offsetWidth;
    track.style.transform = `translateX(${-currentIndex * bannerWidth}px)`;
}

function moveSlide(direction) {
    const slides = document.querySelectorAll('.slide');
    
    if (!slides.length) return;
    
    currentIndex = (currentIndex + direction + slides.length) % slides.length;
    updateSlider();
}

function manualMove(direction) {
    clearInterval(autoSlide);
    moveSlide(direction);
    autoSlide = setInterval(() => moveSlide(1), 5000);
}

/* --- AUDIO PLAYER CONFIGURATION --- */
function togglePlayPause(audioId, btnId) {
    const audio = document.getElementById(audioId);
    const btn = document.getElementById(btnId);

    if (!audio || !btn) return;

    // Matikan audio lain yang sedang berputar
    document.querySelectorAll('audio').forEach(otherAudio => {
        if (otherAudio.id !== audioId) {
            otherAudio.pause();
            const otherBtn = document.querySelector('.btn-play-custom.playing');
            if (otherBtn && otherBtn.id !== btnId) {
                otherBtn.classList.remove('playing');
            }
        }
    });

    // Toggle Play/Pause pada audio yang dipilih
    if (audio.paused) {
        audio.play().then(() => {
            btn.classList.add('playing');
        }).catch(error => {
            console.log("Interaksi user diperlukan untuk memutar audio.");
        });
    } else {
        audio.pause();
        btn.classList.remove('playing');
    }
}

/* --- EVENT LISTENERS --- */
window.addEventListener('resize', updateSlider);
document.addEventListener('DOMContentLoaded', updateSlider);