import styled from 'styled-components';

export const Title = styled.div`
	margin-bottom: 20px;

	& h2 {
		margin: 0;
		font-family: sans-serif;
		font-weight: 500;
		font-size: 30px;
	}
`;

export const RetrieveButtonWrapper = styled.div`
	& button {
		border-radius: 20px;
		background-color: #52a27e;
		border-color: #52a27e;

		&:hover {
			background-color: #29513f;
			border-color: #29513f;
		}

		&:active {
			background-color: #29513f !important;
			border-color: #29513f !important;
		}
	}
`;

export const SearchWrapper = styled.div`
	padding: 15px;
	border-bottom: 1px lightgray solid;
`;