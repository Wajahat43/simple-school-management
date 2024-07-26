/*
When we want to pass data from a parent component, we generally use props but there is a big issue with this approach.
Assumes we have a component hierarchy like this App -> ComponentA  ->  ComponentB -> ComponentC -> ComponentD -> FinalComponent.
Now, we have a user state that we are using in ComponentA and FinalComponent.
So we lift the state up to App and pass it down to ComponentA, then to ComponentB, and so on.
Now stae passes from App to A, B, C, D and to FinalComponent where it is finally used.
But we didn't need it in  B, C, D. So, we are passing the state through unnecessary components.

To fix this issue, we can use the Context API.

Context APi provides us a way to define state in a parent component, and provide it to all the children.
Then from any of its children, we can pluck this state from the context and use it.
So we will create Context in APP and provide it to all the children.
Then we can Pluck the state from the context in FinalComponent and use it.
Here's how the code will look like.
*/

// App.jsx
import React from "react";
export const UserContext = React.createContext();

function App() {
  const user = { name: "John", age: 25 };
  return (
    <UserContext.Provider value={user}>
      <ComponentA />
    </UserContext.Provider>
  );
}

/*
ComponentB
ComponentC
ComponentD

Will not need user to be passed as prop
*/

// FinalComponent.jsx
import React from "react";
import { UserContext } from "./App";
function FinalComponent() {
  const user = React.useContext(UserContext);
  return <h1>{user.name}</h1>;
}

//In this approach we didn't need to pass the state as prop through all the other components.
