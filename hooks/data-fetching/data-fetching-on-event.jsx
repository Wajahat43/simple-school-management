import React from "react";

import TextInput from "./TextInput.js";
import SearchResult from "./SearchResult.js";

const ENDPOINT = "Some endpoint";

function App() {
  const [searchTerm, setSearchTerm] = React.useState("");
  const [searchResults, setSearchResults] = React.useState(null);
  const [searchState, setSearchState] = React.useState("idle");

  const handleSearchSubmit = async (event) => {
    event.preventDefault();
    setSearchState("loading");

    const response = await fetch(`${ENDPOINT}?searchTerm=${searchTerm}`);
    const json = await response.json();

    if (json.ok) {
      setSearchState("Success");
      setSearchResults(json.results);
    } else {
      setSearchState("Error");
    }
  };
  return (
    <>
      <header>
        <form onSubmit={handleSearchSubmit}>
          <TextInput
            required={true}
            label="Search"
            placeholder="The Fifth Season"
            value={searchTerm}
            onChange={(event) => {
              setSearchTerm(event.target.value);
            }}
          />
          <button>Go!</button>
        </form>
      </header>

      <main>
        {searchState === "idle" && <p> Welcome to Book Search </p>}
        {searchState === "loading" && <p> Searching </p>}
        {searchState === "error" && <p> Oh ho! Something went wrong </p>}
        {searchState === "success" && <SearchResultsList searchResults={searchResults} />}
      </main>
    </>
  );
}

function SearchResultsList({ searchResults }) {
  if (searchResults.length === 0) {
    return <p> No books match search criteria </p>;
  }

  return (
    <div className="search-results">
      <h2>Search Results:</h2>
      {searchResults?.map((result) => (
        <SearchResult key={result.isbn} result={result} />
      ))}
    </div>
  );
}
export default App;
