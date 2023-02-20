import { useState } from "react";
import { MusicPlayer } from "../musicplayer/MusicPlayer";
import { ApplicationViews } from "../views/ApplicationViews";

export const MusicContainer = () => {
  const [selectedTrackUri, setSelectedUri] = useState("");

  return (
    <div className="grid">
      <ApplicationViews setterFunction={setSelectedUri} />
      <div className="mx-4 mt-5">
        <MusicPlayer selectedTrackUri={selectedTrackUri} />
      </div>
    </div>
  );
};
