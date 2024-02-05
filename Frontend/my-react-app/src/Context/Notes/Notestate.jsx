import React, { useState } from "react";
import NoteContext from "./notecontext";
import { jwtDecode } from "jwt-decode";

const Notestate = (props) => {
  const host = "https://todo-api-flax.vercel.app";
  const notesInitials = [];
  const [note, setNote] = useState(notesInitials);

  // Fetching all user notes functionality
  const getnote = async () => {
    // API call
    const response = await fetch(`${host}/api/notes/fetchnotes`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token"),
      },
    });
    const json = await response.json();
    setNote(json);
  };
  // Adding functionality of the notes
  const addnote = async (title, description, tags, user_id) => {
    const token = localStorage.getItem("token");
    const decoded = jwtDecode(token);
    user_id = decoded.user.id;
    const data = user_id;
    console.log(data);
    // API call
    const response = await fetch(`${host}/api/notes/addnotes`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token"),
      },
      body: JSON.stringify({ title, description, tags, user_id }),
    });
    const notes = await response.json();
    setNote(note.concat(notes));
  };

  // Deleting functionality of the notes
  const deletenote = async (id) => {
    // API call
    const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token"),
      },
    });
    await response.json();
    const Newnote = note.filter((note) => {
      return note._id !== id;
    });
    setNote(Newnote);
  };
  // updating functionality of the notes
  const updatenote = async (id, title, description, tags, user_id) => {
    // API call
    const response = await fetch(`${host}/api/notes/updatenotes/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token"),
      },
      body: JSON.stringify({ title, description, tags, user_id }),
    });
    await response.json();
    // logic for the client
    let newNotes = JSON.parse(JSON.stringify(note));
    for (let index = 0; index < newNotes.length; index++) {
      const element = newNotes[index];
      if (element._id === id) {
        newNotes[index].title = title;
        newNotes[index].description = description;
        newNotes[index].tags = tags;
        break;
      }
    }
    setNote(newNotes);
  };
  return (
    <NoteContext.Provider
      value={{ note, getnote, addnote, deletenote, updatenote }}
    >
      {props.children}
    </NoteContext.Provider>
  );
};
export default Notestate;
