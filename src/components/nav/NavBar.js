import { Link, useNavigate } from "react-router-dom"


export const NavBar = () => {
    const navigate = useNavigate()

    return (
        <>
            
            <ul className="w-44 relative bg-slate-700 rounded-md float-left flex flex-col mt-2 ml-2 space-y-2">
                <li className="cursor-pointer text-white text-2xl hover:bg-sky-600 rounded-md container pl-2">
                    <Link to="/">My Vibes</Link>
                </li>
                <li className="cursor-pointer text-white text-2xl hover:bg-sky-600 rounded-md container pl-2">
                    <Link to="/otherPlaylists">Explore Vibes</Link>
                </li>
                <li className="cursor-pointer text-white text-2xl hover:bg-sky-600 rounded-md container pl-2">
                    <Link to="/createPlaylist">Create Vibes</Link>
                </li>
                <li className="cursor-pointer text-white text-2xl hover:bg-sky-600 rounded-md container pl-2">
                    <Link to="/newReleases">New Releases</Link>
                </li>
                <li className="cursor-pointer text-white text-2xl hover:bg-sky-600 rounded-md container pl-2">
                    <Link to="/browse">Browse</Link>
                </li>
                <li className="cursor-pointer text-white text-2xl hover:bg-sky-600 rounded-md container pl-2">
                    <Link to="/search">Search</Link>
                </li>
                {
                    localStorage.getItem("spotify_user")
                        ? <li className="cursor-pointer text-white text-2xl hover:bg-sky-600 rounded-md container pl-2">
                            <Link to="" onClick={() => {
                                localStorage.removeItem("spotify_user")
                                navigate("/", { replace: true })
                            }}>Logout</Link>
                        </li>
                        : ""
                }
            </ul>
        </>
    )
}

