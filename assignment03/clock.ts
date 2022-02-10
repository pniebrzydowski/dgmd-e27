const logError = (error: string): void => {
  alert(error);
}

const getCurrentTime = (): Date => new Date();

const getFormattedTime = (date: Date): string => {
  const timeString = date.toTimeString();
  const timeStringWithoutTimezone = timeString.substring(0, 8);
  return timeStringWithoutTimezone;
}

const updateTimeDisplay = (date: Date): void => {
  const clockContainer = document.getElementById('clock');
  if (!clockContainer) {
    logError('Clock container not found!')
    return;
  }
  const formattedTime = getFormattedTime(date);
  clockContainer.innerHTML = formattedTime;
}

const showCurrentTime = (): void => {
  const currentTime = getCurrentTime();
  updateTimeDisplay(currentTime);
}

const onLoad = (): void => {
  showCurrentTime();
  // update the time every second
  setInterval(showCurrentTime, 1000);
}

document.body.onload = onLoad;