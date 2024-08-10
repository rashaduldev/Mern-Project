/* eslint-disable react/no-unescaped-entities */
/* eslint-disable no-unused-vars */
import { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { signInWithPopup, GoogleAuthProvider, FacebookAuthProvider } from 'firebase/auth';
import { FaFacebookF } from 'react-icons/fa';
import { FcGoogle } from 'react-icons/fc';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../Provider/AuthProvider';

const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const { register, handleSubmit, formState: { errors } } = useForm();
  const navigate = useNavigate();

  const { signIn , googleSignin, logOut} = useContext(AuthContext);
  console.log(signIn);
  

  const googleProvider = new GoogleAuthProvider();
  const facebookProvider = new FacebookAuthProvider();

  const handleEmailLogin = (data) => {
    const { email, password } = data;
    signIn(email, password)
      .then((res) => {
        const user = res.user;
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Login Successfully",
          showConfirmButton: false,
          timer: 1500
        });
        navigate('/');
      })
      .catch((err) => { 
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Invalid email or password!',
        });
      });
  };

  const handleGoogleSignin = () => {
    googleSignin()
      .then((res) => {
        const user = res.user;
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Login Successfully",
          showConfirmButton: false,
          timer: 1500
        });
        navigate('/');
      })
      .catch((err) => {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Google Sign-in failed!',
        });
      });
  };

  const handleFacebookSignin = () => {
    signInWithPopup()
      .then((res) => {
        const user = res.user;
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Login Successfully",
          showConfirmButton: false,
          timer: 1500
        });
        navigate('/dashboard');
      })
      .catch((err) => {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Facebook Sign-in failed!',
        });
      });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      {/* Mobile Design */}
      <div className="block lg:hidden w-full bg-white overflow-auto">
        <div className="relative">
          <img className="w-full h-screen" src="https://i.ibb.co/G5n1735/iPhone-1.png" alt="background" />
          <div className='absolute top-20 text-center left-[50%] translate-x-[-50%]'>
            <h1 className="text-5xl text-blue-600 mb-6 ">LOGO</h1>
            <p className='text-white'>Sign in to view all the <br /> message therapists</p>
          </div>
          <div className="absolute w-full flex flex-col items-center justify-center bg-white top-[50%] md:top-[50%] rounded-t-3xl px-4"> 
            
            <h2 className="text-2xl font-bold mb-4 pt-5 text-black text-center">Log In To Your Account</h2>
            <p className="text-black mb-6 text-sm text-center">Welcome Back! Select a method to log in:</p>
            <div className="flex flex-col md:flex-row justify-center mb-6">
            <button onClick={handleGoogleSignin} className="text-black mt-5 hover:bg-blue-600 hover:text-white text-xl py-2 px-4 rounded mx-2 flex items-center gap-3 border shadow-xl">
              <FcGoogle />
              Google
            </button>
              <button onClick={handleFacebookSignin} className="text-white mt-5 bg-blue-600 text-xl py-2 px-4 rounded mx-2 flex items-center gap-3 border shadow-xl">
                <FaFacebookF />
                Facebook
              </button>
            </div>
            <div className="text-center mb-6 text-black">Or Continue with Email</div>
            <form onSubmit={handleSubmit(handleEmailLogin)} className="w-full px-4">
              <div className="mb-4">
                <label className="block text-black mb=2" htmlFor="email">Email</label>
                <input
                  className="w-full p-2 border border-gray-300 rounded"
                  type="email"
                  id="email"
                  {...register('email', { required: 'Email is required' })}
                  placeholder="Enter your email"
                />
                {errors.email && <p className="text-red-600">{errors.email.message}</p>}
              </div>
              <div className="mb-6 relative">
                <label className="block text-black mb-2" htmlFor="password">Password</label>
                <input
                  className="w-full p-2 border border-gray-300 rounded"
                  type={showPassword ? "text" : "password"}
                  id="password"
                  {...register('password', { required: 'Password is required' })}
                  placeholder="Enter your password"
                />
                {errors.password && <p className="text-red-600">{errors.password.message}</p>}
                <div
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5 cursor-pointer text-black"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? '🙈' : '👁️'}
                </div>
                <div className="text-right mt-2">
                  <a href="#" className="text-blue-500 hover:underline">Forgot password?</a>
                </div>
              </div>
              <div className="flex items-center justify-between mb-4">
                <div>
                  <input
                    type="checkbox"
                    id="rememberMe"
                    className="mr-2 leading-tight"
                    {...register('rememberMe', { required: 'Please check Remember me' })}
                  />
                  <label htmlFor="rememberMe" className="text-black">Remember me</label>
                </div>
                {errors.rememberMe && <p className="text-red-600">{errors.rememberMe.message}</p>}
              </div>
              <button
                type="submit"
                className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded w-full"
              >
                Sign In
              </button>
            </form>
            <div className="text-center mt-4 text-black">
              Don't Have an Account? <a href="/signup" className="text-blue-500 hover:underline">Create Account</a>
            </div>
          </div>
        </div>
      </div>
      {/* Desktop Design */}
      <div className="hidden lg:flex flex-row-reverse overflow-hidden w-full lg:max-w-6xl gap-10">
        <div className="lg:w-1/2 relative">
          <img src="https://i.ibb.co/y8XFwSs/Rectangle-9593.png" alt="Background" className="absolute inset-0 w-full h-full object-cover rounded-lg" />
          <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 rounded-lg">
            <h2 className="text-white text-2xl font-bold text-center bg-[#4950349f] p-10 rounded-lg">
              <a className="text-blue-600" href="#">Sign In</a> to view all the <br /> massage therapists
            </h2>
          </div>
        </div>
        <div className="w-full lg:w-1/2 p-8">
          <div className="flex justify-start mb-8">
            <h1 className="text-5xl text-blue-600">LOGO</h1>
          </div>
          <h2 className="text-3xl font-bold mb-6 text-left">Log In To Your Account</h2>
          <p className="text-left mb-6">Welcome Back! Select a method to log in:</p>
          <div className="flex justify-center mb-6">
            <button onClick={handleGoogleSignin} className="text-black hover:text-white hover:bg-blue-600 text-xl py-3 px-8 rounded mx-2 flex items-center gap-3 border">
              <FcGoogle />
              Google
            </button>
            <button onClick={handleFacebookSignin} className="text-white bg-blue-600 text-xl py-3 px-8 rounded mx-2 flex items-center gap-3 border">
              <FaFacebookF />
              Facebook
            </button>
          </div>
          <div className="text-center mb-6">Or Continue with Email</div>
          <form onSubmit={handleSubmit(handleEmailLogin)}>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2" htmlFor="email">Email</label>
              <input
                className="w-full p-2 border border-gray-300 rounded"
                type="email"
                id="email"
                {...register('email', { required: 'Email is required' })}
                placeholder="Enter your email"
              />
              {errors.email && <p className="text-red-600">{errors.email.message}</p>}
            </div>
            <div className="mb-6 relative">
              <label className="block text-gray-700 mb-2" htmlFor="password">Password</label>
              <input
                className="w-full p-2 border border-gray-300 rounded"
                type={showPassword ? "text" : "password"}
                id="password"
                {...register('password', { required: 'Password is required' })}
                placeholder="Enter your password"
              />
              {errors.password && <p className="text-red-600">{errors.password.message}</p>}
              <div
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5 cursor-pointer"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? '🙈' : '👁️'}
              </div>
              <div className="text-right mt-2">
                <a href="#" className="text-blue-500 hover:underline">Forgot password?</a>
              </div>
            </div>
            <div className="flex items-center justify-between mb-4">
              <div>
                <input
                  type="checkbox"
                  id="rememberMe"
                  className="mr-2 leading-tight"
                  {...register('rememberMe', { required: 'Please check Remember me' })}
                />
                <label htmlFor="rememberMe" className="text-gray-700">Remember me</label>
              </div>
              {errors.rememberMe && <p className="text-red-600">{errors.rememberMe.message}</p>}
            </div>
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded w-full"
            >
              Sign In
            </button>
          </form>
          <div className="text-center mt-4">
            Don't Have an Account? <a href="/signup" className="text-blue-500 hover:underline">Create Account</a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
