import React from "react";
// Assume we have this component.
function Counter({ src }) {
  const [count, setCount] = React.useState(0);
  React.useEffect(function increaseCount() {
    function handleKeyDown(event) {
      if (event.code === "Space") {
        setCount(count + 1);
      }
    }
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <>
      <p> count is: {count} </p>
      <p> Press Space to increase Count </p>
    </>
  );
}

/*
When the component renders, the count value is set to 0.
The useEffect hook is called with an empty dependency array. So it registers an event listener for the keydown event on first render.
When the user presses any key, handleKeyDown is called. If the key is Space, the count is increased by 1.

Now we expect that on every keydown event the count should increase by 1.
But that is not the case. The count value remains 1 even after pressing the Space key multiple times.
So we have a problem and it is because of stale values. Let's understand why this is happening.

Whenever we create a function in JavaScript, it creates a lexical environment. This environment is created and stored
when the function is created.
This environment contains the variables that are in scope when the function is created.
And it also contains lexical environment of the parent function.

so when handleKeyDown is created, it stores reference to the count variable in the lexical environment of function MediaPlayer, that it
can access when searching for it.

Since when the handleKeyDown function is created, the count value is 0, it stores the count's value as 0.
Now on every call, it access count from it's lexical environment, which is 0. And increases it by 1.
Consequently, everytime this function is called it sets count to 1.


The count value is stored in lexical enviroment and isn't changing, but setCount changes state in React. So both of them become
out of sync. Let's discuss the solutions.
*/

function SolutionOne({ src }) {
  const [count, setCount] = React.useState(0);
  React.useEffect(
    function increaseCount() {
      function handleKeyDown(event) {
        if (event.code === "Space") {
          setCount(count + 1);
        }
      }
      window.addEventListener("keydown", handleKeyDown);
      return () => {
        window.removeEventListener("keydown", handleKeyDown);
      };
    },
    [count]
  );

  return (
    <>
      <p> count is: {count} </p>
      <p> Press Space to increase Count </p>
    </>
  );
}

/*
This solution adds count to the dependency array of the useEffect hook. So every time the count changes, we re-create
the handleKeyDown function. This way, the handleKeyDown function always has the latest value of count.
But the downside is that we are adding and removing the event listener on every keydown event. This is not efficient.
*/

function SolutionTwo({ src }) {
  const [count, setCount] = React.useState(0);
  React.useEffect(function increaseCount() {
    function handleKeyDown(event) {
      if (event.code === "Space") {
        setCount((prevCount) => prevCount + 1);
      }
    }
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <>
      <p> count is: {count} </p>
      <p> Press Space to increase Count </p>
    </>
  );
}

/*
This solutions is the React's solution. Instead of passing a new state value to setCount function we pass it a function callback.
Now because setCount is managed by react and when react sees that it has got a function callback instead of new state,
it will call that function to get new state. And React also passes the state value to that function.
This way, we don't access the count from lexical scope, instead react passes it to us.
And we always have the latest value of count.
 */

export default MediaPlayer;
