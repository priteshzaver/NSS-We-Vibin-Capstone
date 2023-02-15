export const NewSongs = ({ songObject }) => {


    return <section className="bg-white bg-opacity-40 rounded shadow-lg shadow-emerald-400 text-white border-2 border-opacity-30 mx-2 my-2 grid grid-cols-3 justify-items-center items-center">
        <div className="text-xl">{songObject.name}</div>
        <div>
            <div className="text-lg">{songObject.artists[0].name}</div>
            <div className="text-lg">{songObject.release_date}</div>
        </div>
        <img src={songObject.images[0].url} alt="Album photo" className="w-20 rounded-md my-1" />
    </section>
}