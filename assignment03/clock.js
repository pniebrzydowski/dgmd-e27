"use strict";
class ErrorLogger {
    logError(error) {
        alert(error);
    }
}
class Clock {
    constructor(clockContainer) {
        this.getCurrentTime = () => new Date();
        this.getFormattedTime = (date) => {
            const timeString = date.toTimeString();
            const timeStringWithoutTimezone = timeString.substring(0, 8);
            return timeStringWithoutTimezone;
        };
        this.updateTimeDisplay = (date) => {
            const formattedTime = this.getFormattedTime(date);
            this.clockContainer.innerHTML = formattedTime;
        };
        this.showCurrentTime = () => {
            const currentTime = this.getCurrentTime();
            this.updateTimeDisplay(currentTime);
        };
        this.start = () => {
            this.showCurrentTime();
            // update the time every second
            setInterval(this.showCurrentTime, 1000);
        };
        this.clockContainer = clockContainer;
    }
}
const onLoad = () => {
    const clockContainer = document.getElementById('clock');
    const errorLogger = new ErrorLogger();
    if (!clockContainer) {
        errorLogger.logError('Container for clock not found');
        return;
    }
    const clock = new Clock(clockContainer);
    clock.start();
};
document.body.onload = onLoad;
