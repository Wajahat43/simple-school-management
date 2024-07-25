import React from "react";
function UselessMachine() {
  //We are using useId because we want to make sure that our input has a unique id for every instance of UselessMachine.
  const id = React.useId();
  const [isOn, setIsOn] = React.useState(true);

  //This will execute the function passed to it after first render and then everytime when isOn's state changes.
  React.useEffect(() => {
    // If the checkbox is already on then we don't need to do anything.
    if (isOn) {
      return;
    }

    // Flip the checkbox back on in 500ms...
    const timeoutId = window.setTimeout(() => {
      setIsOn(true);
    }, 500);

    return () => {
      // if the user toggles the checkbox before the timeout is up, we need to cancel the timeout, since it is not longer required.
      window.clearTimeout(timeoutId);
    };
  }, [isOn]);

  //If the dependency array is empty, the function passed to useEffect will only run once after the first render.
  //If the dependency array is not provided, the function passed to useEffect will run after every render.
  return (
    <>
      <input
        id={id}
        type="checkbox"
        checked={isOn}
        onChange={(event) => {
          setIsOn(event.target.checked);
        }}
      />
    </>
  );
}

export default UselessMachine;
