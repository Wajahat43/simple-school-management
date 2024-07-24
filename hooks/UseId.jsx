const { useId } = require("react");

function UseId() {
  const id = useId();

  return (
    <form>
      <label htmlFor={`${id}-username`}>Name</label>
      <input id={`${id}-username`} />
    </form>
  );
}

export default UseId;

/*
The above code will generate a unique id for the input element of each UseId component instance.
So if we have two instanes of UseId component in the same parent component, by clicking on the label of each instance,
the input element of that instance will be focused.
*/
