import React from "react";
import Search from "../components/analytics/Search";
import SearchProvider from "../components/analytics/SearchContext";
export default function Analytics(){
    return <div style={{width : '100vh' , height : "90vh"} } className="searchComponent">
        <SearchProvider >
            <Search />
        </SearchProvider>
    </div>
}