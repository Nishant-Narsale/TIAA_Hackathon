import React from 'react';
import '../css/SearchTrain.css';

const SearchTrain = () => {
  return (
    <div className="form-container">
      <form>
        <input type="text" placeholder="Search Train..." />
        <button type="submit">Search</button>
      </form>
    </div>
  );
};

export default SearchTrain;
