//The below function has bugs, it doesn't updated teh background color when the color is changed.
function App() {
  const [colors, setColors] = React.useState(["#FFD500", "#FF0040"]);

  const colorStops = colors.join(", ");
  const backgroundImage = `linear-gradient(${colorStops})`;

  return (
    <>
      <div
        style={{
          backgroundImage,
        }}
      />

      <form>
        {colors.map((color, index) => {
          const colorId = `color-${index}`;

          return (
            <div key={colorId} className="color-row">
              <label htmlFor={colorId}>Color {index + 1}:</label>
              {/* The issues lies in this input tag. When we call setState function, it check if the state has actually changed.
               If the state hasn't changed it doesn't re-render the component.
               This comparison is performed by equality operator. Here we change the color at ith index of array, but the array is same.
               Since arrays are objects and objects are compared by reference, React concludes that array hasn't changed.

               To fix this issue, we should create copy of array.
               And as a rule, we should never mutate state directly to avoid unexpected bugs.

               onChange={(event) => {
                    let nextColrs = [...colors];
                    nextColrs[index] = event.target.value;
                    setColors(nextColrs);
                }

               */}
              <input
                id={colorId}
                type="color"
                value={color}
                onChange={(event) => {
                  colors[index] = event.target.value;
                  setColors(colors);
                }}
              />
            </div>
          );
        })}
      </form>
    </>
  );
}
