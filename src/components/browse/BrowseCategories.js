import { Link } from "react-router-dom"

export const BrowseCategories = ({ category }) => {
    return <section className="bg-white bg-opacity-40 rounded shadow-lg shadow-emerald-400 text-white border-2 border-opacity-30 mx-2 my-2 grid justify-items-center items-center">
        <Link to={`/browse/${category.id}/playlists`}>
                    <div className="ml-2 text-xl">
                        {category.name}
                    </div>
                    <img src={category.icons[0].url} />
                </Link>
    </section>
}
