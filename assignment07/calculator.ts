const enum Operation {
  Add = '+',
  Subtract = '-',
  Multiply = '*',
  Divide = '/',
  Equals = '='
}

function Calculation(target: Calculator, key: string, descriptor: any) {
  const originalOperation = descriptor.value;
  descriptor.value = function(...args: any[]) {
    if (this.currentOperation !== Operation.Equals) {
      this.evaluate();
    };

    this.currentValue = Number(this.currentInput);
    this.isNumberEntry = false;
    return originalOperation.apply(this, args);
  }
  return descriptor;
}

function UpdateValue(target: Calculator, key: string, descriptor: any) {
  const originalOperation = descriptor.value;
  descriptor.value = function(...args: any[]) {
    originalOperation.apply(this, args);
    this.currentInput = String(this.currentValue);
    this.updateValueInput();
  }
  return descriptor;
}

class Calculator {
  private currentValue = 0;
  private currentInput = '0';
  private currentOperation = Operation.Equals;
  private isNumberEntry = false;
  private $valueInput: HTMLInputElement;
  constructor(private $container: HTMLElement) {
    this.$valueInput = this.$container.querySelector('input') as HTMLInputElement;
    this.initOperators();
    this.initNumbers();
    this.initClearButton();
    this.initPlusMinus();
    this.initPercent();
  }

  updateValueInput() {
    this.$valueInput.value = this.currentInput;
  }

  @UpdateValue
  clear() {
    this.currentValue = 0;
    this.currentOperation = Operation.Equals;
    this.isNumberEntry = false;
  }

  @UpdateValue
  togglePlusMinus() {
    this.currentValue = Number(this.currentInput);
    this.currentValue = -this.currentValue;
  }

  @UpdateValue
  percentage() {
    this.currentValue = Number(this.currentInput);
    this.currentValue = this.currentValue / 100;
  }

  initClearButton() {
    const $clearButton = document.getElementById('button-clear');
    if (!$clearButton) {
      console.log('Clear button not found!');
      return;
    }
    $clearButton.addEventListener('click', () => {
      this.clear();
    });
  }

  initPlusMinus() {
    const $plusMinusButton = document.getElementById('button-plusminus');
    if (!$plusMinusButton) {
      console.log('Plus-Minus button not found!');
      return;
    }
    $plusMinusButton.addEventListener('click', () => {
      this.togglePlusMinus();
    });
  }

  initPercent() {
    const $percentButton = document.getElementById('button-percent');
    if (!$percentButton) {
      console.log('Percent button not found!');
      return;
    }
    $percentButton.addEventListener('click', () => {
      this.percentage();
    });
  }

  initOperators() {
    const $operatorButtons = this.$container.querySelector('.buttons-operators');
    if (!$operatorButtons) {
      throw new Error('Operator buttons not found!')
    }
    $operatorButtons.querySelectorAll('button').forEach($button => {
      const operation = $button.dataset.operation;
      switch (operation) {
        case Operation.Add:
          $button.addEventListener('click', () => {
            this.onAdd();
          })
          break;
        case Operation.Subtract:
          $button.addEventListener('click', () => {
            this.onSubtract();  
          })
          break;
        case Operation.Multiply:
          $button.addEventListener('click', () => {
            this.onMultiply();
          });
          break;
        case Operation.Divide:
          $button.addEventListener('click', () => {
            this.onDivide();
          });
          break;
        case Operation.Equals:
          $button.addEventListener('click', () => {
            this.onEquals();
          });
          break;
      }
    });
  }
  
  onNumberClick(number: string) {
    const $operatorButtons = this.$container.querySelector('.buttons-operators');
    if (!$operatorButtons) {
      throw new Error('Operator buttons not found!')
    }

    if (this.isNumberEntry) {
      this.currentInput += number;
    } else {
      this.currentInput = number;
      this.isNumberEntry = true;
    }
    this.updateValueInput();
  }

  initNumbers() {
    const $numberButtons = this.$container.querySelector('.buttons-numbers');
    if (!$numberButtons) {
      throw new Error('Number buttons not found!')
    }
    $numberButtons.querySelectorAll('button').forEach($button => {
      $button.addEventListener('click', () => {
        this.onNumberClick($button.innerHTML);
      });
    });
  }

  @UpdateValue
  evaluate() {
    let value = this.currentValue;
    switch (this.currentOperation) {
      case Operation.Add:
        value += Number(this.currentInput);
        break;
      case Operation.Subtract:
        value -= Number(this.currentInput);
        break;
      case Operation.Multiply:
        value *= Number(this.currentInput);
        break;
      case Operation.Divide:
        value /= Number(this.currentInput);
        break;
      default:
        break;
    }
    if (value === Infinity) {
      alert('Infinity!');
      return;
    }
    this.currentValue = value;
  }

  @Calculation
  onAdd() {
    this.currentOperation = Operation.Add;
  }

  @Calculation
  onSubtract() {
    this.currentOperation = Operation.Subtract;
  }

  @Calculation
  onDivide() {
    this.currentOperation = Operation.Divide;
  }

  @Calculation
  onMultiply() {
    this.currentOperation = Operation.Multiply;
  }

  @Calculation
  onEquals() {
    this.currentOperation = Operation.Equals;
  }
}

const onLoad = (): void => {
  const $container = document.getElementById('container');
  if (!$container) {
    throw new Error('Container not found, cannot initiate calculator app');
  }
  new Calculator($container);
}

document.body.onload = onLoad;