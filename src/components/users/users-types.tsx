export type ResponseData = {
	data: EntityUser[],
}

export interface FetchUsersProps {
	setData: (list: FormattedEntity[]) => void,
	setSearchValue: (value: string) => void,
	minValue: string,
	maxValue: string,
	hasErrors: boolean,
}

export interface NameEntity {
	firstName: string,
	lastName: string,
}

export interface EntityUser {
	age: number,
	country: string,
	email: string,
	name: NameEntity,
}

export interface FormattedEntity {
	[key: string]: string | number,
	name: string,
	age: number,
}