import React from "react";
import { Fragment } from "react";
import NoteForm from "../components/notes/NoteForm";
import NoteList from "../components/notes/NoteList";
import TagForm from "../components/tags/TagForm"; 
import TagList from "../components/tags/TagList";

/* export const NoteRoot = () => {
  return (
    <Fragment>
      <div id="sidebar">
        <TagForm />
        <NoteForm />
      </div>
      <div id="detail">
        <NoteList />
      </div>
    </Fragment>
  );
}; */

export const TagRoot = () => {
  return (
    <Fragment>
      <div className="tag-root-container">
        <TagForm />
        <TagList />
      </div>
    </Fragment>
  );
};


















/*  import React from "react";
import { Fragment } from "react";
import NoteForm from "../components/notes/NoteForm";
import NoteList from "../components/notes/NoteList";
import TagForm from "../components/tags/TagForm"; 
import TagList from "../components/tags/TagList";

const Root = () => {
  return (
    <Fragment>
      <div id="sidebar">
        <TagForm />
        <NoteForm />
      </div>
      <div id="detail">       
        <NoteList />
        <TagList />
      </div>
    </Fragment>
  );
};

export default Root; 
 */