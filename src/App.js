import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

function UserList() {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [pastSearches, setPastSearches] = useState([]);
  const [sortByName, setSortByName] = useState(false);

  useEffect(() => {
    const fetchUsers = async () => {
      const response = await fetch('https://jsonplaceholder.typicode.com/users');
      const data = await response.json();
      setUsers(data);
    };

    fetchUsers();
  }, []);

  useEffect(() => {
    const storedSearches = localStorage.getItem('pastSearches');
    if (storedSearches) {
      setPastSearches(JSON.parse(storedSearches));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('pastSearches', JSON.stringify(pastSearches));
  }, [pastSearches]);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSort = () => {
    setSortByName(!sortByName);
  };

  const filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const sortedUsers = sortByName
    ? filteredUsers.sort((a, b) => a.name.localeCompare(b.name))
    : filteredUsers;

  const updatePastSearches = () => {
    if (searchTerm && !pastSearches.includes(searchTerm)) {
      setPastSearches((prevSearches) => [...prevSearches, searchTerm]);
    }
  };

  return (
    <div className="container py-5 bg-light">
      <div className="row mb-3  text-items-center">
        <div className="col-md-6">
          <input
            type="text"
            placeholder="Search User by Name"
            value={searchTerm}
            onChange={handleSearch}
            className="form-control"
          />
        </div>
        <div className="col-md-6">
          <button onClick={updatePastSearches} className="btn btn-primary">
            Search
          </button>
        </div>
      </div>
      <div className="row mb-3">
        <div className="col">
          <button onClick={handleSort} className="btn btn-secondary">
            Sort by Name
          </button>
        </div>
      </div>
      <h2>Past Searches:</h2>
      <div className='container m-3'>
        {pastSearches.map((search) => (
          <span className='rounded border p-2 '>
             {search}
          </span> 
        ))}
       </div>
      <h2>Users:</h2>
      <table className="table table-striped">
      <thead>
    <tr>
      <th scope="col">Id</th>
      <th scope="col">Name</th>
      <th scope="col">Email</th>
     
    </tr>
  </thead>
  <tbody>
        {sortedUsers.map((user) => (
          <tr>
          <th scope="row">{user.id}</th>
          <td>{user.name}</td>
          <td>{user.email}</td>
        </tr>
        ))}
        </tbody>
      </table>
    </div>
  );
}

export default UserList;
