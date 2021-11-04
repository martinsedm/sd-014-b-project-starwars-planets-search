import PropTypes from 'prop-types';
import React, { useState } from 'react';
import PlanetContext from './PlanetContext';

function Provider({ children }) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [name, setName] = useState('');
  const [filtered, setFiltered] = useState([]);
  const [column, setColumn] = useState('population');
  const [comparison, setComparison] = useState('maior que');
  const [value, setValue] = useState('0');
  const [filterByNumericValues, setFilterByNumericValues] = useState({});

  const contextValue = {
    data,
    setData,
    loading,
    setLoading,
    filters: {
      filterByName: {
        name,
      },
      filterByNumericValues,
    },
    column,
    comparison,
    value,
    setName,
    filtered,
    setFiltered,
    setColumn,
    setComparison,
    setValue,
    setFilterByNumericValues,
  };

  return (
    <PlanetContext.Provider value={ contextValue }>
      { children }
    </PlanetContext.Provider>
  );
}

Provider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Provider;
