import React, { useState } from 'react'
import { Row, Col, Card, Form, Button, Alert, Container } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { useAuthContext } from './context/AuthContext'
import SocialSignIn from './SocialSignIn'

const SignUpForm = () => {
  const [user, setUser] = useState({ email: '', password: '' })
  const [showSuccessAlert, setShowSuccessAlert] = useState(false)
  const [showErrorAlert, setShowErrorAlert] = useState(false)

  const { signUp } = useAuthContext()

  // useEffect(() => console.log(user), [user])

  const handleInputChange = (event) => {
    const { name, value } = event.target
    console.log(`name == ${name} and value === ${value}`)
    setUser((prevUser) => ({ ...prevUser, [name]: value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setShowSuccessAlert(false)
    setShowErrorAlert(false)
    try {
      const res = signUp(user)
      console.log(`res: ${res}`)
      if (res) {
        setShowSuccessAlert(true)
        setTimeout(() => {
          setShowSuccessAlert(false)
        }, 5000) // Hide after 3 seconds
      } else {
        setShowErrorAlert(true)
        setTimeout(() => {
          setShowErrorAlert(false)
        }, 5000) // Hide after 3 seconds
      }
    } catch (error) {
      console.log('Error:', error)
      setShowErrorAlert(true)
      setTimeout(() => {
        setShowErrorAlert(false)
      }, 5000) // Hide after 3 seconds
    }
  }

  return (
    <div className='mt-3 d-flex justify-content-center align-items-center'>
      <Card style={{ width: '400px' }}>
        <Card.Body>
          <Card.Title className=' d-flex justify-content-center align-items-center'>
            Sign Up
          </Card.Title>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId='formEmail'>
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type='email'
                placeholder='Enter email'
                value={user.email}
                name='email'
                onChange={handleInputChange}
              />
            </Form.Group>

            <Form.Group controlId='formPassword'>
              <Form.Label>Password</Form.Label>
              <Form.Control
                type='password'
                placeholder='Enter password'
                value={user.password}
                name='password'
                onChange={handleInputChange}
              />
            </Form.Group>

            <Row className='mt-3'>
              <Col className='d-grid gap-2'>
                <Button
                  size='md'
                  className='float-end'
                  variant='primary'
                  type='submit'
                >
                  Sign Up
                </Button>
              </Col>
            </Row>
            <Row className='mt-3'>
              <Col className='d-flex justify-content-center'>
                <Link to={'/login'}>Already have an account</Link>
              </Col>
            </Row>

            <Container>
              <SocialSignIn />
            </Container>
          </Form>
        </Card.Body>
      </Card>

      {showSuccessAlert && (
        <Alert variant='success' className='position-fixed top-0 end-0 m-3'>
          Sign up successful!
        </Alert>
      )}

      {showErrorAlert && (
        <Alert variant='danger' className='position-fixed top-0 end-0 m-3'>
          Sign up failed. Please try again.
        </Alert>
      )}
    </div>
  )
}

export default SignUpForm
