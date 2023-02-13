import { useState } from "react"
import { MusicPlayer } from "../musicplayer/MusicPlayer"

import { SongSearch } from "./SongSearch"


export const MusicContainer = () => {
    const [selectedTrackUri, setSelectedUri] = useState("")

    return <div className="grid">
        <SongSearch setterFunction={setSelectedUri}/>
        <div className="mx-4 mt-5">
        <MusicPlayer selectedTrackUri={selectedTrackUri}/>

        </div>
        </div>
}