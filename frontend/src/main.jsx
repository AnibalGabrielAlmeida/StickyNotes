import * as React from 'react';
import * as ReactDOM from 'react-dom/client';
import { createBrowserRouter, Route, Routes, RouterProvider } from 'react-router-dom';
import { NoteProvider } from './context/NoteContext';
import { TagProvider } from './context/TagContext';
import './routes/root.css';
import NavBar from './components/notes/NavBar';
import {  TagRoot } from './routes/root';
import NoteForm from './components/notes/NoteForm';
import TagForm from './components/tags/TagForm';
import TagList from './components/tags/TagList';
import NoteList from './components/notes/NoteList';

const App = () => {
  return (
    
    <NoteProvider >
      <TagProvider>
        <NavBar />
        <Routes>
          <Route path="/" element={<NoteList />} />
          <Route path="/create" element={<NoteForm />} />
          <Route path="/tags" element={<TagRoot />} />
          <Route path="/archived" element={<NoteList viewMode="archived" />} />
        </Routes>
      </TagProvider>
    </NoteProvider>
    
  );
};

const router = createBrowserRouter([
  {
    path: '*',
    element: <App />,
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 /* import * as React from 'react';
import * as ReactDOM from 'react-dom/client';
import { createBrowserRouter, Route, Routes, RouterProvider } from 'react-router-dom';
import { NoteProvider } from './context/NoteContext';
import { TagProvider } from './context/TagContext';
import './index.css';
import NavBar from './components/notes/NavBar';
import Root from './routes/root';
import NoteForm from './components/notes/NoteForm';
import NoteList from './components/notes/NoteList';
import TagForm from './components/tags/TagForm';
import TagList from './components/tags/TagList';

const App = () => {
  return (
    <NoteProvider>
      <TagProvider>
      <NavBar />
      
      <Routes>
  <Route path="/" element={<Root />} />
  <Route path="/create" element={<Root><NoteForm /></Root>} />
  <Route path="/tags" element={<Root><TagForm /><TagList /></Root>} />
</Routes>


      </TagProvider>
    </NoteProvider>
  );
};

const router = createBrowserRouter([
  {
    path: '*',
    element: <App />,
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
  */