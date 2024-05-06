import{ useEffect, useState } from "react";

export default function Users() {
    const url = "https://jsonplaceholder.typicode.com/users"
    //Henter liste over Users
    const [users, setUsers] = useState([]);
    //Sætter user info
    const [newName, setNewName] = useState("")
    const [newEmail, setNewEmail] = useState("")
    const [newWebsite, setNewWebsite] = useState("")

  useEffect(() => {
    fetch(url)
      .then((response) => response.json())
      .then((json) => setUsers(json));
  }, []);

  const addUser = () =>{
    const name = newName.trim()
    const email = newEmail.trim()
    const website = newWebsite.trim()

    if (name && email && website) {
        fetch(url, {
            method:"POST",
            body: JSON.stringify({
                name,
                email,
                website,
            }),
            headers:{
                "Content-type": "application/json; charset=UTF-8",
            },
        })
        .then(res => res.json())
        .then(data => {
            setUsers([...users, data])
            setNewName("")
            setNewEmail("")
            setNewWebsite("")
            //pop-up af success besked
        })
    }
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
                <input placeholder={user.email} />
              </td>
              <td>
                <input placeholder={user.website} />
              </td>
              <td>
                <button>Opdater</button>
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
                onChange={e => setNewName(e.target.value)}
                placeholder="Add name here..."
              />
            </td>
            <td>
              <input
                placeholder="Add email here..."
                value={newEmail}
                onChange={e => setNewEmail(e.target.value)}
              />
            </td>
            <td>
              <input
                placeholder="Add website here..."
                value={newWebsite}
                onChange={e => setNewWebsite(e.target.value)}
              />
            </td>
            <td>
              <button onClick={addUser}>
                Add user
              </button>
            </td>
          </tr>
        </tfoot>
      </table>
    </div>
  );
}
