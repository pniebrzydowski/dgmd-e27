"use strict";
class SlideShow {
    constructor($container) {
        this.currentSlide = "slide-one" /* SlideOne */;
        this.$slidesContainer = $container.querySelector('.image-slides');
        $container.querySelectorAll('.control-button').forEach($btn => {
            $btn.addEventListener('click', () => {
                const $btnEl = $btn;
                if ($btnEl.dataset.action === "next" /* Next */) {
                    this.nextSlide();
                }
                else {
                    this.previousSlide();
                }
            });
        });
    }
    activateSlide(slide) {
        this.$slidesContainer.querySelectorAll('img').forEach($img => {
            if ($img.classList.contains(slide)) {
                $img.classList.add('active');
            }
            else {
                $img.classList.remove('active');
            }
        });
    }
    nextSlide() {
        switch (this.currentSlide) {
            case "slide-one" /* SlideOne */:
                this.currentSlide = "slide-two" /* SlideTwo */;
                break;
            case "slide-two" /* SlideTwo */:
                this.currentSlide = "slide-three" /* SlideThree */;
                break;
            default:
                this.currentSlide = "slide-one" /* SlideOne */;
        }
        this.activateSlide(this.currentSlide);
    }
    previousSlide() {
        switch (this.currentSlide) {
            case "slide-three" /* SlideThree */:
                this.currentSlide = "slide-two" /* SlideTwo */;
                break;
            case "slide-two" /* SlideTwo */:
                this.currentSlide = "slide-one" /* SlideOne */;
                break;
            default:
                this.currentSlide = "slide-three" /* SlideThree */;
        }
        this.activateSlide(this.currentSlide);
    }
}
const onLoad = () => {
    const $container = document.getElementById('container');
    if (!$container) {
        throw new Error('Container not found, cannot initiate slide show');
    }
    new SlideShow($container);
};
document.body.onload = onLoad;
