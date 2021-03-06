import { Canvas } from '@react-three/fiber';
import React, { Suspense, useRef } from 'react';
import { useState } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Logo from '@src/components/Logo/';
import StarsModel from '@src/components/Models/components/Stars/';
import { useAuth } from '@src/utils/hooks';
import styles from './index.module.css';
import { useForm } from 'react-hook-form';

const ForgotPassword = () => {
  const { register, handleSubmit, watch } = useForm();
  const email = watch('email');
  const { resetPassword } = useAuth();
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const onSubmit = async (e) => {
    try {
      setMessage('');
      setError('');
      setLoading(true);
      await resetPassword(email);
      setMessage('Check your email for further instructions');
    } catch (e) {
      setError('Failed to reset password');
    }

    setLoading(false);
  };

  return (
    <>
      <Logo />
      <div className={styles.background}>
        <div className={styles.wrapper}>
          <h2 className="text-center mb-4">Password Reset</h2>
          {error && <Alert variant="danger">{error}</Alert>}
          {message && <Alert variant="success">{message}</Alert>}
          <Form onSubmit={handleSubmit(onSubmit)}>
            <Form.Group id="email">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                required
                {...register('email', { required: true })}
              />
            </Form.Group>
            <Button disabled={loading} className="w-100 mt-3" type="submit">
              Reset Password
            </Button>
          </Form>
          <div className="w-100 text-center mt-3">
            <Link to="/login">Login</Link>
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

export default ForgotPassword;
