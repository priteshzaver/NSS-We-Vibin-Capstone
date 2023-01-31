import './App.css';
import { createContext, useEffect, useState } from 'react';
import { WeVibin } from './WeVibin';

const CLIENT_ID = "85455d359c974304b0a53b4c2a461635"
const CLIENT_SECRET = "54222d53b5a4489999fd67c08863fefd"
const TokenContext = createContext()

export const SpotifyAccess = () => {
  const [accessToken, setAccessToken] = useState("")

    useEffect(() => {
        const authParameters = {
            method: "POST",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            },
            body: "grant_type=client_credentials&client_id=" + CLIENT_ID + "&client_secret=" + CLIENT_SECRET
        }

        fetch("https://accounts.spotify.com/api/token", authParameters)
            .then(response => response.json())
            .then(data => setAccessToken(data.access_token))
    }, [])


    return (
        <TokenContext.Provider value={accessToken}>
        <div className="App">
            <header className="App-header">
                <h1>We Vibin'</h1>
                <WeVibin />
            </header>
        </div>
        </TokenContext.Provider>
    )
}
export default TokenContext
