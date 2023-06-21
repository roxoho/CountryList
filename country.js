import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ReactPaginate from 'react-paginate';

function Country({ sort,filterArea,filterRegion,currentPage,onPageChange }){

    const [countries,setCountries]=useState([]);
    
    const fetchData = async () => {
        try {
          const response = await axios.get(
            'https://restcountries.com/v2/all?fields=name,region,area'
          );
          setCountries(response.data);
         
        } catch (error) {
          console.error(error);
        }
      };
   
    

      useEffect(()=>{
        fetchData();
      },[])

      const filteredCountry = countries.filter((country) => {
        if (filterArea) {
          return country.area < countries.find((c) => c.name === 'Lithuania').area;
        }
        return true;
      });

      const filteredCountries= filteredCountry.filter((country)=>{
        if (filterRegion) {
          return country.region === filterRegion;
        }
        return true;
      });
      
      const sortedCountries = filteredCountries.sort((a, b) => {
        if (sort === 'asc') {
          return a.name.localeCompare(b.name);
        } else {
          return b.name.localeCompare(a.name);
        }
      });

      const countriesPerPage = 10;
      const pagesVisited = currentPage * countriesPerPage;
      const pageCount = Math.ceil(sortedCountries.length / countriesPerPage);

      const displayCountries = sortedCountries
    .slice(pagesVisited, pagesVisited + countriesPerPage)
    .map((country) => (
      <div key={country.name} className="card">
        <h3>{country.name}</h3>
        <p className="sub-heading region">Region: {country.region}</p>
        <p className="sub-heading area">Area: {country.area}</p>
      </div>

    ));
    return (<><ul className="country-list">{displayCountries}</ul>

    <ReactPaginate
    previousLabel="Previous"
    nextLabel="Next"
    pageCount={pageCount}
    onPageChange={onPageChange}
    containerClassName="pagination"
    activeClassName="active"
  />
  </>);
    
}
export default Country;