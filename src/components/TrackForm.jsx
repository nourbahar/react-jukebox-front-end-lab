import { useState } from "react";

const TrackForm = props => {
  const initialState = {
    title: "",
    artist: "",
  };

  const [formData, setFormData] = useState( props.selected ? props.selected : initialState);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
   // console.log("Form Data:", formData);
    if (props.selected) {
     // console.log("Updating track with ID:", props.selected._id);
      props.handleUpdateTrack(formData, props.selected._id);
    } else {
     // console.log("Adding new track");
      props.handleAddTrack(formData);
    }
  };
  

  return (
   <>
      <form onSubmit={handleSubmit}>
        <label htmlFor="title">Title:</label>
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          required
        />
        <label htmlFor="artist">Artist: </label>
        <input
          type="text"
          name="artist"
          value={formData.artist}
          onChange={handleChange}
          required
        />
        <button type="submit">Submit</button>
        
        </form>
 </>
  );
};

export default TrackForm;