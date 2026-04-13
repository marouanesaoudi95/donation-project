import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    surname: '',
    phone: '',
    email: '',
    password: '',
    agree: false
  });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({ 
      ...formData, 
      [name]: type === 'checkbox' ? checked : value 
    });
  };

  const handleSignUp = async (e) => {
    if (e) e.preventDefault();
    const { name, surname, phone, email, password, agree } = formData;

    // Following the exact validation structure requested by user
    if (!agree) {
      alert("You must agree to the terms!");
      return;
    }

    if (!name.trim() || !surname.trim() || !phone.trim() || !email.trim() || !password.trim()) {
      alert("All fields are required!");
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      const response = await fetch('http://localhost:5000/api/v1/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: `${name.trim()} ${surname.trim()}`, // Combining surname for backend compatibility
          email: email.trim(),
          password: password.trim(),
          phone: phone.trim(),
          role: 'donor' // Default role
        }),
      });

      const data = await response.json();

      if (response.ok) {
        alert('Registration successful!');
        // Similar to requested AsyncStorage, but for web we use localStorage if needed
        if (data.user) {
          localStorage.setItem('userId', data.user.id);
        }
        navigate('/login');
      } else {
        const msg = data.msg || 'Registration failed';
        setError(msg);
        alert(msg);
      }
    } catch (error) {
      alert(`Error: ${error.message}`);
      console.error('Registration error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2>Join Us</h2>
        <p className="auth-subtitle">Create an account to start donating</p>
        
        {error && <div className="error-message">{error}</div>}
        
        <form onSubmit={handleSignUp}>
          <div className="form-group-row" style={{ display: 'flex', gap: '10px' }}>
            <div className="form-group" style={{ flex: 1 }}>
              <label>Name</label>
              <input
                name="name"
                type="text"
                value={formData.name}
                onChange={handleChange}
                placeholder="Name"
                required
              />
            </div>
            <div className="form-group" style={{ flex: 1 }}>
              <label>Surname</label>
              <input
                name="surname"
                type="text"
                value={formData.surname}
                onChange={handleChange}
                placeholder="Surname"
                required
              />
            </div>
          </div>

          <div className="form-group">
            <label>Email Address</label>
            <input
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="name@example.com"
              required
            />
          </div>
          
          <div className="form-group">
            <label>Password</label>
            <input
              name="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="••••••••"
              required
            />
          </div>

          <div className="form-group">
            <label>Phone Number</label>
            <input
              name="phone"
              type="text"
              value={formData.phone}
              onChange={handleChange}
              placeholder="+1 234 567 890"
              required
            />
          </div>

          <div className="form-group" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <input
              name="agree"
              type="checkbox"
              style={{ width: 'auto' }}
              checked={formData.agree}
              onChange={handleChange}
              id="agree"
            />
            <label htmlFor="agree" style={{ margin: 0 }}>I agree to the terms and conditions</label>
          </div>
          
          <button type="submit" className="btn-primary" disabled={isLoading}>
            {isLoading ? 'Creating account...' : 'Create Account'}
          </button>
        </form>
        
        <p className="auth-footer">
          Already have an account? <Link to="/login">Sign in</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
