"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
function Calculation(target, key, descriptor) {
    const originalOperation = descriptor.value;
    descriptor.value = function (...args) {
        console.log(key);
        console.log(this.currentInput, this.currentValue, this.currentOperation);
        if (this.currentOperation !== "=" /* Equals */) {
            this.evaluate();
        }
        this.currentValue = Number(this.currentInput);
        this.isNumberEntry = false;
        return originalOperation.apply(this, args);
    };
    return descriptor;
}
class Calculator {
    constructor($container) {
        this.$container = $container;
        this.currentValue = 0;
        this.currentInput = '0';
        this.currentOperation = "=" /* Equals */;
        this.isNumberEntry = false;
        this.$valueInput = this.$container.querySelector('input');
        this.initOperators();
        this.initNumbers();
        this.initClearButton();
    }
    updateValueInput() {
        this.$valueInput.value = this.currentInput;
    }
    clear() {
        this.currentInput = '0';
        this.currentValue = 0;
        this.currentOperation = "=" /* Equals */;
        this.isNumberEntry = false;
        this.updateValueInput();
    }
    initClearButton() {
        const $clearButton = document.getElementById('button-clear');
        if (!$clearButton) {
            console.log('Clear button not found!');
            return;
        }
        $clearButton.addEventListener('click', () => {
            console.log('clear button click');
            this.clear();
        });
    }
    initOperators() {
        const $operatorButtons = this.$container.querySelector('.buttons-operators');
        if (!$operatorButtons) {
            throw new Error('Operator buttons not found!');
        }
        $operatorButtons.querySelectorAll('button').forEach($button => {
            const operation = $button.dataset.operation;
            switch (operation) {
                case "+" /* Add */:
                    $button.addEventListener('click', () => {
                        this.onAdd();
                    });
                    break;
                case "-" /* Subtract */:
                    $button.addEventListener('click', () => {
                        this.onSubtract();
                    });
                    break;
                case "*" /* Multiply */:
                    $button.addEventListener('click', () => {
                        this.onMultiply();
                    });
                    break;
                case "/" /* Divide */:
                    $button.addEventListener('click', () => {
                        this.onDivide();
                    });
                    break;
                case "=" /* Equals */:
                    $button.addEventListener('click', () => {
                        this.onEquals();
                    });
                    break;
            }
        });
    }
    initNumbers() {
        const $numberButtons = this.$container.querySelector('.buttons-numbers');
        if (!$numberButtons) {
            throw new Error('Number buttons not found!');
        }
        $numberButtons.querySelectorAll('button').forEach($button => {
            $button.addEventListener('click', () => {
                const $operatorButtons = this.$container.querySelector('.buttons-operators');
                if (!$operatorButtons) {
                    throw new Error('Operator buttons not found!');
                }
                if (this.isNumberEntry) {
                    this.currentInput += $button.innerHTML;
                }
                else {
                    this.currentInput = $button.innerHTML;
                    this.isNumberEntry = true;
                }
                this.updateValueInput();
            });
        });
    }
    evaluate() {
        switch (this.currentOperation) {
            case "+" /* Add */:
                this.currentValue += Number(this.currentInput);
                break;
            case "-" /* Subtract */:
                this.currentValue -= Number(this.currentInput);
                break;
            case "*" /* Multiply */:
                this.currentValue *= Number(this.currentInput);
                break;
            case "/" /* Divide */:
                this.currentValue /= Number(this.currentInput);
                break;
            default:
                break;
        }
        this.currentInput = String(this.currentValue);
        this.updateValueInput();
    }
    onAdd() {
        this.currentOperation = "+" /* Add */;
    }
    onSubtract() {
        this.currentOperation = "-" /* Subtract */;
    }
    onDivide() {
        this.currentOperation = "/" /* Divide */;
    }
    onMultiply() {
        this.currentOperation = "*" /* Multiply */;
    }
    onEquals() {
        this.currentOperation = "=" /* Equals */;
    }
}
__decorate([
    Calculation
], Calculator.prototype, "onAdd", null);
__decorate([
    Calculation
], Calculator.prototype, "onSubtract", null);
__decorate([
    Calculation
], Calculator.prototype, "onDivide", null);
__decorate([
    Calculation
], Calculator.prototype, "onMultiply", null);
__decorate([
    Calculation
], Calculator.prototype, "onEquals", null);
const onLoad = () => {
    const $container = document.getElementById('container');
    if (!$container) {
        throw new Error('Container not found, cannot initiate calculator app');
    }
    new Calculator($container);
};
document.body.onload = onLoad;
