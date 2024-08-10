/* eslint-disable react/no-unescaped-entities */
import { createUserWithEmailAndPassword, getAuth, updateProfile } from "firebase/auth";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";


const SignupPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    const { name, email, password } = data;

    try {
      const auth = getAuth();
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      await updateProfile(user, { displayName: name });

      Swal.fire({
        icon: "success",
        title: "Sign-up Successful",
        text: "You have successfully created an account.",
      });

      navigate("/dashboard");
    // eslint-disable-next-line no-unused-vars
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Sign-up Failed",
        text: "You have already used this email address",
      });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 lg:p-0">
      {/* Mobile Design */}
      <div className="block lg:hidden w-full bg-white shadow-md overflow-auto h-[100vh]">
        <div className="relative flex flex-col">
          <img className="w-full h-screen" src="https://i.ibb.co/G5n1735/iPhone-1.png" alt="background" />
          <div className='absolute top-10 text-center left-[50%] translate-x-[-50%]'>
            <h1 className="text-5xl text-blue-600 mb-6 ">LOGO</h1>
            <p className='text-white'>Create account<br /> Fill in Your Information</p>
          </div>
          <div className="absolute h-auto flex flex-col items-center justify-center bg-white top-[50%] md:top-[50%] rounded-t-3xl w-full"> 
            
            <h2 className="text-2xl font-bold mb-4 pt-5 text-black text-center">Sign In</h2>
            <form className="w-full px-4" onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">Name</label>
              <input
                id="name"
                type="text"
                placeholder="@username"
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                {...register("name", { required: "Name is required" })}
              />
              {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">Email</label>
              <input
                id="email"
                type="email"
                placeholder="Enter your email"
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                {...register("email", { required: "Email is required" })}
              />
              {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
            </div>
            <div className="mb-4 relative">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">Password</label>
              <input
                id="password"
                placeholder="Enter your password"
                type={showPassword ? "text" : "password"}
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 pr-10"
                {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 6,
                    message: "Password must be at least 6 characters long"
                  }
                })}
              />
              <div
                className="absolute inset-y-0 right-0 pr-3 top-7 text-lg flex items-center leading-5 cursor-pointer"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? "🙈" : "👁️"}
              </div>
              {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
            </div>
            <div className="mb-4 relative">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="confirmPassword">Confirm Password</label>
              <input
                id="confirmPassword"
                placeholder="Re-type password"
                type={showConfirmPassword ? "text" : "password"}
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 pr-10"
                {...register("confirmPassword", {
                  required: "Confirm Password is required",
                  validate: (value) => value === watch("password") || "Passwords do not match",
                })}
              />
              <div
                className="absolute inset-y-0 right-0 top-7 text-lg pr-3 flex items-center leading-5 cursor-pointer"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                {showConfirmPassword ? "🙈" : "👁️"}
              </div>
              {errors.confirmPassword && <p className="text-red-500 text-sm">{errors.confirmPassword.message}</p>}
            </div>
            <div className="mb-4">
              <label className="inline-flex items-center">
                <input
                  type="checkbox"
                  className="form-checkbox"
                  {...register("acceptTerms", { required: "You must accept the terms of service" })}
                />
                <span className="ml-2">Accept Terms of Service</span>
              </label>
              {errors.acceptTerms && <p className="text-red-500 text-sm">{errors.acceptTerms.message}</p>}
            </div>
            <button className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500">Sign up</button>
          </form>
          <p className="mt-4 text-md">
            Already Have an Account?{" "}
            <a href="/" className="text-blue-500">Log in</a>
          </p>
          </div>
        </div>
      </div>
      {/* Desktop Design */}
      <div className="hidden lg:flex gap-10 flex-row-reverse overflow-hidden w-full lg:max-w-6xl">
        <div className="lg:w-1/2 relative">
          <img src="https://i.ibb.co/y8XFwSs/Rectangle-9593.png" alt="Background" className="absolute inset-0 w-full h-full object-cover rounded-lg" />
          <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 rounded-lg">
            <h2 className="text-white text-2xl font-bold text-center bg-[#4950349f] p-10 rounded-lg">
              <a className="text-blue-600" href="#">Create Account</a> <br />Fill in Your Information
            </h2>
          </div>
        </div>
        <div className="w-full lg:w-1/2 p-8">
          <div className="flex justify-start mb-8">
            <h1 className="text-5xl text-blue-600">LOGO</h1>
          </div>
          <h2 className="text-3xl font-bold mb-6 text-left">Sign In To Your Account</h2>
          <p className="text-left mb-6">elcome Back! By click the sign up button, you are agree to
          Zenitood Terms and Service and acknlowledge the <a className="text-blue-600 underline" href="#"> Privacy and Policy</a></p>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">Name</label>
              <input
                id="name"
                type="text"
                placeholder="@username"
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                {...register("name", { required: "Name is required" })}
              />
              {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">Email</label>
              <input
                id="email"
                type="email"
                placeholder="Enter your email"
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                {...register("email", { required: "Email is required" })}
              />
              {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
            </div>
            <div className="mb-4 relative">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">Password</label>
              <input
                id="password"
                placeholder="Enter your password"
                type={showPassword ? "text" : "password"}
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 pr-10"
                {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 6,
                    message: "Password must be at least 6 characters long"
                  }
                })}
              />
              <div
                className="absolute inset-y-0 right-0 pr-3 top-7 text-lg flex items-center leading-5 cursor-pointer"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? "🙈" : "👁️"}
              </div>
              {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
            </div>
            <div className="mb-4 relative">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="confirmPassword">Confirm Password</label>
              <input
                id="confirmPassword"
                placeholder="Re-type password"
                type={showConfirmPassword ? "text" : "password"}
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 pr-10"
                {...register("confirmPassword", {
                  required: "Confirm Password is required",
                  validate: (value) => value === watch("password") || "Passwords do not match",
                })}
              />
              <div
                className="absolute inset-y-0 right-0 top-7 text-lg pr-3 flex items-center leading-5 cursor-pointer"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                {showConfirmPassword ? "🙈" : "👁️"}
              </div>
              {errors.confirmPassword && <p className="text-red-500 text-sm">{errors.confirmPassword.message}</p>}
            </div>
            <div className="mb-4">
              <label className="inline-flex items-center">
                <input
                  type="checkbox"
                  className="form-checkbox"
                  {...register("acceptTerms", { required: "You must accept the terms of service" })}
                />
                <span className="ml-2">Accept Terms of Service</span>
              </label>
              {errors.acceptTerms && <p className="text-red-500 text-sm">{errors.acceptTerms.message}</p>}
            </div>
            <button className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500">Sign up</button>
          </form>
          <p className="mt-4 text-md">
            Already Have an Account?{" "}
            <a href="/" className="text-blue-500">Log in</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;
