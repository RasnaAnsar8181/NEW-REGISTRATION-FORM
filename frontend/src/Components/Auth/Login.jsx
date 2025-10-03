import React, { useEffect, useRef, useState } from 'react'
import { Row, Col, Form, Button, Container} from 'react-bootstrap'  
import axios from 'axios'
import '../../App.css'
import { useNavigate } from 'react-router-dom'

function Login() {
  const navigate = useNavigate();
  const inputref = useRef();
  const [formData,setFormData] = useState({
    email:"",
    password:""
  })

  const changeData = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setFormData({...formData,[name]:value})
  }
  async function submitData(e){
      e.preventDefault();
      const res = await axios.post("http://localhost:5000/api/users/login",formData)
      if(res.status === 200){ 
          alert("Login Successful");
          navigate('/update', { state: res.data });
      } else {
          alert("Login Failed");
      } 
 } 
  
  useEffect(() => {
    inputref.current.focus();
  }, [])

  return (
    <>
      <Container>
        <Row className='mt-5'>
          <Col md={3}>
          </Col>
          <Col md={6} className='login-box'>
            <h2 className='text-center mb-5'><b>Welcome Back!</b></h2>
            <Form action={"/update"} onSubmit={submitData} >
              <Form.Group className='mb-3'>
                <Form.Label><b>Email</b></Form.Label>
                <Form.Control className='input1' ref={inputref} name='email' value={formData.email} type="email" placeholder="Enter your email ID" onChange={changeData}/>
              </Form.Group> 
              <Form.Group className='mb-3'>
                <Form.Label><b>Password</b></Form.Label>
                <Form.Control className='input1' type="password" name='password' value={formData.password} placeholder="Enter the correct Password" onChange={changeData}/>
                <span></span>
              </Form.Group> 
              <Button variant="success" type="submit" className='w-100 brand mt-5'>
                LOGIN
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

export default Login
