import React, { useContext, useState } from 'react';
import MyContext from '../../context/MyContext';
import './numericFilter.css';

// parte desse código foi inpirado no repositório do Michael Cachias https://github.com/tryber/sd-014-b-project-starwars-planets-search/blob/michaelcaxias-starwars-planets/src/components/FilterNumeric.jsx

const optionsList = ['population', 'orbital_period', 'diameter', 'rotation_period',
  'surface_water'];

const comparisonList = ['maior que', 'menor que', 'igual a'];

export default function NumericFilter() {
  const { filterByNumericValue } = useContext(MyContext);
  const [numValue, setNumValue] = useState({
    column: 'population', comparison: 'maior que', value: 0,
  });
  const [options, setOptions] = useState(optionsList);

  const handleChange = ({ target: { name, value } }) => {
    setNumValue({ ...numValue, [name]: value });
  };

  const handleFilter = () => {
    const { column } = numValue;
    filterByNumericValue(numValue);
    const newColumns = options.filter((newcolumn) => column !== newcolumn);
    setOptions(newColumns);
  };

  return (
    <form>
      <select
        data-testid="column-filter"
        name="column"
        value={ numValue.column }
        onChange={ handleChange }
      >
        {options.map((opt, i) => <option key={ i }>{opt}</option>)}
      </select>
      <select
        data-testid="comparison-filter"
        name="comparison"
        value={ numValue.comparison }
        onChange={ handleChange }
      >
        {comparisonList.map((opt, i) => <option key={ i }>{opt}</option>)}
      </select>
      <label htmlFor="value">
        <input
          id="value"
          name="value"
          value={ numValue.value }
          onChange={ handleChange }
          data-testid="value-filter"
          type="number"
          placeholder="type a number"
        />
      </label>
      <button
        data-testid="button-filter"
        type="button"
        onClick={ handleFilter }
      >
        Filter
      </button>
    </form>
  );
}
