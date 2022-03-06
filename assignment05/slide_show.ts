const enum Slide {
  SlideOne = 'slide-one',
  SlideTwo = 'slide-two',
  SlideThree = 'slide-three'
}

const enum ButtonAction {
  Next = 'next',
  Previous = 'previous'
}

class SlideShow {
  private currentSlide = Slide.SlideOne;
  private $slidesContainer: HTMLDivElement;

  constructor($container: HTMLElement) {
    this.$slidesContainer = $container.querySelector('.image-slides') as HTMLDivElement;
    
    $container.querySelectorAll('.control-button').forEach($btn => {
      $btn.addEventListener('click', () => {
        const $btnEl = $btn as HTMLButtonElement;
        if ($btnEl.dataset.action === ButtonAction.Next) {
          this.nextSlide();
        } else {
          this.previousSlide();
        }
      });
    });
  }
  
  private activateSlide(slide: Slide): void {
    this.$slidesContainer.querySelectorAll('img').forEach($img => {
      if ($img.classList.contains(slide)) {
        $img.classList.add('active');
      } else {
        $img.classList.remove('active');
      }
    })
  }

  private nextSlide(): void {
    switch(this.currentSlide) {
      case Slide.SlideOne:
         this.currentSlide = Slide.SlideTwo;
         break;
      case Slide.SlideTwo:
        this.currentSlide = Slide.SlideThree;
        break;
      default:
        this.currentSlide = Slide.SlideOne;
    }
    this.activateSlide(this.currentSlide);
  }
  private previousSlide(): void {
    switch(this.currentSlide) {
      case Slide.SlideThree:
         this.currentSlide = Slide.SlideTwo;
         break;
      case Slide.SlideTwo:
        this.currentSlide = Slide.SlideOne;
        break;
      default:
        this.currentSlide = Slide.SlideThree;
    }
    this.activateSlide(this.currentSlide);
  }
}

const onLoad = (): void => {
  const $container = document.getElementById('container');
  if (!$container) {
    throw new Error('Container not found, cannot initiate slide show');
  }
  new SlideShow($container)
}

document.body.onload = onLoad;