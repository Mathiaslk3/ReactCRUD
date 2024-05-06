import React, { useEffect, useState } from "react";

export default function Users() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((response) => response.json())
      .then((json) => setUsers(json));
  }, []);

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
      </table>
    </div>
  );
}
