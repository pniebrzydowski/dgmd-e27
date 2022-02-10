interface Logger {
  logError: (error: string) => void
}

class ErrorLogger implements Logger {
  logError(error: string): void {
    alert(error);
  }
}

class Clock {
  private clockContainer: HTMLElement;
  constructor(clockContainer: HTMLElement) {
    this.clockContainer = clockContainer;
  }

  private getCurrentTime = (): Date => new Date();
  
  private getFormattedTime = (date: Date): string => {
    const timeString = date.toTimeString();
    const timeStringWithoutTimezone = timeString.substring(0, 8);
    return timeStringWithoutTimezone;
  }  

  private updateTimeDisplay = (date: Date): void => {
    const formattedTime = this.getFormattedTime(date);
    this.clockContainer.innerHTML = formattedTime;
  }

  private showCurrentTime = (): void => {
    const currentTime = this.getCurrentTime();
    this.updateTimeDisplay(currentTime);
  }

  start = (): void => {
    this.showCurrentTime();
    // update the time every second
    setInterval(this.showCurrentTime, 1000);  
  }
}

const onLoad = (): void => {
  const clockContainer = document.getElementById('clock');

  const errorLogger = new ErrorLogger();
  if (!clockContainer) {
    errorLogger.logError('Container for clock not found');
    return;
  }

  const clock = new Clock(clockContainer);
  clock.start();
}

document.body.onload = onLoad;