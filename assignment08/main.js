"use strict";
class JQueryImageToggle {
    constructor(containerId) {
        this.isImageVisible = false;
        const $container = jQuery(`#${containerId}`);
        this.$image = $container.find('img');
        this.$toggleButton = $container.find('button');
        this.$toggleButton.on('click', () => {
            this.toggleImage();
        });
    }
    showImage() {
        this.$image.removeClass('hidden');
        this.$toggleButton.text('Hide Image');
        this.isImageVisible = true;
    }
    hideImage() {
        this.$image.addClass('hidden');
        this.$toggleButton.text('Show Image');
        this.isImageVisible = false;
    }
    toggleImage() {
        if (this.isImageVisible) {
            this.hideImage();
        }
        else {
            this.showImage();
        }
    }
}
const onLoad = () => {
    new JQueryImageToggle('container');
};
document.body.onload = onLoad;
