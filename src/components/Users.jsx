import { useEffect, useState } from "react";

export default function Users() {
  const url = "https://jsonplaceholder.typicode.com/users";
  //Henter liste over Users
  const [users, setUsers] = useState([]);
  //Sætter user info
  const [newName, setNewName] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [newWebsite, setNewWebsite] = useState("");

  useEffect(() => {
    fetch(url)
      .then((response) => response.json())
      .then((json) => setUsers(json));
  }, []);

  const addUser = () => {
    const name = newName.trim();
    const email = newEmail.trim();
    const website = newWebsite.trim();

    if (name && email && website) {
      fetch(url, {
        method: "POST",
        body: JSON.stringify({
          name,
          email,
          website,
        }),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      })
        .then((res) => res.json())
        .then((data) => {
          setUsers([...users, data]);
          setNewName("");
          setNewEmail("");
          setNewWebsite("");
          //pop-up af success besked
            console.log(name, "blev tilføjet til listen")
        });
    }
  };

  
  const updateUser = id => {
    const user = users.find(user => user.id === id)

    fetch(`https://jsonplaceholder.typicode.com/users/${id}`, {
      method: "PUT",
      body: JSON.stringify(user),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then(response => response.json())
  }

  const onChangeHandler = (id, key, value) => {
    setUsers(values => {
      return values.map(item =>
        item.id === id ? { ...item, [key]: value } : item
      )
    })
  }

  return (
    <div>
      <h1>Test brugere</h1>
      <table>
        <thead>
          <tr>
            <th>Id</th>
            <th>Name</th>
            <th>Email</th>
            <th>Website</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.name}</td>
              <td>
                <input 
                value={user.email}
                onChange={value => onChangeHandler(user.id, "email", value)}
                />
              </td>
              <td>
                <input 
                value={user.website}
                onChange={value => onChangeHandler(user.id, "website", value)}
                />
              </td>
              <td>
                <button onClick={() => updateUser(user.id)}>Opdater</button>
                &nbsp;
                <button>Slet</button>
              </td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr>
            <td></td>
            <td>
              <input
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
                placeholder='Navn'
              />
            </td>
            <td>
              <input
                placeholder='Email'
                value={newEmail}
                onChange={(e) => setNewEmail(e.target.value)}
              />
            </td>
            <td>
              <input
                placeholder='Hjemmeside'
                value={newWebsite}
                onChange={(e) => setNewWebsite(e.target.value)}
              />
            </td>
            <td>
              <button onClick={addUser}>Add user</button>
            </td>
          </tr>
        </tfoot>
      </table>
    </div>
  );
}
