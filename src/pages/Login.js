import React from 'react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { login } from '../firebase/auth';
import { Link } from 'react-router-dom';

function Login(props) {
  const { register, handleSubmit, reset } = useForm();
  const [isLoading, setLoading] = useState(false);

  const onSubmit = async data => {
    let newUser;
    setLoading(true);
    try {
      newUser = await login(data);
      reset();
    } catch (error) {
      console.log(error);
    }
    if(newUser) {
      props.history.push(`/profile/${newUser.uid}`);
    } else {
      setLoading(false);
    }
  }

  const formClassName = `ui form ${isLoading ? 'loading' : ''}`;

  return (
    <div className="login-container">
      <div className="ui card login-card">
        <div className="content">
          <form className={formClassName} onSubmit={handleSubmit(onSubmit)}>
            <div className="field">
              <label>
                Email
                <input type="email" name="email" placeholder="Email" ref={register} />
              </label>
            </div>
            <div className="field">
              <label>
                Password
                <input type="password" name="password" placeholder="Password" ref={register} />
              </label>
            </div>

            <div className="fields actions">
                <button className="ui primary button login" type="submit">Log In</button>
                or
                <Link to="/signup">Sign Up</Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;