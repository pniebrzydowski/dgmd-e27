"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
class SlideShow {
    constructor($container, slides, createSlide) {
        this.slides = slides;
        this.createSlide = createSlide;
        this.currentSlide = 1;
        this.$slidesContainer = $container.querySelector('.image-slides');
    }
    createImages() {
        return __awaiter(this, void 0, void 0, function* () {
            this.slides.forEach((slide, idx) => {
                const $container = document.createElement("div");
                $container.classList.add('img-container');
                $container.classList.add(`img-container-${idx + 1}`);
                if (idx === 0) {
                    $container.classList.add('active');
                }
                const $content = this.createSlide(slide);
                $content.forEach($el => $container.appendChild($el));
                this.$slidesContainer.appendChild($container);
            });
        });
    }
    init() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.createImages();
            setInterval(() => this.nextSlide(), 5000);
        });
    }
    activateSlide(slideIndex) {
        this.$slidesContainer.querySelectorAll('.img-container').forEach($img => {
            if ($img.classList.contains(`img-container-${slideIndex}`)) {
                $img.classList.add('active');
            }
            else {
                $img.classList.remove('active');
            }
        });
    }
    nextSlide() {
        if (this.currentSlide === this.slides.length) {
            this.currentSlide = 1;
        }
        else {
            this.currentSlide++;
        }
        this.activateSlide(this.currentSlide);
    }
}
const createSlideWithCaption = (slide) => {
    const $img = document.createElement("img");
    $img.src = slide.src;
    const $caption = document.createElement("caption");
    $caption.innerHTML = slide.caption;
    return [$img, $caption];
};
const onLoad = () => {
    const $container = document.getElementById('container');
    if (!$container) {
        throw new Error('Container not found, cannot initiate slide show');
    }
    const slides = [
        { src: './images/spartan-head.png', caption: 'Primary logo for the Michigan State Spartans' },
        { src: './images/spartan-gruff.png', caption: 'Alternate Michigan State logo (Gruff Sparty)' },
        { src: './images/spartan-hockey.png', caption: 'Logo used by Michigan State Hockey' }
    ];
    const slideshow = new SlideShow($container, slides, createSlideWithCaption);
    slideshow.init();
};
document.body.onload = onLoad;
