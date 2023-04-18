import React from 'react';
import Header from './components/app-header';
import Content from './components/app-content';
import Users from './components/users/users';
import { initialValue, Context } from './context';

function App() {
  return (
    <Context.Provider value={initialValue}>
      <div className="App">
        <Header />
        <Content>
          <Users />
        </Content>
      </div>
    </Context.Provider>
  );
}

export default App;
