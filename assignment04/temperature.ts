class TempInput {
  constructor (private $inputElement: HTMLInputElement) {}
  getValue = () => parseInt(this.$inputElement.value, 10);
  setValue = (newValue: number) => {
    this.$inputElement.value = newValue.toString();
  }
  toggleActive = () => {
    this.$inputElement.readOnly = !this.$inputElement.readOnly;
    if (!this.$inputElement.readOnly) {
      this.$inputElement.focus();
    }
    const $parent = this.$inputElement.parentElement;
    if (!$parent) {
      return;
    }
    const classes = $parent.classList;
    $parent.className = `input-container ${!classes.contains('input-container-active') ? 'input-container-active' : ''}`;
  }
}

abstract class TemperatureConverter {
  constructor(protected tempInput: TempInput) {}
  setInputValue = (value: number): void => {
    this.tempInput.setValue(value);
  }
  toggleActive = (): void => {
    this.tempInput.toggleActive();
  }
  abstract convert: () => number | null;
}

class ConverterCtoF extends TemperatureConverter {
  convert = () => {
    const fieldValue = this.tempInput.getValue();
    if (!fieldValue && fieldValue !== 0) {
      alert('You must enter a value in C to convert!');
      return null;
    }
    const convertedValue =  fieldValue * 9 / 5 + 32;
    return Number(convertedValue.toFixed(2));
  }
}

class ConverterFtoC extends TemperatureConverter {
  convert = () => {
    const fieldValue = this.tempInput.getValue();
    if (!fieldValue && fieldValue !== 0) {
      alert('You must enter a value in F to convert!')
      return null;
    }
    const convertedValue = (fieldValue - 32) * 5 / 9;
    return Number(convertedValue.toFixed(2));
  }
}

class ConversionForm {
  private converterCtoF: TemperatureConverter;
  private converterFtoC: TemperatureConverter;
  private activeConverter: TemperatureConverter;
  private inactiveConverter: TemperatureConverter;

  constructor() {
    const $formEl = document.getElementById('conversion-form') as HTMLFormElement;
    const $inputElC = document.getElementById('temp-input-c') as HTMLInputElement;
    const $inputElF = document.getElementById('temp-input-f') as HTMLInputElement;
    if (!$formEl || !$inputElC || !$inputElF) {
      throw new Error('Could not instantiate ConversionForm class, one of the required HTML elements is missing');
    }
  
    const tempInputC = new TempInput($inputElC);
    const tempInputF = new TempInput($inputElF);
    this.converterCtoF = new ConverterCtoF(tempInputC);
    this.converterFtoC = new ConverterFtoC(tempInputF);
    
    this.activeConverter = this.converterFtoC;
    this.inactiveConverter = this.converterCtoF;

    this.addEventListeners();
  }

  toggleConverter = () => {
    if (this.activeConverter === this.converterFtoC) {
      this.activeConverter = this.converterCtoF;
      this.inactiveConverter = this.converterFtoC;
    } else {
      this.activeConverter = this.converterFtoC;
      this.inactiveConverter = this.converterCtoF;
    }
    this.converterCtoF.toggleActive();
    this.converterFtoC.toggleActive();
  }

  submit = (e: SubmitEvent) => {
    e.preventDefault();
    const convertedValue = this.activeConverter.convert();
    if (!convertedValue) {
      return;
    }
    this.inactiveConverter.setInputValue(convertedValue);
  }

  addEventListeners = () => {
    const $formEl = document.getElementById('conversion-form') as HTMLFormElement;
    $formEl.addEventListener('submit', this.submit);
    const $toggleBtn = document.getElementById('toggle-btn') as HTMLInputElement;
    $toggleBtn.addEventListener('click', this.toggleConverter);
  }

}

const onLoad = (): void => {
  new ConversionForm();
}

document.body.onload = onLoad;