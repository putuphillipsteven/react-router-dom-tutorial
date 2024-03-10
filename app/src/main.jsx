import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import './index.css';
import { Root, loader as rootLoader, action as rootAction } from './routes/root/container';
import ErrorPage from './pages/error-pages/container';
import { Contact, loader as contactLoader } from './routes/contacts/container';
import { EditContact, action as editAction } from './routes/edit/container';

const router = createBrowserRouter([
	{
		path: '/',
		element: <Root />,
		errorElement: <ErrorPage />,
		loader: rootLoader,
		action: rootAction,
		children: [
			{
				path: '/contacts/:contactId',
				element: <Contact />,
				loader: contactLoader,
			},
			{
				path: '/contacts/:contactId/edit',
				element: <EditContact />,
				loader: contactLoader,
				action: editAction,
			},
		],
	},
]);

ReactDOM.createRoot(document.getElementById('root')).render(
	<React.StrictMode>
		<RouterProvider router={router} />;
	</React.StrictMode>,
);
