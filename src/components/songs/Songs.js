export const Songs = ({songName, songId, songArtist}) => {
    const saveSong = () => {
        return <button
            onClick={() => {
                fetch(`http://localhost:8088/playlistSongs`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        songName: songName,
                        songId: songId
                    })
                })
                .then(response => response.json())
                .then(() => {
                    alert(`Your song was successfully saved`)
                })
            }}>
                Save Song
            </button>
    }
    
    return (
        <section>
            <header>{songName}</header>
            <div>{songArtist}</div>
            <footer>{saveSong()}</footer>
        </section>
    )
}