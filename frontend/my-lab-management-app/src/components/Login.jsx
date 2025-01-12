import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginUser} from '../api';
import '../Login.css'



function Login () {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await loginUser({ username, password }); // Call the API
      console.log(response)
      localStorage.setItem('token', response.token); // Save JWT token
            setMessage('Login successful!');
            navigate('/dashboard');

    } catch (error) {
      setMessage(error.response?.data?.message || 'Login failed');
    }
  };

  return (
    <div className='login'>
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <div className='text_area'>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
          className='text_input'
        />
</div>
<div className='text_area'>
<input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className='text_input'
        />
        </div>

        <button type="submit" className='btn'>Login</button>
      </form>
      {message && <p>{message}</p>}

      <div>
        <image src={'/Users/trang/Downloads/Untitled%20design.svg'}></image>
      </div>
    </div>

  );
};

export default Login;
