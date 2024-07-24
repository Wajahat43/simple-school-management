/*
1. Hooks have to be called within the scope of a React application. We can't call them outside of our React components.
2. We have to call our hooks at the **top level of the component.

First one is obvious because hooks let us access something that is part of React, so we need to be in a React component to use them.

The second one is a bit more subtle.
The reason for this rule is that hooks are called in the order they are defined in the component.
If we call them conditionally, React won't be able to keep track of the order in which they were called.
This can lead to bugs and unexpected behavior.
*/

function TextInput({ id, label, type }) {
  const [x, setX] = React.useState(0);
  const [y, setY] = React.useState(5);
}

/*
  Our above code has two pieces of state, the first state has default value of 0 and second has default value of 5.
   Now when the component is mounts for the first time and state is created, react doesn't have a unique identifier for both of these.
   So it uses the order in which they are called to assoociate sate with its value. It says something like this

  hook1: 0
  hook2: 5

  If we had a condition where our first hook would execute on subsequent re-renders,
   when react returns value of y, it would return 0 because that will be the first hook called.*/
