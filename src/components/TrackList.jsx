const Tracks = (props) => {
  return (
    <div className="track-list">
      <h2>Track List</h2>
      <ul>
        {props.tracks.map((track) => (
          <li key={track._id}>
            {`${track.title} by ${track.artist}`}
            <br />
            <div className="button-container">
              <button
                onClick={() => {
                  props.updateSelected(track);
                }}
              >
                Play
              </button>
              <button
                onClick={() => {
                  props.updateSelected(track);
                  props.handleFormView(track);
                }}
              >
                Edit
              </button>
              <button
                onClick={() => {
                  props.handleRemoveTrack(track._id);
                }}
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Tracks;
