import React, { useState, useEffect } from 'react'
import { Table,Button } from 'react-bootstrap';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';

function Dashboard() {
  const navigate = useNavigate();
  const location = useLocation();
  const formData = location.state;
  const [items,setItems] = useState([]);

  useEffect(() => {
    async function getData(){
        const response = await axios.get('http://localhost:5000/api/users/', formData);
        setItems(response.data);
    }
    getData();
  }, [formData]);

  function editData(item){
    navigate('/Update', { state: item });
  }
  
  function deleteData(item){
    async function deleteUser(){
      const res = await axios.delete(`http://localhost:5000/api/users/${item._id}`);    
      if(res.status === 200){ 
          alert("Profile Deleted Successfully");
          navigate('/dashboard');
      } else {
          alert("Delete Failed");
      }
    }
    deleteUser();
  }
  return (
    <div>
      <h1 className='text-center mt-3'>Dashboard</h1>
          <Table striped bordered hover className='mt-5 text-center' style={{width:"90%",marginLeft:"5%"}}>
            <tbody >
              <tr>  
                <th>First Name</th>
                <th>Last Name</th>
                <th>Email</th>
                <th>TO EDIT DATA</th>
                <th>TO DELETE DATA</th>
              </tr> 
            { items.map( (item  ) => (
              <tr key={item._id}>
                <td>{item.fname}</td>
                <td>{item.lname}</td> 
                <td>{item.email}</td>
                <td><Button onClick={()=>{editData(item)}}>EDIT</Button></td>
                <td><Button onClick={()=>{deleteData(item)}}>DELETE</Button></td>
              </tr> 
            ))}  
            </tbody>
          </Table>   
    </div>
  )
}

export default Dashboard
