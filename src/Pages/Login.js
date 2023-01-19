import React , {useEffect} from 'react'
import { loginInit } from '../Redux/actions';
import { useNavigate } from 'react-router-dom';
import {Link} from 'react-router-dom'
import { useForm } from "react-hook-form";
import { useDispatch , useSelector} from 'react-redux';

const Login = () => {
    const navigate = useNavigate();
    const {user , error} = useSelector(state => state.auth)
    const dispatch = useDispatch()
    const defaultValues = {email : '' , password : ''}
    const {register , handleSubmit , formState : {errors}} = useForm({defaultValues : defaultValues})
    console.log(error)
    useEffect(() => {
        if(user)
           navigate("/")
    }, [user , navigate])

    const handleSubmitForm = (data , e) => {
        e.preventDefault();
        if(errors){
            dispatch(loginInit(data.email , data.password))
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
          {error && <h1 className='text-red-500 text-center bg-[#cccccc] p-3 rounded-lg mt-[2rem]'>{error}</h1>}
        <div className="xl:w-[40%]  my-[20px] p-[30px] border-solid border-2 border-grey md:w-[60%] sm:w-[90%]">
          <h2 className="font-medium text-3xl mb-[10px]">Login</h2>

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

                <button type="submit" className="mt-[20px] bg-[#EFBE44] p-[10px] w-[100%] rounded-md">Submit</button>

        </div>
        <div>
          <Link to="/register">
            <button className="border-solid border-2 border-black p-[15px]">Create An Account</button>
          </Link>
        </div>
      </div>
    </form>
    
  );
}

export default Login