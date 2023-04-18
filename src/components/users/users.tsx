import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Stack from 'react-bootstrap/Stack';
import Card from 'react-bootstrap/Card';
import Input from '../core-components/input';
import styles from './users.module.css';
import {
	Title,
	SearchWrapper
} from './users-styles';
import { FormattedEntity } from './users-types';
import Table from '../core-components/table';
import FetchUsers from './fetch-users';
import useDebounce from '../custom-hooks/use-debounce';

function validateMinValue(minValue: string, maxValue: string): string {
	if (!minValue?.match(/^\d*$/)) {
		return "Only numbers allowed";
	}
	if (minValue && maxValue && +minValue > +maxValue) {
		return "Min value can not be greater than Max value";	
	}

	return "";
}

function validateMaxValue(maxValue: string): string {
	if (!maxValue?.match(/^\d*$/)) {
		return "Only numbers allowed";
	}

	return "";
}

function Users() {
	const [minValue, setMinValue] = React.useState<string>('');
	const [minValueError, setMinValueError] = React.useState<string>('');
	const [maxValue, setMaxValue] = React.useState<string>('');
	const [maxValueError, setMaxValueError] = React.useState<string>('');
	const [data, setData] = React.useState<FormattedEntity[]>([]);
	const [searchData, setSearchData] = React.useState<FormattedEntity[]>([]);
	const [searchValue, setSearchValue] = React.useState<string>('');
	const debouncedValue: string = useDebounce(searchValue, 800);

	React.useEffect(() => {
		setMinValueError("");
		setMaxValueError("");
		
		if (minValue) {
			setMinValueError(validateMinValue(minValue, maxValue));
		}

		if (maxValue) {
			setMaxValueError(validateMaxValue(maxValue));
		}
	}, [minValue, maxValue]);

	React.useEffect(() => {
		setSearchData([]);
		if (data.length && debouncedValue) {
			const regExp = new RegExp(`${debouncedValue}`, 'gi');
			const result = data.filter((entity) => entity.name.match(regExp));
			console.debug(result);
			setSearchData(result);
		}
	}, [debouncedValue]);

	function handleMinValueChange(e: React.ChangeEvent<HTMLInputElement>) {
		e.preventDefault();
		const { value }: { value: string } = e.target;
		setMinValue(value);
	}

	function handleMaxValueChange(e: React.ChangeEvent<HTMLInputElement>) {
		e.preventDefault();
		const { value }: { value: string } = e.target;
		setMaxValue(value);
	}

	return (
		<div>
			<Container>
				<Row>
					<Title>
						<h2>Users</h2>
					</Title>
				</Row>
			</Container>

			<Container>
				<Row>
					<Col md={4}>
						<Card className={styles['card-wrapper']}>
							<Card.Body>
								<Stack gap={3}>
									<Input
										value={minValue}
										onChange={handleMinValueChange}
										label="Min"
										inputType="text"
										error={minValueError}
									/>
									<Input
										value={maxValue}
										onChange={handleMaxValueChange}
										label="Max"
										inputType="text"
										error={maxValueError}
									/>
									<FetchUsers
										setData={setData}
										setSearchValue={setSearchValue}
										minValue={minValue}
										maxValue={maxValue}
										hasErrors={!!(minValueError || maxValueError)}
									/>
								</Stack>
							</Card.Body>
						</Card>	
					</Col>
					<Col md={8}>
						<Card className={styles['card-wrapper']}>
							<SearchWrapper>
								<Input
									value={searchValue}
									onChange={(e) => setSearchValue(e.target.value)}
									icon="search-icon"
									placeholder="Search Users"
									inputType="text"
								/>
							</SearchWrapper>
							<div>
								<Table data={debouncedValue ? searchData : data} columns={['Name', 'Age']} />
							</div>
						</Card>	
					</Col>
				</Row>
			</Container>
		</div>
	);
}

export default Users; 