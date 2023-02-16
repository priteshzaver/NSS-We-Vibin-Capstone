export const NewAlbumSongs = ({song}) => {
    function padTo2Digits(num) {
        return num.toString().padStart(2, '0');
    }
    const convertMsToMinutesSeconds = (milliseconds) => {
        const minutes = Math.floor(milliseconds / 60000);
        const seconds = Math.round((milliseconds % 60000) / 1000);

        return seconds === 60
            ? `${minutes + 1}:00`
            : `${minutes}:${padTo2Digits(seconds)}`;
    }
    const convertedDuration = convertMsToMinutesSeconds(song.duration_ms)
    return <div className="grid grid-cols-4">
    <p className="col-span-1">PLAY</p>
    <p className="col-span-2">{song.name}</p>
    <p>{convertedDuration}</p>
    </div>
}