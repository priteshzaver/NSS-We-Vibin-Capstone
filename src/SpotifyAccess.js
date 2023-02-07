import './App.css';
import { createContext, useEffect, useState } from 'react';
import { WeVibin } from './WeVibin';
import apiKeys from "./AccessTokens"

const TokenContext = createContext()

export const SpotifyAccess = () => {
  const [accessToken, setAccessToken] = useState("")

    useEffect(() => {
        const authParameters = {
            method: "POST",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            },
            body: "grant_type=client_credentials&client_id=" + apiKeys.CLIENT_ID + "&client_secret=" + apiKeys.CLIENT_SECRET
        }

        fetch("https://accounts.spotify.com/api/token", authParameters)
            .then(response => response.json())
            .then(data => setAccessToken(data.access_token))
    }, [])


    return (
        <TokenContext.Provider value={accessToken}>
            <WeVibin />
        </TokenContext.Provider>
    )
}
export default TokenContext
