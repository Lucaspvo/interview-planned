import React from 'react';

const API_URL = 'http://localhost:8099'

type InitialValue = {
  apiUrl: string,
};

export const initialValue: InitialValue = {
  apiUrl: API_URL,
};

export const Context = React.createContext<InitialValue>(initialValue);