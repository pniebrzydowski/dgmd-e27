const enum Operation {
  Add = '+',
  Subtract = '-',
  Multiply = '*',
  Divide = '/',
  Equals = '='
}

class Calculator {
  private currentValue = 0;
  private currentInput = '';
  private currentOperation = Operation.Equals;
  private isNumberEntry = true;
  private $valueInput: HTMLInputElement;
  constructor(private $container: HTMLElement) {
    this.$valueInput = this.$container.querySelector('input') as HTMLInputElement;
    this.initOperators();
    this.initNumbers();
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
            this.evaluate();
          });
          break;
      }
    });
  }
  
  initNumbers() {
    const $numberButtons = this.$container.querySelector('.buttons-numbers');
    if (!$numberButtons) {
      throw new Error('Number buttons not found!')
    }
    $numberButtons.querySelectorAll('button').forEach($button => {
      $button.addEventListener('click', () => {
        const $operatorButtons = this.$container.querySelector('.buttons-operators');
        if (!$operatorButtons) {
          throw new Error('Operator buttons not found!')
        }
    
        if (this.isNumberEntry) {
          this.currentInput += $button.innerHTML;
        } else {
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
      case Operation.Add:
        this.currentValue += Number(this.currentInput);
        break;
      case Operation.Subtract:
        this.currentValue -= Number(this.currentInput);
        break;
      case Operation.Multiply:
        this.currentValue *= Number(this.currentInput);
        break;
      case Operation.Divide:
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
    this.currentOperation = Operation.Add;
  }

  onSubtract() {
    this.currentValue = Number(this.currentInput);
    this.isNumberEntry = false;
    this.currentOperation = Operation.Subtract;
  }

  onDivide() {
    this.currentValue = Number(this.currentInput);
    this.isNumberEntry = false;
    this.currentOperation = Operation.Divide;
  }

  onMultiply() {
    this.currentValue = Number(this.currentInput);
    this.isNumberEntry = false;
    this.currentOperation = Operation.Multiply;
  }

  onEquals() {
    this.currentOperation = Operation.Equals;
    this.evaluate();
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