import React, { useState, useEffect } from "react";
import axios from "axios";

function SearchWithDatalist() {
    const [searchInput, setSearchInput] = useState("");
    const [suggestions, setSuggestions] = useState([]);

    useEffect(() => {
        if (searchInput) {
            axios
                .get(`http://localhost:3000/analytics/names?q=${searchInput}`)
                .then((res) => {
                    // Extract the NAME values into an array
                    const nameSuggestions = res.data.map((item) => item.NAME);
                    setSuggestions(nameSuggestions);
                })
                .catch((err) => console.error("Error fetching suggestions:", err));
        } else {
            setSuggestions([]); 
        }
    }, [searchInput]);
    

    return (
        <div className="search">
            <input type="text"
                list="suggestions-list"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                placeholder="Enter a name"/>
            <datalist id="suggestions-list">
                {console.log(suggestions)}
                {suggestions &&  suggestions.map((name, index) => (
                    <option key={index} value={name} />
                ))}
            </datalist>
        </div>
    );
}

export default SearchWithDatalist;
