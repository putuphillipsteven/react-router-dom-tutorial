import {
	Link,
	Outlet,
	useLoaderData,
	Form,
	redirect,
	NavLink,
	useNavigation,
	useSubmit,
} from 'react-router-dom';
import { getContacts, createContact } from '../../../utils/contact';
import { Fragment, useEffect, useState } from 'react';

export const loader = async ({ request }) => {
	const url = new URL(request.url);
	const q = url.searchParams.get('q') || '';
	const contacts = await getContacts(q);
	return { contacts, q };
};

export const action = async () => {
	const contact = await createContact();
	return redirect(`/contacts/${contact.id}/edit`);
};

export const Root = () => {
	const { contacts, q } = useLoaderData();
	const [query, setQuery] = useState(q);
	const navigation = useNavigation();
	const submit = useSubmit();

	useEffect(() => {
		setQuery(q);
	}, [q]);

	const contactList = contacts?.length ? (
		<ul>
			{contacts?.map((contact) => {
				return (
					<li key={contact?.id}>
						<NavLink
							to={`contacts/${contact?.id}`}
							className={({ isActive, isPending }) =>
								isActive ? 'active' : isPending ? 'pending' : ''
							}
						>
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
						</NavLink>
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
					<Form id='search-form' role='search'>
						<input
							id='q'
							aria-label='Search contacts'
							placeholder='Search'
							type='search'
							name='q'
							value={query}
							onChange={(e) => {
								submit(e.currentTarget.form);
							}}
						/>
						<div id='search-spinner' aria-hidden hidden={true} />
						<div className='sr-only' aria-live='polite'></div>
					</Form>
					<Form method='post'>
						<button type='submit'>New</button>
					</Form>
				</div>
				<nav>{contactList}</nav>
			</div>
			{console.log('navigation', navigation)}
			<div id='detail' className={navigation.state === 'loading' ? 'loading' : ''}>
				<Outlet />
			</div>
		</>
	);
};
