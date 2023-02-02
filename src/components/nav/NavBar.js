import { Link, useNavigate } from "react-router-dom"
import "./NavBar.css"

export const NavBar = () => {
    const navigate = useNavigate()

    return (
        <ul className="navbar">
            <li className="navbar__item active">
                <Link className="navbar__link" to="/myPlaylists">My Playlists</Link>
            </li>
            <li className="navbar__item active">
                <Link className="navbar__link" to="/otherPlaylists">Other Playlists</Link>
            </li>
            <li className="navbar__item active">
                <Link className="navbar__link" to="/createPlaylist">Create Playlist</Link>
            </li>
            <li className="navbar__item active">
                <Link className="navbar__link" to="/search">Search</Link>
            </li>
            {
                localStorage.getItem("spotify_user")
                    ? <li className="navbar__item navbar__logout">
                        <Link className="navbar__link" to="" onClick={() => {
                            localStorage.removeItem("spotify_user")
                            navigate("/", {replace: true})
                        }}>Logout</Link>
                    </li>
                    : ""
            }
        </ul>
    )
}