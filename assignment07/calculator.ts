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
    console.log(key);
    console.log(this.currentInput, this.currentValue, this.currentOperation);
    if (this.currentOperation !== Operation.Equals) {
      this.evaluate();
    }
    
    this.currentValue = Number(this.currentInput);
    this.isNumberEntry = false;
    return originalOperation.apply(this, args);
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
  }

  updateValueInput() {
    this.$valueInput.value = this.currentInput;
  }

  clear() {
    this.currentInput = '0';
    this.currentValue = 0;
    this.currentOperation = Operation.Equals;
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
        this.updateValueInput();
      });
    });
  }

  evaluate() {
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
    this.currentInput = String(this.currentValue);
    this.updateValueInput();
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