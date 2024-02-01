import React, { useContext } from "react";
import noteContext from "../Context/Notes/notecontext";

const NoteItems = (props) => {
  const { deletenote } = useContext(noteContext);

  // Logic for Deleting a note
  // const handledelete = (_id)=>{
  //   deletenote(note._id)
  // }

  const { note, updatenotes, showAlert } = props;
  return (
    <>
      <div className="col-md-3">
        <div className="card my-4">
          <div className="flex align-item-center">
            <i
              className="fas fa-edit mx-2 pm-3"
              onClick={() => {
                updatenotes(note);
              }}
            ></i>
            <i
              className="fas fa-trash mx-2"
              onClick={() => {
                deletenote(note._id);
                showAlert("Note Deleted Successfully", "success");
              }}
            ></i>
            {/* <i class="fa-thin fa-pen-to-square mx-2" style={{Color: "#42bdae;"}}></i> */}
            {/* <i class="fa-thin fa-trash mx-2" style={{Color: "#42bdae;"}}></i> */}
          </div>
          <div className="card-body">
            <h5 className="card-title">{note.title}</h5>
            <h6 className="card-subtitle mb-2 text-muted">
              {note.description}
            </h6>
            <p className="card-text">{note.tags}</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default NoteItems;
