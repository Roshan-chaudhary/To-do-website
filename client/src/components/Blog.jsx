import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Blog() {
  const [users, setUsers] = useState([]);
  const [render, setRender] = useState(false);
  const [inputs, setInputs] = useState({
    title: "",
    des: "",
    
  });
  
  const [updateId, setUpdateId] = useState(null); // State to store the ID of the post being updated

  useEffect(() => {
    const getAllUsers = async () => {
      try {
        const getAllData = await axios.get("http://localhost:8002/usersapi");
        setUsers(getAllData.data);
      } catch (error) {
        console.log(error);
      }
    };
    getAllUsers();
  }, [render]);

  const formdata = new FormData();
  formdata.append("title", inputs.title);
  formdata.append("des", inputs.des);
  
   // Append active status to form data

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (updateId) {
        // If updateId exists, it's an update operation
        await axios.put(`http://localhost:8002/users/update/${updateId}`, formdata);
        alert("Post updated successfully!");
      } else {
        // If updateId is null, it's a post operation
        await axios.post("http://localhost:8002/users", formdata);
        alert("Post created successfully!");
      }
      setRender(!render); // Toggle render to refresh user data
      setInputs({
        title: "",
        des: "",
        
      });
      
      setUpdateId(null); // Reset updateId after operation
    } catch (error) {
      console.log(error);
      alert(error);
    }
  };

  
  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8002/users/${id}`);
      setRender(!render); // Refresh user data after deletion
    } catch (error) {
      console.log(error);
      alert(error);
    }
  };

  const handleUpdate = (id) => {
    const updateUser = users.find(user => user._id === id);
    // Set active to true if it's falsy
    setInputs({
      title: updateUser.title,
      des: updateUser.des,
      
    });
   // Update the image state as well
    setUpdateId(id); // Set the ID of the post being updated
  };

  

  return (
    <div className="container">
      <h1 className='text-center text-3xl font-bold my-10  '   >To-Do App</h1>
      <div className="row">
        <div className="col-md-6">
          <form onSubmit={handleSubmit} encType="multipart/form-data">
            <div className="mb-3">
              <label htmlFor="exampleInputEmail1" className="form-label">Title</label>
              <input type="text" value={inputs.title} onChange={(e) => setInputs({ ...inputs, [e.target.name]: e.target.value })} name="title" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
            </div>
            <div className="mb-3">
              <label htmlFor="exampleInputPassword1" className="form-label  ">Description</label>
              <textarea type="text" value={inputs.des} onChange={(e) => setInputs({ ...inputs, [e.target.name]: e.target.value })} name='des' className="form-control" id="exampleInputPassword1" />
            </div>
            
            
            <button type="submit" className="btn btn-primary">{updateId ? 'Update' : 'Submit'}</button>
          </form>
        </div>
    
        <div className="col-md-6">
          <table className="table">
            <thead>
              <tr>
                <th scope="col">Date</th>
                <th scope="col">Title</th>
                <th scope="col">Description</th>
                <th scope="col">Actions</th>
              </tr>
            </thead>
            <tbody>
              {users && users.map((user) => (
                <tr key={user._id}>
                  <td>{user.date}</td>
                  <td>{user.title}</td>
                  <td>{user.des}</td>
                  
                  <td>
                    <button className="btn btn-danger" onClick={() => handleDelete(user._id)}>Delete</button>
                    <button className="btn btn-primary" onClick={() => handleUpdate(user._id)}>Update</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Blog;

