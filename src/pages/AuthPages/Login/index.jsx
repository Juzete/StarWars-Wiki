import { Canvas } from '@react-three/fiber';
import React, { Suspense, useRef } from 'react';
import { useState } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';
import { Link, useHistory } from 'react-router-dom';
import Logo from '@src/components/Logo/';
import StarsModel from '@src/components/Models/components/Stars/';
import { useAuth } from '@src/utils/hooks';
import styles from './index.module.css';
import { useForm } from 'react-hook-form';

const Login = () => {
  const { register, handleSubmit, watch } = useForm();
  const email = watch('email');
  const password = watch('password');
  const { login } = useAuth();
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const history = useHistory();

  const onSubmit = async (e) => {
    try {
      setError('');
      setLoading(true);
      await login(email, password);
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
          <div className={styles.error}>
            {' '}
            {error && <Alert variant="danger">{error}</Alert>}
          </div>
          <Form onSubmit={handleSubmit(onSubmit)}>
            <Form.Group id="email">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                {...register('email', { required: true })}
              />
            </Form.Group>
            <Form.Group id="password">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                {...register('password', { required: true })}
              />
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
