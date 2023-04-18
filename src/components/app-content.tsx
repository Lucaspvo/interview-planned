import React, { ReactNode } from 'react';
import styled from 'styled-components';

const Content = styled.div`
	background-color: #f4f6f8;

	@media only screen and (max-width: 300px) {
		padding: 20px 5px 50px 5px;
	}
	 
	@media only screen and (min-width: 301px) {
		padding: 20px 20px 50px 20px;
	}

	@media only screen and (min-width: 490px) {
		padding: 20px 50px 50px 50px;
	}

	@media only screen and (min-width: 768px) {
		padding: 20px 100px 50px 100px;
	}

	@media only screen and (min-width: 889px) {
		padding: 20px 150px 50px 150px;
	}

	@media only screen and (min-width: 1200px) {
		padding: 20px 220px 50px 220px;
	}
`;

interface Props {
	children: ReactNode,
}

function AppContent({ children }: Props) {
	return (
		<Content>
			{ children }
		</Content>
	);
}

export default AppContent;