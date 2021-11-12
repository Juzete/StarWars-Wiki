import { Canvas } from '@react-three/fiber';
import React, { Suspense, useRef } from 'react';
import { useState } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';
import { Link, useHistory } from 'react-router-dom';
import Logo from '@src/components/Logo/';
import StarsModel from '@src/components/Models/components/Stars/';
import { useAuth } from '@src/utils/hooks';
import styles from './index.module.css';

const Login = () => {
  const emailRef = useRef();
  const passwordRef = useRef();
  const { login } = useAuth();
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const history = useHistory();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setError('');
      setLoading(true);
      await login(emailRef.current.value, passwordRef.current.value);
      history.push('/');
    } catch (e) {
      setError('Failed to log in');
    }

    setLoading(false);
  };

  return (
    <>
      <Logo />
      <div className={styles.background}>
        <div className={styles.wrapper}>
          <h2 className="text-center mb-4">Log In</h2>
          {error && <Alert variant="danger">{error}</Alert>}
          <Form onSubmit={handleSubmit}>
            <Form.Group id="email">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" ref={emailRef} required />
            </Form.Group>
            <Form.Group id="password">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" ref={passwordRef} required />
            </Form.Group>
            <Button disabled={loading} className="w-100 mt-3" type="submit">
              Log In
            </Button>
          </Form>
          <div className="w-100 text-center mt-3">
            <Link to="/forgot-password">Forgot Password?</Link>
          </div>
          <div className="w-100 text-center mt-2">
            Need an account? <Link to="/signup">Sign Up</Link>
          </div>
          <div className={styles.stars}>
            <Canvas>
              <Suspense fallback={null}>
                <StarsModel />
              </Suspense>
            </Canvas>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
