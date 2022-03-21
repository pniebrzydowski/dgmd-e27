class Calculator {
  constructor(private $container: HTMLElement) {
    
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