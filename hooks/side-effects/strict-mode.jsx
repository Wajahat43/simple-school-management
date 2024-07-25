/*
Strict Mode in React can be used to highlight potential problems in our application.
Strict Mode only affects the development environment. It has no effect in production.
Consdier this component, if we don't use strict mode the counter works fine but it is not removing the event listener
when the component is unmounted.

Also in Strict Mode, each render is automatically re-run
*/
function Counter({ src }) {
  const [count, setCount] = React.useState(0);
  React.useEffect(function increaseCount() {
    function handleKeyDown(event) {
      if (event.code === "Space") {
        setCount((prevCount) => prevCount + 1);
      }
    }
    window.addEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <>
      <p> count is: {count} </p>
      <p> Press Space to increase Count </p>
    </>
  );
}

/*
The above code works fine without strict mode, but with strict mode, our counter doesn't seem to work.
That is because in strict mode, when component mounts react runs the effects then cleans up the effect
 and then runs the effect again.
So in our case we add two event listeners and each of them adds 1 to the count. therefore the count is incremented by 2.
When we debug this issue we can see that we forgot to remove the event listener when the component is unmounted.
So we should add the below code to remove the event listener when the component is unmounted.
return () => {
    window.removeEventListener("keydown", handleKeyDown);
}


In "Normal" mode, the sequence of operations  is:
Mount
Run effect

In Strict Mode, the sequence is:
Mount
Run effect
Run cleanup
Re-run effect
*/
