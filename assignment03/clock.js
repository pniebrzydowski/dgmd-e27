"use strict";
const logError = (error) => {
    alert(error);
};
const getCurrentTime = () => new Date();
const getFormattedTime = (date) => {
    const timeString = date.toTimeString();
    const timeStringWithoutTimezone = timeString.substring(0, 8);
    return timeStringWithoutTimezone;
};
const updateTimeDisplay = (date) => {
    const clockContainer = document.getElementById('clock');
    if (!clockContainer) {
        logError('Clock container not found!');
        return;
    }
    const formattedTime = getFormattedTime(date);
    clockContainer.innerHTML = formattedTime;
};
const showCurrentTime = () => {
    const currentTime = getCurrentTime();
    updateTimeDisplay(currentTime);
};
const onLoad = () => {
    showCurrentTime();
    // update the time every second
    setInterval(showCurrentTime, 1000);
};
document.body.onload = onLoad;
