import React, { useState, useContext } from 'react';
import NewContext from '../context/NewContext';

function FilterNumbers() {
  const { filterItem, setFilterItem, setComparison } = useContext(NewContext);
  const NumericValues = filterItem.filters.filterByNumericValues;
  const comparisonItens = ['maior que', 'menor que', 'igual a'];

  const [columnFilter, setColumn] = useState('population');
  const [comparisonFilter, setFilterComparison] = useState('maior que');
  const [number, setNumber] = useState(0);
  const [allInformation, setAllInformation] = useState({
    column: '',
    comparison: '',
    value: '',
  });
  const [columnItens, setColumnItems] = useState([
    'population', 'orbital_period', 'diameter', 'rotation_period', 'surface_water',
  ]);

  const handleColumn = (value) => {
    setColumn(value);
  };

  const handleComparison = (value) => {
    setFilterComparison(value);
  };

  const handleChange = (value) => {
    setNumber(value);
  };

  const getStatesByClick = () => {
    setAllInformation({
      column: columnFilter,
      comparison: comparisonFilter,
      value: number,
    });
    setComparison({
      column: columnFilter,
      comparison: comparisonFilter,
      value: number,
    });
    setFilterItem({
      filters: {
        ...filterItem.filters,
        filterByNumericValues: [...NumericValues, {
          column: columnFilter,
          comparison: comparisonFilter,
          value: number,
        }],
      },
    });
  };

  const deleteColunm = () => {
    const newColumn = [...columnItens];
    const indexOfColumn = columnItens.indexOf(columnFilter);
    newColumn.splice(indexOfColumn, 1);
    setColumnItems(newColumn);
  };

  return (
    <form>
      <select
        name={ columnFilter }
        data-testid="column-filter"
        onChange={ ({ target: { value } }) => handleColumn(value) }
      >
        { columnItens.map((column, index) => (
          <option key={ index } value={ column }>{ column }</option>
        )) }
      </select>
      <select
        name={ comparisonFilter }
        data-testid="comparison-filter"
        onChange={ ({ target: { value } }) => handleComparison(value) }
      >
        { comparisonItens.map((comparison, index) => (
          <option key={ index } value={ comparison }>{ comparison }</option>
        ))}
      </select>
      <input
        type="number"
        data-testid="value-filter"
        value={ number }
        onChange={ ({ target: { value } }) => handleChange(value) }
        name="number"
      />
      <button
        type="button"
        name={ allInformation }
        data-testid="button-filter"
        onClick={ () => {
          getStatesByClick();
          deleteColunm();
        } }
      >
        Filtrar
      </button>
    </form>
  );
}

export default FilterNumbers;
