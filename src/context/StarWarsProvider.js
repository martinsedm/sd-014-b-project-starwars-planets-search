import PropTypes from 'prop-types';
import React, { useState, useEffect } from 'react';
import StarWarsContext from './StarWarsContext';
import requestApi from '../services/api';

function Provider({ children }) {
  const [dataResult, setData] = useState([]);
  const [keys, setKeys] = useState([]);
  const [inputName, setInputName] = useState('');
  const [column, setColumn] = useState();
  const [comparison, setComparison] = useState();
  const [value, setValue] = useState();

  async function setApi() {
    const result = await requestApi();
    const data = result.results;
    const resultData = data.map(({ residents, ...element }) => element);
    setData(resultData);
    setKeys(Object.keys(resultData[0]));
    return resultData;
  }
  useEffect(() => { setApi(); }, []);
  const filters = {
    filterByName: {
      name: inputName,
    },
    filterByNumericValues: [{ comparison, column, value }],
  };

  return (
    <StarWarsContext.Provider
      value={ { data: dataResult,
        keys,
        filters,
        setInputName,
        setData,
        setColumn,
        setComparison,
        setValue,
      } }
    >
      { children }
    </StarWarsContext.Provider>
  );
}

Provider.propTypes = {
  children: PropTypes.func.isRequired,
};

export default Provider;
