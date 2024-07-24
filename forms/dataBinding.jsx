//Following form has a controlled input and two way data binding.
// If we change searchTerm by clicking on button, the display value of input is also changed.
// If we change the input value, the searchTerm is also changed.
function SearchForm() {
  const [searchTerm, setSearchTerm] = React.useState("cats!");
  //const [searchTerm, setSearchTerm] = React.useState();
  //The commented line will throw a warning that we are changing an uncontrolled input to controlled input.
  //That is because the input value is not set on first render and is undefined. React doesn't pass undefined values when creating react elements.
  //So we should always set a default value for the input when creating state.
  return (
    <>
      <form>
        <label htmlFor="search-input">Search:</label>
        <input
          type="text"
          id="search-input"
          value={searchTerm}
          onChange={(event) => {
            setSearchTerm(event.target.value);
          }}
        />
      </form>

      <p>Search term: {searchTerm}</p>

      <button onClick={() => setSearchTerm(Math.random())}>Click me</button>
    </>
  );
}

/**
 * This input has one way data binding. If we change the search term by clicking on button, the input value is not changed.
<>
<form>
    <label htmlFor="search-input">Search:</label>
    <input
    type="text"
    id="search-input"
    onChange={(event) => {
        setSearchTerm(event.target.value);
    }}
    />
</form>

<p>Search term: {searchTerm}</p>

<button onClick={() => setSearchTerm(Math.random())}>Click me</button>
</>
 */

export default SearchForm;
