const NowPlaying = props => {
  if (props.selected) {
    return(
      <div className='track-details'>
        <h2>Now Playing:</h2>
        <p>Title: {props.selected.title}</p>
        <p>Artist: {props.selected.artist}</p>
      </div>
    );
  }
};

export default NowPlaying;