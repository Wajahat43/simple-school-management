//Sometimes we have objects that don't have a unique key property. For example in the below component.

function InviteesList() {
  const [invitees, setInvitees] = React.useState([
    { name: "Alice", attending: false },
    { name: "Bob", attending: false },
    { name: "Charlie", attending: false },
  ]);

  return (
    <ul>
      {invitees.map((invitee) => {
        return (
          <li key={invitee.name}>
            <label>
              <input
                type="checkbox"
                checked={invitee.attending}
                onChange={(event) => {
                  invitee.attending = event.target.checked;
                  setInvitees(invitees);
                }}
              />
              {invitee.name}
            </label>
          </li>
        );
      })}
    </ul>
  );
}

//The above code gives warning that we should provide a unique key for each child in a list.
// We might be tempted to use the index of the array as key, but that is not recommended. Here's why
// if we change the order of the elements in the array, the key will change and React will re-render the elements.

// The best way to handle this is to add a unique id to each object in the array.
// so our invitees array will look like this:
// const [invitees, setInvitees] = React.useState([
//     { id: crypto.randomUUID(), , name: "Alice", attending: false },
//     { id: crypto.randomUUID(),, name: "Bob", attending: false },
//     { id: crypto.randomUUID(),, name: "Charlie", attending: false },
//   ]);

//It is also important that we add this ID directly to the array and don't use crypto.randomUUID() directly with key.
/**
For example
{invitees.map((invitee, index) => {
    return (
      <li key={crypto.randomUUID()}>
        <label>
          <input
            type="checkbox"
            checked={invitee.attending}
            onChange={(event) => {
              invitee.attending = event.target.checked;
              setInvitees(invitees);
            }}
          />
          {invitee.name}
        </label>
      </li>
    );
  })}
  This will cause React to re-render all the elements in the list on every state change.
  Because the key is different for each render, React will treat each element as a new element and delete the elements from Dom and
  add them again.
  So we should always use a stable key for elements in a list.
 */
