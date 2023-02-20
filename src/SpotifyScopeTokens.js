import { SpotifyAccess } from "./SpotifyAccess"
import apiKeys from "./AccessTokens"
import { useEffect, useState } from "react"
import { WeVibin } from "./WeVibin"

export const SpotifyScopeToken = () => {
    const REDIRECT_URI = "http://localhost:3000"
    const AUTH_ENDPOINT = "https://accounts.spotify.com/authorize"
    const RESPONSE_TYPE = "token"
    const SCOPE = "streaming user-read-email user-read-private user-read-playback-state app-remote-control user-modify-playback-state user-read-currently-playing"

    const [token, setToken] = useState("")

    useEffect(() => {
        const hash = window.location.hash
        let token = window.localStorage.getItem("token")

        if (!token && hash) {
            token = hash.substring(1).split("&").find(elem => elem.startsWith("access_token")).split("=")[1]

            window.location.hash = ""
            window.localStorage.setItem("token", token)
        }
        setToken(token)
    }, [])

    const logout = () => {
        setToken("")
        window.localStorage.removeItem("token")
    }

    return (
        <div >
            <header>
                
                {!token ?
                    <a href={`${AUTH_ENDPOINT}?client_id=${apiKeys.CLIENT_ID}&scope=${SCOPE}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}`} className="text-white">Login
                        to Spotify</a>
                    : <>
                    <SpotifyAccess/>
                    <button className="text-white" onClick={logout}>Logout</button>
                    </>
                }
            </header>
        </div>
    );
}