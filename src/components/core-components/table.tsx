import React from 'react';
import styled from 'styled-components';
import Form from 'react-bootstrap/Form';
import { FormattedEntity } from '../users/users-types';
import { sortUsers } from '../helpers';

const Table = styled.table`
	width: 100%;
	margin-bottom: 10px;

	& th {
		font-family: arial, sans-serif;
		font-weight: 600;
		font-size: 17px;
	}

	& th, & td {
		padding: 10px;
	}

	& td {
		font-family: arial, sans-serif;
		font-weight: 300;
		font-size: 15px;
	}
`;

const TBodyRow = styled.tr`
	&:not(:last-child) {
		border-bottom: 1px lightgray solid;
	}
`;

const SortingTH = styled.th`
	cursor: pointer;

	& img {
		height: 8px;
	}
`;

const TDCheckbox = styled.td`
	width: 50px;

	& .checkbox {
		display: flex;
		justify-content: center;
	}
`;

interface Props {
	data: FormattedEntity[],
	columns: string[],
}

function CoreTable({ data, columns }: Props) {
	const [tableData, setTableData] = React.useState<FormattedEntity[]>(data);
	const [order, setOrder] = React.useState<string>('');

	console.debug(data);

	React.useEffect(() => {
		setTableData([...data]);
	}, [data]);

	function handleClickHeader(
		e: React.MouseEvent<HTMLTableHeaderCellElement, MouseEvent>,
		column: string
	) {
		e.preventDefault();
		const newOrder: string = order === 'asc' ? 'desc' : 'asc';
		const sortedTableDatasortUsers: FormattedEntity[] = sortUsers(tableData, column.toLowerCase(), newOrder);
		setOrder(newOrder);
		setTableData([...sortedTableDatasortUsers]);
	}

	return (
		<div>
			<Table>
				<thead>
					<tr>
						<th></th>
						{columns.map((column, index) => {
							return (
								<SortingTH key={index} onClick={(e) => handleClickHeader(e, column)}>
									{column} <img alt="sort-arrow-icon" src="/sort-arrows.svg" />
								</SortingTH>
							);
						})}
					</tr>
				</thead>
				<tbody>
					{
						tableData.map((entity, index) => {
							return (
								<TBodyRow key={`${index}-${entity.age}`}>
									<TDCheckbox><Form.Check className="checkbox" /></TDCheckbox>
									<td>{entity.name}</td>
									<td>{entity.age}</td>
								</TBodyRow>
							);
						})
					}
				</tbody>
			</Table>
		</div>
	);
}

export default CoreTable;