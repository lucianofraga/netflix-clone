import { useRef } from 'react';
import './sign-up.styles.css';
import { signUp, signIn } from '../../firebase';

const SignUp = () => {
  const emailRef = useRef(null);
  const passwordRef = useRef(null);

  const signUpHandler = (e) => {
    e.preventDefault();
    console.log('register');

    if (!emailRef.current.value || !passwordRef.current.value) {
      return;
    }

    signUp(emailRef.current.value, passwordRef.current.value)
      .then((res) => {
        console.log('user', res);
      })
      .catch((err) => {
        console.error(err?.message);
      });
  };

  const signInHandler = (e) => {
    e.preventDefault();
    console.log('sign in');
    signIn(emailRef.current.value, passwordRef.current.value)
      .then((res) => {
        console.log('user', res);
      })
      .catch((err) => {
        console.error(err?.message);
      });
    };
    
  return (
    <div className="signUp">
      <form onSubmit={signInHandler}>
        <h1>Sign In</h1>
        <input type="email" placeholder="Email" ref={emailRef} />
        <input type="password" placeholder="Password" ref={passwordRef} />
        <button type="submit">
          Sign In
        </button>
        <h4>
          <span className="signUp__gray">New to Netflix?</span>
          <span className="signUp__link" onClick={signUpHandler}>
            Sign Up now.
          </span>
        </h4>
      </form>
    </div>
  );
};

export default SignUp;
