import React, { useState, useEffect } from "react";
import axios from "axios";

function SearchWithDatalist() {
    const [searchInput, setSearchInput] = useState("");
    const [suggestions, setSuggestions] = useState([]);

    useEffect(() => {
        if (searchInput) {
            axios
                .get(`http://localhost:3000/suggestions?q=${searchInput}`)
                .then((res) => {
                    console.log(res);
                    setSuggestions(res.data);
                })
                .catch((err) => console.error("Error fetching suggestions:", err));
        } else {
            setSuggestions([]); // Clear suggestions if input is empty
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
