import { Link, useNavigate } from "react-router-dom"


export const NavBar = () => {
    const navigate = useNavigate()

    return (
        <>
            <h1 className="text-5xl text-white ml-4">We Vibin'</h1>
            <div className="text-3xl text-white ml-4">Share and explore music with your friends</div>
            <ul className="w-44 sticky bg-slate-700 rounded-md float-left flex flex-col mt-2 ml-2 space-y-2">
                <li className="cursor-pointer text-white text-2xl hover:bg-sky-600 rounded-md container pl-2">
                    <Link to="/myPlaylists">My Vibes</Link>
                </li>
                <li className="cursor-pointer text-white text-2xl hover:bg-sky-600 rounded-md container pl-2">
                    <Link to="/otherPlaylists">Explore Vibes</Link>
                </li>
                <li className="cursor-pointer text-white text-2xl hover:bg-sky-600 rounded-md container pl-2">
                    <Link to="/createPlaylist">Create Vibes</Link>
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

