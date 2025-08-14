import React, { useState } from 'react';
import EmailInput from '../../components/EmailInput';
import PasswordInput from '../../components/PasswordInput';
import Button from '../../components/Button';
import aspectLogo from '../../assets/aspect-logo-primary.svg';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const handleEmailChange = (value: string) => {
    setEmail(value);
    if (emailError) setEmailError('');
  };

  const handlePasswordChange = (value: string) => {
    setPassword(value);
    if (passwordError) setPasswordError('');
  };

  const handleLogin = () => {
    if (!email) {
      setEmailError('Email is required');
      return;
    }
    if (!password) {
      setPasswordError('Password is required');
      return;
    }
    };

  return (
    <div className="min-h-screen flex items-center justify-center px-2">
      <div className="max-w-md w-full flex flex-col items-stretch gap-6 px-8 py-14 bg-white rounded-lg">
        {/* Logo */}
        <div className="flex justify-center mb-4">
          <img 
            src={aspectLogo} 
            alt="Aspect Logo" 
            className="h-12 w-auto"
          />
        </div>

        {/* Form */}
        <div className="flex flex-col items-center gap-4">
          <EmailInput
            value={email}
            onChange={handleEmailChange}
            label="Username"
            placeholder="Enter your username or email"
            required
            error={emailError}
          />

          <PasswordInput
            value={password}
            onChange={handlePasswordChange}
            label="Password"
            placeholder="Enter your password"
            required
            error={passwordError}
          />

          {/* Login Button */}
          <Button
            onClick={handleLogin}
            type="submit"
            variant="primary"
            size="lg"
            className="w-full mt-4"
          >
            Login
          </Button>
        </div>

        {/* Forgot Password Link */}
        <a 
            href="/forgot-password" 
            className="text-sm text-center underline-offset-2 hover:underline"
        >
            Forgot password?
        </a>


      </div>
    </div>
  );
};

export default Login;
