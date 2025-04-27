import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import Applicants from './Applicants.jsx';
import Form from './Form.jsx';
import Instructions from './Instructions.jsx';
import ErrorPage from './ErrorPage.jsx';
import StudentDetails from './StudentDetails.jsx';
import Housing from './Housing.jsx'; // Import the Housing component

const router = createBrowserRouter([
  {
    path: '/',
    element: <Applicants />,
    errorElement: <ErrorPage />,
  },
  {
    path: '/form',
    element: <Form />,
    errorElement: <ErrorPage />,
  },
  {
    path: '/instructions',
    element: <Instructions />,
    errorElement: <ErrorPage />,
  },
  {
    path: '/students/:id', // Route for student details
    element: <StudentDetails />,
    errorElement: <ErrorPage />,
  },
  {
    path: '/housing', // New route for Housing
    element: <Housing />,
    errorElement: <ErrorPage />,
  },
]);

const root = createRoot(document.getElementById('root'));
root.render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
