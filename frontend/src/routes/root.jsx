// src/routes/root.jsx
import React from "react";
import { Fragment } from "react";
import NoteForm from "../components/notes/NoteForm";
import NoteList from "../components/notes/NoteList";

const Root = () => {
  return (
    <Fragment>
      <div id="sidebar">
        {}
        <NoteForm />
      </div>
      <div id="detail">
        <NoteList />
      </div>
    </Fragment>
  );
};

export default Root;
