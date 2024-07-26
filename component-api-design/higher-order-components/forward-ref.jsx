//Assume we have this Slider component
import React from "react";

function Slider({ label, ...delegated }) {
  const id = React.useId();

  return (
    <div>
      <label htmlFor={id}>{label}</label>
      <input {...delegated} type="range" id={id} className={styles.slider} />
    </div>
  );
}
//export default Slider;

//And we use it in some other component. Now we want that when that component mounts, this input is focused. Let's try to do this
function RedSlider() {
  const inputRef = React.useRef();
  React.useEffect(() => {
    inputRef.current.focus();
  }, []);
  return <Slider ref={inputRef} label="Red" />;
}

//When we run this code, we get an error Cannot read properties of undefined (reading 'focus')
/*
The problem is that ref is property of a React Component, so when we pass it to slider, react plucks this from the props
and sets it as a property of the Slider component object. Something like this

React.createElement returns an object like this
{
  type: ƒ Slider(),
  props: {
    label: "Red",
  },
  key: null,
  ref: sliderRef,
  _owner: {
    // Stuff omitted
  },
  _store: {}
}

This is why it is not passed to Slider component. To fix this, we can use forwardRef

forwardRef is a higher order component that allows you to access the ref object that is passed to the component. so our solution will look like this
*/

function ForwardRefSlider({ label, ...delegated }, ref) {
  const id = React.useId();

  return (
    <div>
      <label htmlFor={id}>{label}</label>
      <input ref={ref} {...delegated} type="range" id={id} className={styles.slider} />
    </div>
  );
}

export default React.forwardRef(ForwardRefSlider);

/**
 When we use forwardRef, React will pass the ref object to the second argument of the function. This way we can use the ref object in our component.
 */
