//This answers the question where does the state actualy live?

function MainComponent() {
  [displayNested, setDisplayNested] = React.useState(false);

  return (
    <>
      <button onClick={() => setDisplayNested(!displayNested)}>Toggle Nested Component</button>
      {displayNested && <NestedComponent />}
    </>
  );
}

function NestedComponent() {
  const [count, setCount] = React.useState(0);

  return (
    <>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>Increment</button>
    </>
  );
}

/**

1. When main component mounts, its component instance is created and the state is initialized.
2. When the button is clicked, the state is updated and the component is re-rendered.
3. Now when displayNested is true, the NestedComponent is rendered. And its component instance is created and the state is initialized.
4. When the button in NestedComponent is clicked, the state of NestedComponent is updated and the only the Nested component is re-rendered.
5. If we click on the toggle button again, the main component re-renders and the displayNested is set to false.
6. Now because displayNested is false, the NestedComponent is unmounted and its component instance is destroyed.
7. If we click on the toggle button again, the main component re-renders and the displayNested is set to true. But when the nestedComponent is
rendered, it's state is re-initialized. And the previous changes we made to state are not there.

So state lives in the component instance. When the component is unmounted, the component instance is destroyed and the state is lost.
 */
