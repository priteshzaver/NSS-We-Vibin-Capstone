export const millisecondsToRuntime = (milliseconds) => {
    function padTo2Digits(num) {
        return num.toString().padStart(2, '0');
    }
    const minutes = Math.floor(milliseconds / 60000);
    const seconds = Math.round((milliseconds % 60000) / 1000);

    return seconds === 60
        ? `${minutes + 1}:00`
        : `${minutes}:${padTo2Digits(seconds)}`;

}