// main.jsx
import * as React from 'react';
import * as ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { NoteProvider } from './context/NoteContext'; // Import the note context provider
import './index.css';
import NoteForm from './components/notes/NoteForm'; // Import the NoteForm component
import NoteList from './components/notes/NoteList'; // Import the NoteList component
import Root from './routes/root'; // Import the Root component

const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <NoteProvider>
        <Root>
          <NoteForm /> {/* Add the NoteForm component here */}
          <NoteList /> {/* Add the NoteList component here */}
        </Root>
      </NoteProvider>
    ),
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
