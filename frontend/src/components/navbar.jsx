import React, { useState } from 'react';
import { Link } from 'react-router-dom'; // Assuming you are using react-router for routing

const Navbar = ({ onSearch }) => {
  const [batch, setBatch] = useState('r21'); // Default checked batch
  const [searchInput, setSearchInput] = useState('');
  const [suggestedNames, setSuggestedNames] = useState([]);

  // Handle input change and fetch suggestions
  const handleInputChange = async (e) => {
    setSearchInput(e.target.value);
    if (e.target.value.trim() === '') {
      setSuggestedNames([]);
      return;
    }

    try {
      const response = await fetch(`/search?name=${encodeURIComponent(e.target.value)}&batch=${encodeURIComponent(batch)}`);
      const suggestions = await response.json();
      if (Array.isArray(suggestions.names)) {
        setSuggestedNames(suggestions.names);
      } else {
        console.error('Expected names to be an array but got:', suggestions.names);
      }
    } catch (error) {
      console.error('Error fetching suggestions:', error);
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (searchInput.trim() === '') {
      alert('Please enter a name to search.');
      return;
    }
    onSearch(searchInput, batch); // Pass data to parent
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <Link className="navbar-brand" to="#">
        <img src="rgukt.jpeg" alt="Logo" style={{ height: '30px' }} />
        RKVBros
      </Link>

      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarContent"
        aria-controls="navbarContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>

      <div className="collapse navbar-collapse" id="navbarContent">
        <ul className="navbar-nav mr-auto">
          <li className="nav-item active">
            <Link className="nav-link" to="#">
              Home <span className="sr-only">(current)</span>
            </Link>
          </li>
        </ul>

        <form className="form-inline my-2 my-lg-0" onSubmit={handleSubmit}>
          <div className="form-check form-check-inline">
            <input
              type="radio"
              name="batch"
              value="r20"
              className="form-check-input"
              onChange={() => setBatch('r20')}
            />
            <label className="form-check-label">R20</label>
          </div>
          <div className="form-check form-check-inline">
            <input
              type="radio"
              name="batch"
              value="r21"
              className="form-check-input"
              defaultChecked
              onChange={() => setBatch('r21')}
            />
            <label className="form-check-label">R21</label>
          </div>
          <input
            list="suggestedNames"
            id="searchInput"
            name="name"
            className="form-control mr-sm-2"
            type="search"
            placeholder="Search by name or id or branch"
            aria-label="Search"
            autoComplete="off"
            value={searchInput}
            onChange={handleInputChange}
          />
          <datalist id="suggestedNames">
            {suggestedNames.map((name, index) => (
              <option key={index} value={name} />
            ))}
          </datalist>
          <button className="btn btn-outline-success my-2 my-sm-0" type="submit">
            Search
          </button>
        </form>
      </div>
    </nav>
  );
};

export default Navbar;
