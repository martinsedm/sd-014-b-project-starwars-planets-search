import React, { useContext } from 'react';
import SearchContext from '../context/SearchContext';
import SWContext from '../context/SWContext';

function Table() {
  const { data } = useContext(SWContext);
  const { nameFilter } = useContext(SearchContext);
  const { typeFilter } = useContext(SearchContext);

  let filteredData = data;

  const filterSmaller = (columnFilter) => {
    filteredData = data.filter((d) => Number(d[columnFilter]) < typeFilter.numberInput);
  };

  const filterBigger = (columnFilter) => {
    filteredData = data.filter((d) => Number(d[columnFilter]) > typeFilter.numberInput);
  };

  const filterEqual = (columnFilter) => {
    filteredData = data.filter((d) => Number(d[columnFilter]) === typeFilter.numberInput);
  };

  switch (typeFilter.comparison) {
  case 'menor que':
    filterSmaller(typeFilter.columnFilter);
    break;
  case 'maior que':
    filterBigger(typeFilter.columnFilter);
    break;
  case 'igual a':
    filterEqual(typeFilter.columnFilter);
    break;
  default:
    filteredData = data;
    break;
  }

  if (nameFilter !== '') {
    filteredData = data.filter((d) => (
      d.name.toLowerCase().includes(nameFilter.toLowerCase())
    ));
  }

  const headers = ['Name', 'Rotation Period', 'Orbital Period', 'Diameter', 'Climate',
    'Gravity', 'Terrain', 'Surface Water',
    'Population', 'Films', 'Created', 'Edited', 'URL'];

  return (
    <table>
      <thead>
        <tr>
          { headers.map((header) => <th key={ header }>{ header }</th>) }
        </tr>
      </thead>
      <tbody>
        { filteredData.map((item) => (
          <tr key={ item.url }>
            <td>{ item.name }</td>
            <td>{ item.rotation_period }</td>
            <td>{ item.orbital_period }</td>
            <td>{ item.diameter }</td>
            <td>{ item.climate }</td>
            <td>{ item.gravity }</td>
            <td>{ item.terrain }</td>
            <td>{ item.surface_water }</td>
            <td>{ item.population }</td>
            <td>{ item.films.length }</td>
            <td>{ item.created }</td>
            <td>{ item.edited }</td>
            <td>{ item.url }</td>
          </tr>
        )) }
      </tbody>
    </table>
  );
}

export default Table;
