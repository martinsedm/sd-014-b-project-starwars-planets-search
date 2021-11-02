import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import fetchApiPlanets from '../services/servicesAPI';
import MyContext from './MyContext';

function MyProvider({ children }) {
  const [data, setData] = useState([]);

  // https://stackoverflow.com/questions/63570597/typeerror-func-apply-is-not-a-function
  useEffect(() => {
    (async () => {
      const result = await fetchApiPlanets();
      setData(result);
    })();
  }, []);

  const objFilters = {
    filters: {
      filterByName: {
        name: '',
      },
      filterByNumericValues: [
        { column: '',
          comparison: '',
          value: '',
        },
      ],
      order: {
        column: 'name',
        sort: 'ASC',
      },
    },
  };

  const [filters, setFilters] = useState({ ...objFilters });
  const { filters: { filterByName: { name } } } = filters;

  // const setOrderColumn = (paramOrderColumn) => {
  //   const newFilters = {
  //     filters: {
  //       filterByName: { ...filters.filters.filterByName },
  //       filterByNumericValues: [...filters.filters.filterByNumericValues],
  //       order: { ...filters.filters.order,
  //         column: paramOrderColumn },
  //     },
  //   };
  //   setFilters(newFilters);
  // };

  // const setOrderSort = (paramOrderSort) => {
  //   const newFilters = {
  //     filters: {
  //       filterByName: { ...filters.filters.filterByName },
  //       filterByNumericValues: [...filters.filters.filterByNumericValues],
  //       order: { ...filters.filters.order,
  //         sort: paramOrderSort },
  //     },
  //   };
  //   setFilters(newFilters);
  // };

  const setFiltersByName = (params) => {
    const newFilters = {
      filters: {
        filterByName: {
          name: params,
        },
        filterByNumericValues: [...filters.filters.filterByNumericValues],
        order: { ...filters.filters.order },
      },
    };
    setFilters(newFilters);
  };

  const setFilterByNumericValues = (paramsColum, paramsComparison, paramsValue) => {
    const { filters: { filterByNumericValues } } = filters;
    const { column } = filterByNumericValues[0];
    if (column === '') {
      const newFilters = {
        filters: {
          filterByName: { ...filters.filters.filterByName },
          filterByNumericValues: [
            {
              column: paramsColum,
              comparison: paramsComparison,
              value: paramsValue,
            },
          ],
          order: { ...filters.filters.order },
        },
      };
      setFilters(newFilters);
    } else {
      const newFilters = {
        filters: {
          filterByName: { ...filters.filters.filterByName },
          filterByNumericValues: [
            ...filters.filters.filterByNumericValues,
            {
              column: paramsColum,
              comparison: paramsComparison,
              value: paramsValue,
            },
          ],
          order: { ...filters.filters.order },
        },
      };
      setFilters(newFilters);
    }
  };

  const setRemoveFilterNumericValues = (params) => {
    const { filters: { filterByNumericValues } } = filters;
    const newList = filterByNumericValues.filter((obj) => obj.column !== params);
    if (newList.length < 1) {
      const emptyList = {
        filters: {
          filterByName: { ...filters.filters.filterByName },
          filterByNumericValues: [
            { column: '',
              comparison: '',
              value: '',
            },
          ],
          order: { ...filters.filters.order },
        },
      };
      setFilters(emptyList);
    } else {
      const newFilter = {
        filters: {
          filterByName: { ...filters.filters.filterByName },
          filterByNumericValues: [...newList],
          order: { ...filters.filters.order },
        },
      };
      setFilters(newFilter);
    }
  };

  const [showFilter, setShowFilter] = useState(false);

  const arrayObjKeys = [
    'population',
    'orbital_period',
    'diameter',
    'rotation_period',
    'surface_water',
  ];

  const [objKeys, setObjKeys] = useState([...arrayObjKeys]);
  const [copyData, setCopyData] = useState([]);

  const objContext = {
    data,
    setFiltersByName,
    name,
    setShowFilter,
    showFilter,
    setFilterByNumericValues,
    setObjKeys,
    objKeys,
    copyData,
    setCopyData,
    filters,
    setFilters,
    setRemoveFilterNumericValues,
  };

  return (
    <MyContext.Provider value={ objContext }>
      { children }
    </MyContext.Provider>
  );
}

MyProvider.propTypes = {
  children: PropTypes.arrayOf(PropTypes.any).isRequired,
};

export default MyProvider;
