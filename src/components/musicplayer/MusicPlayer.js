import { useEffect, useState } from "react";
import SpotifyPlayer from "react-spotify-web-playback";

export const MusicPlayer = ({ selectedTrackUri }) => {
  const [play, setPlay] = useState(false);
  let token = window.localStorage.getItem("token");

  useEffect(() => {
    setPlay(true);
  }, [selectedTrackUri]);

  if (!token) return null;

  return (
    <SpotifyPlayer
      token={token}
      showSaveIcon
      callback={(state) => !state.isPlaying && setPlay(false)}
      play={play}
      uris={selectedTrackUri ? selectedTrackUri : []}
      styles={{
        activeColor: "#fff",
        bgColor: "#333",
        color: "#fff",
        loaderColor: "#fff",
        sliderColor: "#1cb954",
        trackArtistColor: "#ccc",
        trackNameColor: "#fff",
        height: "55px",
      }}
    />
  );
};
