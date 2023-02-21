import { Link } from "react-router-dom"

export const EachPlaylist = ({ playlist }) => {
    return (
      <section className="bg-slate-300 bg-opacity-40 rounded shadow-lg shadow-emerald-400 text-white border-2 border-opacity-30 mx-1 my-1">
        <Link to={`/browse/categories/playlists/${playlist.id}/songs`}>
          <div className="flex flex-col items-center">
            <div className="text-lg">{playlist.name}</div>
            <img
              src={playlist.images[0].url}
              alt="Playlist Photo"
              className="w-20"
            />
          </div>
          <div className="my-1 mx-2 break-words line-clamp-2">
            {playlist.description}
          </div>
        </Link>
      </section>
    );
}