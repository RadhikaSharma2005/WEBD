import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Signin() {
  const [errorMsg, setErrorMsg] = useState('');
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  async function signinSubmit(e) {
    e.preventDefault();
    console.log(formData);
    if (formData.password.length === 0 || formData.phoneNo.length === 0) {
      return;
    }
    try {
        
            let res = await fetch('http://localhost:8000/login', {
                method: 'POST',
                headers: {
                  'Content-Type': "application/json",
                },
                body: JSON.stringify({
                  email: formData.email,
                  pwd: formData.password,
                }),
              });
              const result = await res.json();
              console.log("result ", result);
              if (res.status === 404) {
                setErrorMsg("Invalid username or password");
              } else {
                localStorage.setItem("token", result.token);
                navigate('/');
              }
        
        
    } catch (e) {
      console.log("sorry", e);
    }
  }

  return (
    <div>
      <div >

       

        <div >
          <h2>Welcome Back</h2>
          <p >Sign in to access your account</p>
          <form  onSubmit={signinSubmit}>

            <div>
              <label htmlFor="phoneNo" className="block text-sm font-medium text-gray-700">Mobile Number</label>
              <input
                type="mail"
                id="email"
                name="email"
                placeholder="Enter your email"
                onChange={handleChange}
                required
               />
            </div>

            <div>
              <label htmlFor="password" >Password</label>
              <input
                type="password"
                id="password"
                name="password"
                placeholder="Enter your password"
                onChange={handleChange}
                required
               />
            </div>

            
            <p >{errorMsg}</p>
            <button
              type="submit"
              >
              Log In
            </button>
          </form>
          <div >
            Don't have an account?
            <a href="/signup" >Sign Up</a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Signin;
