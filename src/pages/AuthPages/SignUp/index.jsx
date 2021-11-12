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

const SignUp = () => {
  const { register, handleSubmit, watch } = useForm();
  const email = watch('email');
  const password = watch('password');
  const passwordConfirm = watch('passwordConfirm');
  const { signUp } = useAuth();
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const history = useHistory();

  const onSubmit = async (e) => {
    if (password !== passwordConfirm) {
      return setError('Password do not match');
    }

    try {
      setError('');
      setLoading(true);
      await signUp(email, password);
      history.push('/');
    } catch {
      setError('Failed to create an account');
    }

    setLoading(false);
  };

  return (
    <>
      <Logo />
      <div className={styles.background}>
        <div className={styles.wrapper}>
          <h2 className="text-center mb-4">Sign Up</h2>
          {error && <Alert variant="danger">{error}</Alert>}
          <Form onSubmit={handleSubmit(onSubmit)}>
            <Form.Group id="email">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                required
                {...register('email', { required: true })}
              />
            </Form.Group>
            <Form.Group id="password">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                required
                {...register('password', { required: true })}
              />
            </Form.Group>
            <Form.Group id="password-confirm">
              <Form.Label>Password Confirmation</Form.Label>
              <Form.Control
                type="password"
                required
                {...register('passwordConfirm', { required: true })}
              />
            </Form.Group>
            <Button disabled={loading} className="w-100 mt-3" type="submit">
              Sign Up
            </Button>
          </Form>
          <div className="w-100 text-center mt-2">
            Already have an account? <Link to="/login">Log In</Link>
          </div>
        </div>
        <div className={styles.stars}>
          <Canvas>
            <Suspense fallback={null}>
              <StarsModel />
            </Suspense>
          </Canvas>
        </div>
      </div>
    </>
  );
};

export default SignUp;
