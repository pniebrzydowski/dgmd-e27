interface Slide {
  src: string;
  caption: string;
}

class SlideShow<T> {
  private currentSlide = 1;
  private $slidesContainer: HTMLDivElement;

  constructor(
    $container: HTMLElement,
    private slides: Array<T>,
    private createSlide: (slide: T) => Array<HTMLElement>
  ) {
    this.$slidesContainer = $container.querySelector('.image-slides') as HTMLDivElement;
  }

  async createImages() {
    this.slides.forEach((slide, idx) => {
      const $container = document.createElement("div");
      $container.classList.add('img-container');
      $container.classList.add(`img-container-${idx+1}`)
      if (idx === 0) {
        $container.classList.add('active');
      }

      const $content = this.createSlide(slide);
      $content.forEach($el => $container.appendChild($el));
      this.$slidesContainer.appendChild($container);
    });
  }

  async init() {
    await this.createImages();
    setInterval(() => this.nextSlide(), 5000);
  }
  
  private activateSlide(slideIndex: number): void {
    this.$slidesContainer.querySelectorAll('.img-container').forEach($img => {
      if ($img.classList.contains(`img-container-${slideIndex}`)) {
        $img.classList.add('active');
      } else {
        $img.classList.remove('active');
      }
    })
  }

  private nextSlide(): void {
    if(this.currentSlide === this.slides.length) {
      this.currentSlide = 1;
    } else {
      this.currentSlide++;
    }
    this.activateSlide(this.currentSlide);
  }
}

const createSlideWithCaption = (slide: Slide): [HTMLImageElement, HTMLTableCaptionElement] => {    
    const $img = document.createElement("img");
    $img.src = slide.src;
    const $caption = document.createElement("caption");
    $caption.innerHTML = slide.caption;
    return [$img, $caption];
  }

const onLoad = (): void => {
  const $container = document.getElementById('container');
  if (!$container) {
    throw new Error('Container not found, cannot initiate slide show');
  }
  const slides = [
    {src: './images/spartan-head.png', caption: 'Primary logo for the Michigan State Spartans'},
    {src: './images/spartan-gruff.png', caption: 'Alternate Michigan State logo (Gruff Sparty)'},
    {src: './images/spartan-hockey.png', caption: 'Logo used by Michigan State Hockey'}
  ];
  const slideshow = new SlideShow<Slide>($container, slides, createSlideWithCaption);
  slideshow.init();
}

document.body.onload = onLoad;