"use strict";
class Calculator {
    constructor($container) {
        this.$container = $container;
        this.currentValue = 0;
        this.currentInput = '';
        this.currentOperation = "=" /* Equals */;
        this.isNumberEntry = true;
        this.$valueInput = this.$container.querySelector('input');
        this.initOperators();
        this.initNumbers();
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
                        this.evaluate();
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
                this.updateCurrentValue();
            });
        });
    }
    updateCurrentValue() {
        this.$valueInput.value = this.currentInput;
    }
    evaluate() {
        console.log(this.currentInput, this.currentValue, this.currentOperation);
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
        console.log(this.currentValue);
        this.$valueInput.value = String(this.currentValue);
    }
    onAdd() {
        this.currentValue = Number(this.currentInput);
        this.isNumberEntry = false;
        this.currentOperation = "+" /* Add */;
    }
    onSubtract() {
        this.currentValue = Number(this.currentInput);
        this.isNumberEntry = false;
        this.currentOperation = "-" /* Subtract */;
    }
    onDivide() {
        this.currentValue = Number(this.currentInput);
        this.isNumberEntry = false;
        this.currentOperation = "/" /* Divide */;
    }
    onMultiply() {
        this.currentValue = Number(this.currentInput);
        this.isNumberEntry = false;
        this.currentOperation = "*" /* Multiply */;
    }
    onEquals() {
        this.currentOperation = "=" /* Equals */;
        this.evaluate();
    }
}
const onLoad = () => {
    const $container = document.getElementById('container');
    if (!$container) {
        throw new Error('Container not found, cannot initiate calculator app');
    }
    new Calculator($container);
};
document.body.onload = onLoad;
