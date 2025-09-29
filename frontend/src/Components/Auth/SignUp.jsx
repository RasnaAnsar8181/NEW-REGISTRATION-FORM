import React, { useEffect, useRef, useState } from 'react'
import { Col, Container, Row, Form, Button } from 'react-bootstrap'
import axios from 'axios';

function SignUp() {

  const [formData,setFormData] = useState({
    fname:"",
    lname:"",
    email:"",
    password:""
  });

  const inputref = useRef();

  useEffect(() => {
    inputref.current.focus();
  }, [])

  const changeData = (e) => {
    setFormData({...formData,[e.target.name]:e.target.value}) 
  }

  const submitData = async (e) => {
    e.preventDefault();
    const res = await axios.post("http://localhost:5000/api/users/register",formData);
    if(res.status === 201){
      alert("Registration Successful");
      setFormData({
        fname:"",
        lname:"",
        email:"",
        password:""
      })
    } else {
      alert("Registration Failed");
    }   
  }

  return (
    <>
      <Container>
        <Row className='mt-5'>
          <Col md={3}>
          </Col>
          <Col md={6} className='login-box'>
            <h2 className='text-center mb-5'><b>Welcome!</b></h2>
            <Form onSubmit={submitData} action={"/"}>
              <Form.Group className='mb-3'>
                <Form.Label><b>Fist Name</b></Form.Label>
                <Form.Control className='input1' value={formData.fname} name='fname' ref={inputref} type="text" placeholder="Enter your First Name" onChange={changeData}/>
              </Form.Group> 
              <Form.Group className='mb-3'>
                <Form.Label><b>Last Name</b></Form.Label>
                <Form.Control className='input1' value={formData.lname} name='lname' type="text" placeholder="Enter your Last Name" onChange={changeData}/>
              </Form.Group> 
              <Form.Group className='mb-3'>
                <Form.Label><b>Email</b></Form.Label>
                <Form.Control className='input1' value={formData.email} name='email' type="email" placeholder="Enter your email ID" onChange={changeData}/>
              </Form.Group> 
              <Form.Group className='mb-3'>
                <Form.Label><b>Password</b></Form.Label>
                <Form.Control className='input1' value={formData.password} name='password' type="password" placeholder="Enter the correct Password" onChange={changeData}/>
                <span></span>
              </Form.Group> 
              <Button variant="success" type="submit" className='w-100 brand mt-5'>
                SIGN UP
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

export default SignUp
