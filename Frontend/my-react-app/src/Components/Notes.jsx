import React, { useState, useContext, useEffect, useRef } from "react";
import noteContext from "../Context/Notes/notecontext";
import NoteItems from "./NoteItems";
import { useNavigate } from "react-router-dom";

const Notes = (props) => {
  const { showAlert } = props;
  const value = useContext(noteContext);
  const { note, getnote, updatenote } = value;
  let Navigate = useNavigate();
  useEffect(() => {
    if (localStorage.getItem("token")) {
      getnote();
    } else {
      showAlert("Please Login to access your Notes", "danger");
      Navigate("/login");
    }
    // eslint-disable-next-line
  }, []);

  const ref = useRef(null);
  const refclose = useRef(null);

  const [notes, setNote] = useState({
    id: "",
    etitle: "",
    edescription: "",
    etags: "",
  });

  const updatenotes = (updatenote) => {
    ref.current.click();
    setNote({
      id: updatenote._id,
      etitle: updatenote.title,
      edescription: updatenote.description,
      etags: updatenote.tags,
    });
  };
  // addnote function
  const updateclick = (e) => {
    updatenote(notes.id, notes.etitle, notes.edescription, notes.etags);
    e.preventDefault();
    refclose.current.click();
    setNote({ etitle: "", edescription: "", etags: "" });
    showAlert("Note has been Updated", "success");
  };
  // onchange functio
  const handlechange = (e) => {
    e.preventDefault();
    setNote({ ...notes, [e.target.name]: e.target.value });
  };
  return (
    <>
      {/* Creating a modal form to update the notes */}
      <div className="container">
        <button
          type="button"
          className="btn btn-primary d-none"
          data-bs-toggle="modal"
          data-bs-target="#exampleModal"
          ref={ref}
        >
          Launch demo modal
        </button>

        <div
          className="modal fade"
          id="exampleModal"
          tabIndex="-1"
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h1 className="modal-title fs-5" id="exampleModalLabel">
                  Note Update
                </h1>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <div className="modal-body">
                <label htmlFor="etitle" className="form-label">
                  Update Title
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="etitle"
                  name="etitle"
                  value={note.etitle}
                  placeholder="Title"
                  onChange={handlechange}
                  minLength={3}
                  required
                />
              </div>
              <div className="mb-3 mx-2">
                <label htmlFor="edescription" className="form-label mx-2">
                  Update Description
                </label>
                <textarea
                  className="form-control"
                  id="edescription"
                  name="edescription"
                  value={note.edescription}
                  rows="3"
                  onChange={handlechange}
                  minLength={5}
                  required
                ></textarea>
                <div className="mb-3 mx-2">
                  <label htmlFor="etags" className="form-label my-2">
                    Update Tag
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="etags"
                    name="etags"
                    value={note.etags}
                    placeholder="Tag"
                    onChange={handlechange}
                    minLength={3}
                    required
                  />
                </div>
              </div>
              <div className="modal-footer">
                <button
                  ref={refclose}
                  type="button"
                  className="btn btn-secondary"
                  data-bs-dismiss="modal"
                >
                  Close
                </button>
                <button
                  onClick={updateclick}
                  type="button"
                  className="btn btn-primary"
                >
                  Update Note
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="row my-3">
        <h1 className="text-center">Your Notes</h1>
        <div className="container mx-3 text-white">
          {note.length === 0 && "No notes to display"}
        </div>
        {note.map((note) => {
          return (
            <NoteItems
              key={note._id}
              updatenotes={updatenotes}
              note={note}
              showAlert={showAlert}
            />
          );
        })}
      </div>
    </>
  );
};

export default Notes;
