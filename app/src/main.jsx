import React, { Fragment } from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import './index.css';
import { Root, loader as rootLoader, action as rootAction } from './routes/root/container';
import ErrorPage from './pages/error-pages/container';
import {
	Contact,
	loader as contactLoader,
	action as contactAction,
} from './routes/contacts/container';
import { EditContact, action as editAction } from './routes/edit/container';
import { action as destroyAction } from './routes/destroy/container';
import { Index } from './routes';

const router = createBrowserRouter([
	{
		path: '/',
		element: <Root />,
		errorElement: <ErrorPage />,
		loader: rootLoader,
		action: rootAction,
		children: [
			{
				errorElement: <ErrorPage />,
				children: [
					{ index: true, element: <Index /> },
					{
						path: '/contacts/:contactId',
						element: <Contact />,
						loader: contactLoader,
						action: contactAction,
					},
					{
						path: '/contacts/:contactId/edit',
						element: <EditContact />,
						loader: contactLoader,
						action: editAction,
					},
					{
						path: '/contacts/:contactId/destroy',
						action: destroyAction,
						errorElement: <Fragment>Opps! There was an error.</Fragment>,
					},
				],
			},
		],
	},
]);

ReactDOM.createRoot(document.getElementById('root')).render(
	<React.StrictMode>
		<RouterProvider router={router} />;
	</React.StrictMode>,
);
