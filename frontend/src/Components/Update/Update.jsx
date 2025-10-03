import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import axios from 'axios';  
import { useRef } from 'react';
import '../../App.css'

function Update() {

    const inputref = useRef();
    const location = useLocation();
    const navigate = useNavigate();
    const data = location.state;
    console.log(data);
    const [formData,setFormData] = useState(data);

    useEffect(() => {
      inputref.current.focus();
    }, [])

    function changeData(e) {
        setFormData({...formData,[e.target.name]:e.target.value})
    }
    
    async function submitData(e) {
        e.preventDefault();      
        const res = await axios.put(`http://localhost:5000/api/users/${formData._id}`, formData);
            if(res.status === 200){ 
                alert("Profile Updated Successfully");
                navigate('/dashboard');
            } else {
                alert("Update Failed");
            }   
    }

  return (
    <>
      <Container>
        <Row className='mt-3'>
          <Col md={3}>
          </Col>
          <Col md={6} className='login-box'>
            <h2 className='text-center mb-3'><b>User Profile</b></h2>
             <Form onSubmit={submitData} >
              <Form.Group className='mb-3'>
                <Form.Label><b>Fist Name</b></Form.Label>
                <Form.Control className='input1' value={formData.fname} name='fname' ref={inputref} type="text"  onChange={changeData}/>
              </Form.Group> 
              <Form.Group className='mb-3'>
                <Form.Label><b>Last Name</b></Form.Label>
                <Form.Control className='input2' value={formData.lname} name='lname' type="text"  onChange={changeData}/>
              </Form.Group> 
              <Form.Group className='mb-3'>
                <Form.Label><b>Email</b></Form.Label>
                <Form.Control className='input3' value={formData.email} name='email' type="email"  onChange={changeData}/>
              </Form.Group> 
              {/* <Form.Group className='mb-3'>
                <Form.Label><b>Password</b></Form.Label>
                <Form.Control className='input1' value={formData.password} name='password' type="password"  onChange={changeData}/>
                <span></span>
              </Form.Group>  */}
              <Button variant="success" type="submit" className='w-45 brand m-2'>
                SAVE
              </Button>
              <Button variant="success" type="button" className='w-45 brand m-2' onClick={navigate('/dashboard')}>
                BACK
              </Button>
            </Form>
          </Col> 
          <Col md={3}>
          </Col>
        </Row>
      </Container>    
    </>
  )
}

export default Update
