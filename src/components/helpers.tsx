import { FormattedEntity } from './users/users-types';

export function sortUsers(users: FormattedEntity[], property: string, order?: string): FormattedEntity[] {
	return users.sort((a: FormattedEntity, b: FormattedEntity): number => {
		if (order === 'desc') {
			return a[property] <= b[property] ? 1 : -1;
		}
		return a[property] <= b[property] ? -1 : 1;
	});
}