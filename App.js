import React, { useState } from 'react';
import Country from './country.js';



function App(){
  const [sort,setSort]=useState('asc');
  const [filterArea,setFilterArea]=useState(false);
  const [filterRegion,setFilterRegion]=useState('');
  const [currentPage, setCurrentPage] = useState(0);

  const handleArea= () => {
    setFilterArea((prevFilterArea)=>!prevFilterArea);
  }
  const handleSort = () => {
    setSort((prevSort) => prevSort === 'asc' ? 'desc' : 'asc');
  };
  const handleRegion= () => {
    setFilterRegion((prevFilterRegion)=>prevFilterRegion === '' ? 'Oceania' : '');
  }
  const handlePageChange = ({ selected }) => {
    setCurrentPage(selected);
  };



  return (
    <><div className="title"><h1>Country List</h1></div>
  <div>
  <div className="filter-buttons">
  <button className={`filter${filterArea ? ' active' : ''}`} onClick={handleArea}>
    Countries Smaller
     than Lithuania(by Area)
  </button>
  <button className={`filter${filterRegion ? ' active' : ''}`} onClick={handleRegion}>
    Countries in “Oceania” region
  </button>
  <button className={`sort${sort === 'asc' ? ' active' : ''}`} onClick={handleSort}>
    Sort (by {sort === 'asc' ? 'desc' : 'asc'})
  </button>
</div>

    
    </div>
    <Country
    sort={sort}
    filterArea={filterArea}
    filterRegion={filterRegion}
    currentPage={currentPage}
    onPageChange={handlePageChange} />
    </>
  );
}


export default App;