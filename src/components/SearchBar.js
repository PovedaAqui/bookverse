import React from "react";
import { useState, useEffect } from "react";

const SearchBar = () => {
    const [inputValue, setInputValue] = useState('');
    const [isOpen, setIsOpen] = useState(false);
  
    const handleChange = event => {
      setInputValue(event.target.value);
    };
  
    const handleSubmit = event => {
      event.preventDefault();
      // Perform search with inputValue
      console.log("TEST")
    };
  
    const toggleSearchBar = () => {
      setIsOpen(!isOpen);
    };
    
    const handleClick = () => {
        if (isOpen) {
          handleSubmit();
        } else {
          toggleSearchBar();
        }
    };
  
    return (
        <>
            <form className={`bg-white rounded-md ${isOpen ? 'block' : 'hidden'}`} onSubmit={handleClick}>
                <input
                type="search"
                placeholder="Search"
                className="px-4 py-2 rounded-md"
                value={inputValue}
                onChange={handleChange}
                />
                {/* <button type="submit" className="px-4 py-2 rounded-md">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 15.75l-2.489-2.489m0 0a3.375 3.375 0 10-4.773-4.773 3.375 3.375 0 004.774 4.774zM21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                </button> */}
            </form>
            <button type="submit" className="px-4 py-2 rounded-md" onClick={toggleSearchBar}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                </svg>
            </button>
        </>
    );
}

export default SearchBar;