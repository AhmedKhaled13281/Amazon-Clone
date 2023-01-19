import React , {useRef} from 'react'
import {Link} from 'react-router-dom'
import { useForm } from "react-hook-form";
import { useNavigate } from 'react-router-dom';
import { useDispatch} from 'react-redux';
import { registerInit } from '../Redux/actions';

const Register = () => {

    const navigate = useNavigate(); 
    const dispatch = useDispatch()

    const defaultValues = {name: '' , email : '' , password : '' , rePassword : ''}
    const {register , handleSubmit , formState : {errors} , watch} = useForm({defaultValues : defaultValues })
    const password = useRef({});
    password.current = watch("password", "");
    
    const handleSubmitForm = (data , e) => {
        e.preventDefault();
        if(errors && data.password === data.rePassword){
            dispatch(registerInit(data.email , data.password))
            navigate("/")
        }
    }
  return (
    <form onSubmit={handleSubmit(handleSubmitForm)}>
      <div className='my-[30px] flex flex-col justify-center items-center m-[auto]'>
        <div className="">
          <Link to="/" className="w-[auto]">
            <img
              className="w-[100px] mr-10 ml-5 object-contain mt-18"
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Amazon_logo.svg/1200px-Amazon_logo.svg.png"
              alt="Amazon Logo"
            />
          </Link>
        </div>
        <div className="xl:w-[40%]  my-[20px] p-[30px] border-solid border-2 border-grey md:w-[60%] sm:w-[90%]">
          <h2 className="font-medium text-3xl mb-[10px]">Create Account</h2>

          <p>Enter Your Name</p>
          <input
            className='p-[10px] w-[100%] border-solid border-2 border-grey'
            type="text"
            {...register("name", {
              required: "Please Enter A Valid Name e.g : ahmed",
              pattern: "/^[a-z ,.'-]+$/i",
            })}
            placeholder = "e.g : ahmed"
          />
          <p className="mb-[20px] text-red-600">{errors.name?.message}</p>

          <p>Enter Your Email</p>
          <input
            className='p-[10px] w-[100%] border-solid border-2 border-grey'
            type="email"
            {...register("email", {
              required: "Please Enter A Valid Email e.g : ahmed@gmail.com",
              pattern: "[a-z0-9]+@[a-z]+.[a-z]{2,3}",
            })}
            placeholder = "e.g : ahmed@gmail.com"
          />
          <p className="text-red-600">{errors.email?.message}</p>

          <p className="mt-[20px]">Enter Your Password</p>
          <input
            className='p-[10px] w-[100%] border-solid border-2 border-grey'
            type="password"
            {...register("password", {
              required: "Please Enter Your Password",
              minLength: {
                value: 6,
                message: "Minimum Length is 6",
              },
            })}
            placeholder = "e.g : a@5422"
          />
          <p className="text-red-600">{errors.password?.message}</p>

          <p className="mt-[20px]">Re-Enter Your Password</p>
          <input
            className='p-[10px] w-[100%] border-solid border-2 border-grey'
            type="password"
            {...register("rePassword", {
              required: "Please Enter Your Confirm Password",
              minLength: {
                value: 6,
                message: "Minimum Length is 6",
              },
              validate: value =>
              value === password.current || "The passwords do not match"
            })}
            placeholder = "e.g : a@5422"
          />
          <p className="text-red-600">{errors.rePassword?.message}</p>
          <button type="submit" className="mt-[20px] bg-[#EFBE44] p-[10px] w-[100%] rounded-md">Submit</button>

        </div>

      </div>
    </form>
  );
}

export default Register