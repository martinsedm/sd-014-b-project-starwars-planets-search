import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import DataContext from './DataContext';

function Provider({ children }) {
  const [data, setData] = useState([]);
  const [filteredPlanets, setFilteredPlanets] = useState([]);
  const [column, setColumn] = useState('population');
  const [comparator, setComparator] = useState('maior que');
  const [comparisonNum, setComparisonNum] = useState('');
  const value = {
    data,
    setData,
    filteredPlanets,
    setFilteredPlanets,
    column,
    setColumn,
    comparator,
    setComparator,
    comparisonNum,
    setComparisonNum,
  };

  async function fetchData() {
    const response = await fetch('https://swapi-trybe.herokuapp.com/api/planets/');
    const result = await response.json();
    const planets = result.results;
    const planetsData = [];

    planets.map((planet) => {
      delete planet.residents;
      return planetsData.push(planet);
    });

    setData(planetsData);
    console.log(planetsData);
  }

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    setData(filteredPlanets);
  }, [filteredPlanets]);

  return (
    <DataContext.Provider value={ value }>
      {children}
    </DataContext.Provider>
  );
}

Provider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Provider;

// Referências: https://github.com/tryber/sd-014-b-project-starwars-planets-search/pull/43/files
// https://github.com/tryber/sd-014-b-project-starwars-planets-search/pull/1/files
// https://github.com/tryber/sd-014-b-project-starwars-planets-search/pull/110/files
