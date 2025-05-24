import React, { useState } from 'react';
import { Eye, EyeOff, User, Mail, Phone, CreditCard, MapPin, Globe, Key } from 'lucide-react';

const RegistrationForm = () => {
  const [currentView, setCurrentView] = useState('form');
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    username: '',
    email: '',
    password: '',
    countryCode: '+1',
    phoneNumber: '',
    country: '',
    city: '',
    panNo: '',
    aadharNo: ''
  });

  const [errors, setErrors] = useState({});
  const [submittedData, setSubmittedData] = useState(null);

  const countries = {
    'United States': ['+1', ['New York', 'Los Angeles', 'Chicago', 'Houston', 'Phoenix']],
    'India': ['+91', ['Mumbai', 'Delhi', 'Bangalore', 'Chennai', 'Kolkata']],
    'United Kingdom': ['+44', ['London', 'Manchester', 'Birmingham', 'Liverpool', 'Bristol']],
    'Canada': ['+1', ['Toronto', 'Vancouver', 'Montreal', 'Calgary', 'Ottawa']],
    'Australia': ['+61', ['Sydney', 'Melbourne', 'Brisbane', 'Perth', 'Adelaide']]
  };

  const validateField = (name, value) => {
    switch (name) {
      case 'firstName':
      case 'lastName':
        return value.trim().length < 2 ? `${name === 'firstName' ? 'First' : 'Last'} name must be at least 2 characters` : '';
      
      case 'username':
        return value.length < 3 ? 'Username must be at least 3 characters' : '';
      
      case 'email':
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return !emailRegex.test(value) ? 'Please enter a valid email address' : '';
      
      case 'password':
        return value.length < 6 ? 'Password must be at least 6 characters' : '';
      
      case 'phoneNumber':
        const phoneRegex = /^\d{10}$/;
        return !phoneRegex.test(value) ? 'Phone number must be 10 digits' : '';
      
      case 'country':
        return !value ? 'Please select a country' : '';
      
      case 'city':
        return !value ? 'Please select a city' : '';
      
      case 'panNo':
        const panRegex = /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/;
        return !panRegex.test(value) ? 'PAN format: ABCDE1234F' : '';
      
      case 'aadharNo':
        const aadharRegex = /^\d{12}$/;
        return !aadharRegex.test(value) ? 'Aadhar must be 12 digits' : '';
      
      default:
        return '';
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    
    if (name === 'country') {
      setFormData(prev => ({
        ...prev,
        [name]: value,
        city: '',
        countryCode: countries[value] ? countries[value][0] : '+1'
      }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    const error = validateField(name, value);
    setErrors(prev => ({ ...prev, [name]: error }));
  };

  const validateForm = () => {
    const newErrors = {};
    Object.keys(formData).forEach(key => {
      const error = validateField(key, formData[key]);
      if (error) newErrors[key] = error;
    });
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const isFormValid = () => {
    return Object.values(formData).every(value => value.trim() !== '') &&
           Object.values(errors).every(error => error === '');
  };

  const handleSubmit = () => {
    if (validateForm() && isFormValid()) {
      setSubmittedData(formData);
      setCurrentView('success');
    }
  };

  const resetForm = () => {
    setFormData({
      firstName: '',
      lastName: '',
      username: '',
      email: '',
      password: '',
      countryCode: '+1',
      phoneNumber: '',
      country: '',
      city: '',
      panNo: '',
      aadharNo: ''
    });
    setErrors({});
    setSubmittedData(null);
    setCurrentView('form');
  };

  if (currentView === 'success' && submittedData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-xl p-8 max-w-2xl w-full">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h2 className="text-3xl font-bold text-gray-800 mb-2">Registration Successful!</h2>
            <p className="text-gray-600">Your details have been submitted successfully.</p>
          </div>

          <div className="bg-gray-50 rounded-xl p-6 space-y-4">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">Submitted Details:</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-3">
                <div>
                  <span className="font-medium text-gray-600">Name:</span>
                  <p className="text-gray-800">{submittedData.firstName} {submittedData.lastName}</p>
                </div>
                
                <div>
                  <span className="font-medium text-gray-600">Username:</span>
                  <p className="text-gray-800">{submittedData.username}</p>
                </div>
                
                <div>
                  <span className="font-medium text-gray-600">Email:</span>
                  <p className="text-gray-800">{submittedData.email}</p>
                </div>
                
                <div>
                  <span className="font-medium text-gray-600">Phone:</span>
                  <p className="text-gray-800">{submittedData.countryCode} {submittedData.phoneNumber}</p>
                </div>
                
                <div>
                  <span className="font-medium text-gray-600">Location:</span>
                  <p className="text-gray-800">{submittedData.city}, {submittedData.country}</p>
                </div>
              </div>
              
              <div className="space-y-3">
                <div>
                  <span className="font-medium text-gray-600">PAN Number:</span>
                  <p className="text-gray-800">{submittedData.panNo}</p>
                </div>
                
                <div>
                  <span className="font-medium text-gray-600">Aadhar Number:</span>
                  <p className="text-gray-800">{submittedData.aadharNo}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-8 text-center">
            <button
              onClick={resetForm}
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-8 rounded-lg transition duration-200"
            >
              Register Another User
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl p-8 max-w-2xl w-full">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Create Account</h1>
          <p className="text-gray-600">Fill in your details to register</p>
        </div>

        <div className="space-y-6">
          {/* Name Fields */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <User className="w-4 h-4 inline mr-2" />
                First Name *
              </label>
              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleInputChange}
                onBlur={handleBlur}
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition ${errors.firstName ? 'border-red-500' : 'border-gray-300'}`}
                placeholder="Enter first name"
              />
              {errors.firstName && <p className="text-red-500 text-sm mt-1">{errors.firstName}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <User className="w-4 h-4 inline mr-2" />
                Last Name *
              </label>
              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleInputChange}
                onBlur={handleBlur}
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition ${errors.lastName ? 'border-red-500' : 'border-gray-300'}`}
                placeholder="Enter last name"
              />
              {errors.lastName && <p className="text-red-500 text-sm mt-1">{errors.lastName}</p>}
            </div>
          </div>

          {/* Username */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <User className="w-4 h-4 inline mr-2" />
              Username *
            </label>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleInputChange}
              onBlur={handleBlur}
              className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition ${errors.username ? 'border-red-500' : 'border-gray-300'}`}
              placeholder="Choose a username"
            />
            {errors.username && <p className="text-red-500 text-sm mt-1">{errors.username}</p>}
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <Mail className="w-4 h-4 inline mr-2" />
              Email Address *
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              onBlur={handleBlur}
              className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition ${errors.email ? 'border-red-500' : 'border-gray-300'}`}
              placeholder="Enter your email"
            />
            {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <Key className="w-4 h-4 inline mr-2" />
              Password *
            </label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                onBlur={handleBlur}
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition pr-12 ${errors.password ? 'border-red-500' : 'border-gray-300'}`}
                placeholder="Create a password"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
            {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
          </div>

          {/* Phone Number */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <Phone className="w-4 h-4 inline mr-2" />
              Phone Number *
            </label>
            <div className="flex gap-2">
              <select
                name="countryCode"
                value={formData.countryCode}
                onChange={handleInputChange}
                className="px-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="+1">+1</option>
                <option value="+91">+91</option>
                <option value="+44">+44</option>
                <option value="+61">+61</option>
              </select>
              <input
                type="tel"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleInputChange}
                onBlur={handleBlur}
                className={`flex-1 px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition ${errors.phoneNumber ? 'border-red-500' : 'border-gray-300'}`}
                placeholder="Enter 10-digit number"
              />
            </div>
            {errors.phoneNumber && <p className="text-red-500 text-sm mt-1">{errors.phoneNumber}</p>}
          </div>

          {/* Country and City */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <Globe className="w-4 h-4 inline mr-2" />
                Country *
              </label>
              <select
                name="country"
                value={formData.country}
                onChange={handleInputChange}
                onBlur={handleBlur}
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition ${errors.country ? 'border-red-500' : 'border-gray-300'}`}
              >
                <option value="">Select Country</option>
                {Object.keys(countries).map(country => (
                  <option key={country} value={country}>{country}</option>
                ))}
              </select>
              {errors.country && <p className="text-red-500 text-sm mt-1">{errors.country}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <MapPin className="w-4 h-4 inline mr-2" />
                City *
              </label>
              <select
                name="city"
                value={formData.city}
                onChange={handleInputChange}
                onBlur={handleBlur}
                disabled={!formData.country}
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition ${errors.city ? 'border-red-500' : 'border-gray-300'} ${!formData.country ? 'bg-gray-100' : ''}`}
              >
                <option value="">Select City</option>
                {formData.country && countries[formData.country] && 
                  countries[formData.country][1].map(city => (
                    <option key={city} value={city}>{city}</option>
                  ))
                }
              </select>
              {errors.city && <p className="text-red-500 text-sm mt-1">{errors.city}</p>}
            </div>
          </div>

          {/* PAN and Aadhar */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <CreditCard className="w-4 h-4 inline mr-2" />
                PAN Number *
              </label>
              <input
                type="text"
                name="panNo"
                value={formData.panNo}
                onChange={handleInputChange}
                onBlur={handleBlur}
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition ${errors.panNo ? 'border-red-500' : 'border-gray-300'}`}
                placeholder="ABCDE1234F"
                maxLength="10"
              />
              {errors.panNo && <p className="text-red-500 text-sm mt-1">{errors.panNo}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <CreditCard className="w-4 h-4 inline mr-2" />
                Aadhar Number *
              </label>
              <input
                type="text"
                name="aadharNo"
                value={formData.aadharNo}
                onChange={handleInputChange}
                onBlur={handleBlur}
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition ${errors.aadharNo ? 'border-red-500' : 'border-gray-300'}`}
                placeholder="123456789012"
                maxLength="12"
              />
              {errors.aadharNo && <p className="text-red-500 text-sm mt-1">{errors.aadharNo}</p>}
            </div>
          </div>

          {/* Submit Button */}
          <div className="pt-4">
            <button
              type="button"
              onClick={handleSubmit}
              disabled={!isFormValid()}
              className={`w-full py-3 px-6 rounded-lg font-semibold text-white transition duration-200 ${
                isFormValid()
                  ? 'bg-blue-600 hover:bg-blue-700 cursor-pointer'
                  : 'bg-gray-400 cursor-not-allowed'
              }`}
            >
              Create Account
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegistrationForm;