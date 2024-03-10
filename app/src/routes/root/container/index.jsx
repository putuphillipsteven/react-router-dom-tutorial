import { Link, Outlet, useLoaderData, Form, redirect } from 'react-router-dom';
import { getContacts, createContact } from '../../../utils/contact';
import { Fragment } from 'react';

export const loader = async () => {
	const contacts = await getContacts();
	return { contacts };
};

export const action = async () => {
	const contact = await createContact();
	return redirect(`/contacts/${contact.id}/edit`);
};

export const Root = () => {
	const { contacts } = useLoaderData();

	const contactList = contacts?.length ? (
		<ul>
			{contacts?.map((contact) => {
				return (
					<li key={contact?.id}>
						<Link to={`contacts/${contact?.id}`}>
							{contact?.first || contact?.last ? (
								<Fragment>
									{contact?.first} {contact?.last}
								</Fragment>
							) : (
								<Fragment>
									<i>No Name</i>
								</Fragment>
							)}
							{contact?.favorite && <span>★</span>}
						</Link>
					</li>
				);
			})}
		</ul>
	) : (
		<p>
			<i>No contacts</i>
		</p>
	);
	return (
		<>
			<div id='sidebar'>
				<h1>React Router Contacts</h1>
				<div>
					<form id='search-form' role='search'>
						<input
							id='q'
							aria-label='Search contacts'
							placeholder='Search'
							type='search'
							name='q'
						/>
						<div id='search-spinner' aria-hidden hidden={true} />
						<div className='sr-only' aria-live='polite'></div>
					</form>
					<Form method='post'>
						<button type='submit'>New</button>
					</Form>
				</div>
				<nav>{contactList}</nav>
			</div>
			<div id='detail'>
				<Outlet />
			</div>
		</>
	);
};
