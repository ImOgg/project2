import React, { useState } from 'react'

const Search = ({ search, setinput }) => {
    const inputHandler = (e) => {
        setinput(e.target.value);
    };

    return (
        <div className='search'>
            <input className='input' type="text" onChange={inputHandler} />
            <button onClick={search}>Search</button>
        </div>
    )
}

export default Search