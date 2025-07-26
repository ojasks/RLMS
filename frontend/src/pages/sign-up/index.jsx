// src/pages/SignupScreen.jsx
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useRegisterUserMutation } from '../../features/api/authApi';
import Icon from '../../components/AppIcon';

const SignupScreen = () => {
  const navigate = useNavigate();
  const [registerUser] = useRegisterUserMutation();
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.username.trim()) {
      newErrors.username = 'Username is required';
    }
    
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!validateEmail(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsLoading(true);
    try {
      await registerUser({
        username: formData.username,
        email: formData.email,
        password: formData.password
      }).unwrap();
      
      navigate('/login-screen');
    } catch (error) {
      setErrors({
        general: error.data?.message || 'Registration failed. Please try again.'
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-secondary-50 to-accent-50 flex items-center justify-center px-4 py-8">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width=%2260%22 height=%2260%22 viewBox=%220 0 60 60%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cg fill=%22none%22 fill-rule=%22evenodd%22%3E%3Cg fill=%22%23000000%22 fill-opacity=%220.1%22%3E%3Ccircle cx=%227%22 cy=%227%22 r=%221%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] bg-repeat"></div>
      </div>

      {/* Main Signup Card */}
      <div className="relative w-full max-w-md">
        <div className="bg-surface rounded-lg shadow-lg border border-border p-8">
          {/* Logo and Header */}
          <div className="text-center mb-8">
            <div className="flex items-center justify-center w-16 h-16 bg-primary rounded-lg mx-auto mb-4">
              <Icon name="Microscope" size={32} color="white" />
            </div>
            <h1 className="text-2xl font-bold text-text-primary mb-2">Create Account</h1>
            <p className="text-text-secondary text-sm">
              Register for SecureLab Dashboard access
            </p>
          </div>

          {/* Signup Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {errors.general && (
              <div className="bg-error-50 border border-error-200 rounded-md p-3 flex items-center space-x-2">
                <Icon name="AlertCircle" size={16} className="text-error-500 flex-shrink-0" />
                <span className="text-sm text-error-700">{errors.general}</span>
              </div>
            )}

            {/* Username Field */}
            <div>
              <label htmlFor="username" className="block text-sm font-medium text-text-primary mb-2">
                Username
              </label>
              <div className="relative">
                <input
                  type="text"
                  id="username"
                  name="username"
                  value={formData.username}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-3 pl-10 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-colors duration-200 ${
                    errors.username ? 'border-error-300 bg-error-50' : 'border-border bg-surface'
                  }`}
                  placeholder="Choose a username"
                  disabled={isLoading}
                />
                <Icon 
                  name="User" 
                  size={18} 
                  className={`absolute left-3 top-1/2 transform -translate-y-1/2 ${
                    errors.username ? 'text-error-400' : 'text-text-secondary'
                  }`} 
                />
              </div>
              {errors.username && (
                <p className="mt-1 text-sm text-error-600 flex items-center space-x-1">
                  <Icon name="AlertCircle" size={14} />
                  <span>{errors.username}</span>
                </p>
              )}
            </div>

            {/* Email Field */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-text-primary mb-2">
                Email Address
              </label>
              <div className="relative">
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-3 pl-10 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-colors duration-200 ${
                    errors.email ? 'border-error-300 bg-error-50' : 'border-border bg-surface'
                  }`}
                  placeholder="Enter your email"
                  disabled={isLoading}
                />
                <Icon 
                  name="Mail" 
                  size={18} 
                  className={`absolute left-3 top-1/2 transform -translate-y-1/2 ${
                    errors.email ? 'text-error-400' : 'text-text-secondary'
                  }`} 
                />
              </div>
              {errors.email && (
                <p className="mt-1 text-sm text-error-600 flex items-center space-x-1">
                  <Icon name="AlertCircle" size={14} />
                  <span>{errors.email}</span>
                </p>
              )}
            </div>

            {/* Password Field */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-text-primary mb-2">
                Password
              </label>
              <div className="relative">
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-3 pl-10 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-colors duration-200 ${
                    errors.password ? 'border-error-300 bg-error-50' : 'border-border bg-surface'
                  }`}
                  placeholder="Create a password"
                  disabled={isLoading}
                />
                <Icon 
                  name="Lock" 
                  size={18} 
                  className={`absolute left-3 top-1/2 transform -translate-y-1/2 ${
                    errors.password ? 'text-error-400' : 'text-text-secondary'
                  }`} 
                />
              </div>
              {errors.password && (
                <p className="mt-1 text-sm text-error-600 flex items-center space-x-1">
                  <Icon name="AlertCircle" size={14} />
                  <span>{errors.password}</span>
                </p>
              )}
            </div>

            {/* Confirm Password Field */}
            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-text-primary mb-2">
                Confirm Password
              </label>
              <div className="relative">
                <input
                  type="password"
                  id="confirmPassword"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-3 pl-10 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-colors duration-200 ${
                    errors.confirmPassword ? 'border-error-300 bg-error-50' : 'border-border bg-surface'
                  }`}
                  placeholder="Confirm your password"
                  disabled={isLoading}
                />
                <Icon 
                  name="Lock" 
                  size={18} 
                  className={`absolute left-3 top-1/2 transform -translate-y-1/2 ${
                    errors.confirmPassword ? 'text-error-400' : 'text-text-secondary'
                  }`} 
                />
              </div>
              {errors.confirmPassword && (
                <p className="mt-1 text-sm text-error-600 flex items-center space-x-1">
                  <Icon name="AlertCircle" size={14} />
                  <span>{errors.confirmPassword}</span>
                </p>
              )}
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-primary text-white py-3 px-4 rounded-md hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 transition-colors duration-200 font-medium disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2 mt-6"
            >
              {isLoading ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>
                  <span>Creating account...</span>
                </>
              ) : (
                <>
                  <Icon name="UserPlus" size={18} />
                  <span>Sign Up</span>
                </>
              )}
            </button>
          </form>

          <div className="mt-6 text-center text-sm text-text-secondary">
            Already have an account?{' '}
            <Link to="/login-screen" className="text-primary hover:text-primary-700">
              Log in
            </Link>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="absolute bottom-4 left-0 right-0 text-center">
        <div className="flex items-center justify-center space-x-6 text-xs text-text-secondary">
          <span>© {new Date().getFullYear()} SecureLab Systems</span>
        </div>
      </footer>
    </div>
  );
};

export default SignupScreen;