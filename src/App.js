import React from 'react';
import './App.css';
import Table from './components/Table';
import DataProvider from './context/DataProvider';

function App() {
  return (
    <DataProvider>
      <div>
        <span>Star wars - Planets</span>
        <Table />
      </div>
    </DataProvider>
  );
}

export default App;
