export const EachCategorySong = ({song}) => {
    return <section className="bg-white bg-opacity-40 rounded shadow-lg shadow-emerald-400 text-white border-2 border-opacity-30 mx-2 my-2 grid justify-items-center items-center">
        <div>{song.name}</div>
    </section>
}