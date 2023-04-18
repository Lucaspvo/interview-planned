import React from 'react';
import styled from 'styled-components';

const InputContainer = styled.div`
	display: flex;

	& label, & input, & span {
		height: 45px;
		border: ${(props: { $error: string }) => props.$error ? '#ED2B2A 1px solid;' : 'lightgray 1px solid;'}
	}

	& label, & span {
		line-height: 45px;
		border-radius: 10px 0 0 10px;
		border-right: 0;
		padding-left: 17px;
		font-family: sans-serif;
		color: ${(props: { $error: string }) => props.$error ? '#ED2B2A;' : 'lightgray;'}
		background-color: white;
	}

	& input {
		width: 100%;
		border-left: 0;
		border-radius: 0 10px 10px 0;
		outline: none;
		padding-left: 10px;

		&::placeholder {
			color: lightgray;
		}
	}
`;

const ErrorDiv = styled.div`
	font-family: arial, sans-serif;
	font-size: 13px;
	color: #ED2B2A;
`;

type OnChange = (e: React.ChangeEvent<HTMLInputElement>) => void;

interface Props {
	label?: null | string,
	icon?: null | string,
	inputType: string,
	placeholder?: string,
	value?: string | undefined,
	onChange?: OnChange | undefined,
	error?: string,
}

function CoreInput({
	label = null,
	icon = null,
	inputType = "text",
	placeholder = '',
	value,
	onChange,
	error = ''
}: Props) {
	return (
		<div>
			<InputContainer $error={error}>
				{ icon && <span><img alt="input-icon" src={`/${icon}.svg`} /></span> }
				{ label && <label>{label}</label> }
				<div style={{ width: '100%' }}>
					<input
						value={value}
						onChange={onChange}
						type={inputType}
						placeholder={placeholder}
					/>
				</div>
			</InputContainer>
			{
				!!error && (
					<ErrorDiv>
						{error}
					</ErrorDiv>
				) 
			}
		</div>
	);
}

export default CoreInput;