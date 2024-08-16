import { useEffect, useState } from "react";

import * as trackService from "./services/trackService";
import './App.css';
import TrackForm from "./components/TrackForm";
import TrackList from "./components/TrackList";
import NowPlaying from "./components/NowPlaying";

const App = () => {
  const [tracks, setTracks] = useState([]);
  const [selected, setSelected] = useState(null);
  const [isFormOpen, setIsFormOpen] = useState(false);


  const handleAddTrack = async (formData) => {
    try {
      const newTrack = await trackService.create(formData);
      setTracks([newTrack, ...tracks]);
    } catch (error) {
      console.log(error);
    }
  };

  const handleFormView = (track) => {
    if (!track.title) setSelected(null);
    setIsFormOpen(!isFormOpen);
  };

 
  const updateSelected = (track) => {
    setSelected(track);
    setIsFormOpen(false);
  };

 
  const handleUpdateTrack = async (formData, trackId) => {
    try {
      const updatedTrack = await trackService.updateTrack(formData, trackId);

      const updatedTrackList = tracks.map((track) =>
        track._id !== updatedTrack._id ? track : updatedTrack
      );
      setTracks(updatedTrackList);
      setSelected(null);
      setIsFormOpen(false);
    } 
    catch (error) {
      console.log(error);
    }
  };

  const handleRemoveTrack = async (trackId) => {
  
    try {
      const deletedTrack = await trackService.deleteTrack(trackId);

      if (deletedTrack.error) {
        throw new Error(deletedTrack.error);
      }
      setTracks(tracks.filter((track) => track._id !== deletedTrack._id));
      setSelected(null);
      setIsFormOpen(false);
    } 
    catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const fetchTrack = async () => {
      try {
        const data = await trackService.index();
        setTracks(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchTrack();
  }, []);




  return (
    <div className="app">
      <header>
        <button onClick={handleFormView}>
          {isFormOpen ? "Close " : "Add new Track"}
        </button>
      </header>
      <TrackList
        tracks={tracks}
        updateSelected={updateSelected}
        handleFormView={handleFormView}
        handleRemoveTrack={handleRemoveTrack}
        isFormOpen={isFormOpen}
        handleUpdateTrack={handleUpdateTrack}
      />
      {isFormOpen ? (
        <TrackForm
          handleAddTrack={handleAddTrack}
          selected={selected}
          handleUpdateTrack={handleUpdateTrack}
        />
      ) : (
        <NowPlaying selected={selected} />
      )}
    </div>
  );
};

export default App;