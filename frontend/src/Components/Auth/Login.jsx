import React, { useEffect, useRef } from 'react'
import { Row, Col, Form, Button, Container} from 'react-bootstrap'  

function Login() {
  const inputref = useRef();
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
            <Form action={"/dashboard"} onSubmit={submitData} >
              <Form.Group className='mb-3'>
                <Form.Label><b>Email</b></Form.Label>
                <Form.Control className='input1' ref={inputref} type="email" placeholder="Enter your email ID" />
              </Form.Group> 
              <Form.Group className='mb-3'>
                <Form.Label><b>Password</b></Form.Label>
                <Form.Control className='input1' type="password" placeholder="Enter the correct Password" />
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
