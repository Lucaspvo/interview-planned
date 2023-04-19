import React from 'react';
import {
	ResponseData,
	EntityUser,
	FormattedEntity,
	FetchUsersProps
} from './users-types';
import { RetrieveButtonWrapper } from './users-styles';
import Button from 'react-bootstrap/Button';
import { Context } from '../../context';
import { sortUsers } from '../helpers';

function formatUsers(users: EntityUser[]): FormattedEntity[] {
	return users.map((user) => {
		return {
			name: `${user.name.firstName} ${user.name.lastName}`,
			age: user.age,
		};
	});
}

function filterUsers(users: EntityUser[], minValue: string, maxValue: string): EntityUser[] {
	const tempMinValue: string = minValue ? minValue : '0';
	const tempMaxValue: string = maxValue ? maxValue :	 '200';

	return users.filter((user) => {
		return user.age >= parseInt(tempMinValue) && user.age <= parseInt(tempMaxValue);
	});
}

function FetchUsers({ setData, setSearchValue, minValue, maxValue, hasErrors }: FetchUsersProps) {
	const { apiUrl } = React.useContext(Context);

	const fetchUsers = React.useCallback(async () => {
		let responseKids: ResponseData = await fetch(`${apiUrl}/users/kids`)
			.then((response) => response.json());
		let responseAdults: ResponseData = await fetch(`${apiUrl}/users/adults`)
			.then((response) => response.json());
		let responseSeniors: EntityUser[] = await fetch(`${apiUrl}/users/seniors`)
			.then((response) => response.json());

		let users: EntityUser[] = [
			...responseKids.data,
			...responseAdults.data,
			...responseSeniors
		];

		users = filterUsers(users, minValue, maxValue);
		let formattedUsers: FormattedEntity[] = formatUsers(users);
		formattedUsers = sortUsers(formattedUsers, 'age', 'desc');
		formattedUsers = sortUsers(formattedUsers, 'name', 'asc');
		setData(formattedUsers);
	}, [setData, minValue, maxValue, apiUrl]);

	const handleRetrieveUsersClick = React.useCallback((e) => {
		e.preventDefault();
		setSearchValue('');

		try {
			fetchUsers();
		} catch (error) {
			// Handle error here
			console.error(error);
		}
	}, [fetchUsers, setSearchValue]);

	return (
		<RetrieveButtonWrapper>
			<Button
				disabled={hasErrors}
				onClick={handleRetrieveUsersClick}
				variant="success"
			>
				Retrieve users
			</Button>
		</RetrieveButtonWrapper>
	);
}

export default FetchUsers;