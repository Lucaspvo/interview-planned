import React from 'react';
import styled from 'styled-components';

const HeaderContent = styled.div`
	display: flex;
	justify-content: flex-start;
	align-items: center;
	background-color: white;
`;

const HeaderTitle = styled.div`
	& span {
		font-family: sans-serif;
		font-weight: 500;
		font-size: 18px;
		margin-left: 20px;
	}
`;

function AppHeader() {
	return (
		<HeaderContent>
			<img alt="logo" src="/logo.svg" />
			<HeaderTitle>
				<span>Planned Test</span>
			</HeaderTitle>
		</HeaderContent>
	);
}

export default AppHeader;