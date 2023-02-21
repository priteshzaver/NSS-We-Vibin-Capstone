import { useState } from "react";
import { MusicPlayer } from "../musicplayer/MusicPlayer";
import { ApplicationViews } from "./ApplicationViews";

export const MusicContainer = () => {
  const [selectedTrackUri, setSelectedUri] = useState("");

  return (
    <div>
      <div className="px-4 pb-4 h-[calc(91vh-72px)] overflow-y-scroll scrollbar-hide ">
        <ApplicationViews setterFunction={setSelectedUri} />
      </div>
      <div className="fixed h-18 bottom-0 left-0 right-0">
        <MusicPlayer selectedTrackUri={selectedTrackUri} />
      </div>
    </div>
  );
};
