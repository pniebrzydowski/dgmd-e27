"use strict";
class TempInput {
    constructor($inputElement) {
        this.$inputElement = $inputElement;
        this.getValue = () => parseInt(this.$inputElement.value, 10);
        this.setValue = (newValue) => {
            this.$inputElement.value = newValue.toString();
        };
        this.toggleActive = () => {
            this.$inputElement.readOnly = !this.$inputElement.readOnly;
            const $parent = this.$inputElement.parentElement;
            if (!$parent) {
                return;
            }
            const classes = $parent.classList;
            $parent.className = `input-container ${!classes.contains('input-container-active') ? 'input-container-active' : ''}`;
        };
    }
}
class TemperatureConverter {
    constructor(tempInput) {
        this.tempInput = tempInput;
        this.setInputValue = (value) => {
            this.tempInput.setValue(value);
        };
        this.toggleActive = () => {
            this.tempInput.toggleActive();
        };
    }
}
class ConverterCtoF extends TemperatureConverter {
    constructor() {
        super(...arguments);
        this.convert = () => {
            const fieldValue = this.tempInput.getValue();
            if (!fieldValue && fieldValue !== 0) {
                alert('You must enter a value in C to convert!');
                return null;
            }
            const convertedValue = fieldValue * 9 / 5 + 32;
            return Number(convertedValue.toFixed(2));
        };
    }
}
class ConverterFtoC extends TemperatureConverter {
    constructor() {
        super(...arguments);
        this.convert = () => {
            const fieldValue = this.tempInput.getValue();
            if (!fieldValue && fieldValue !== 0) {
                alert('You must enter a value in F to convert!');
                return null;
            }
            const convertedValue = (fieldValue - 32) * 5 / 9;
            return Number(convertedValue.toFixed(2));
        };
    }
}
class ConversionForm {
    constructor() {
        this.toggleConverter = () => {
            if (this.activeConverter === this.converterFtoC) {
                this.activeConverter = this.converterCtoF;
                this.inactiveConverter = this.converterFtoC;
            }
            else {
                this.activeConverter = this.converterFtoC;
                this.inactiveConverter = this.converterCtoF;
            }
            this.converterCtoF.toggleActive();
            this.converterFtoC.toggleActive();
        };
        this.submit = (e) => {
            e.preventDefault();
            const convertedValue = this.activeConverter.convert();
            if (!convertedValue) {
                return;
            }
            this.inactiveConverter.setInputValue(convertedValue);
        };
        this.addEventListeners = () => {
            this.$formEl.addEventListener('submit', this.submit);
            const $toggleBtn = document.getElementById('toggle-btn');
            $toggleBtn.addEventListener('click', this.toggleConverter);
        };
        const $formEl = document.getElementById('conversion-form');
        const $inputElC = document.getElementById('temp-input-c');
        const $inputElF = document.getElementById('temp-input-f');
        if (!$formEl || !$inputElC || !$inputElF) {
            throw new Error('Could not instantiate ConversionForm class, one of the required HTML elements is missing');
        }
        this.$formEl = $formEl;
        const tempInputC = new TempInput($inputElC);
        const tempInputF = new TempInput($inputElF);
        this.converterCtoF = new ConverterCtoF(tempInputC);
        this.converterFtoC = new ConverterFtoC(tempInputF);
        this.activeConverter = this.converterFtoC;
        this.inactiveConverter = this.converterCtoF;
        this.addEventListeners();
    }
}
const onLoad = () => {
    new ConversionForm();
};
document.body.onload = onLoad;
