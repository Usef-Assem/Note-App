import React, { useState } from 'react'
import img2 from "../../../images/notes3.png"
import { useFormik } from 'formik';
import * as yup from 'yup'
import axios from "axios"
import { Link, useNavigate} from 'react-router-dom';
export default function Register() {
  let navigate = useNavigate()
  const [LoginError , SetLoginError] = useState("")
  const [isLoading, setisLoading] = useState(false)
 async function Login(values){
     console.log(values);
     setisLoading(true)
    try {
      let {data} = await axios.post("https://note-sigma-black.vercel.app/api/v1/users/signIn" , values)
      navigate("/Home")
      console.log(data);
      localStorage.setItem("userToken" , data.token)
    } catch (error) {
      console.log(error.response.data);
      SetLoginError(error.response.data.msg)
    }
    setisLoading(false)
  }
  let passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/
  let validateScheme = yup.object({
      email: yup.string().email('email is invalid').required('email is required'),
      password: yup.string().matches(passwordRegex , "password must start with uppercase and must contain numbers").required("password is required"),
  })

  let formik = useFormik({
    initialValues:{
      email: "",
      password: "",
    },validationSchema: validateScheme,
    onSubmit:Login
  })
  
  return<>
        <li className="fixed-top p-3 pe-lg-5 d-lg-flex d-none  ">
            <i className="fa-regular fa-note-sticky text-info fs-2"></i>                           
            <p className='ps-2 fs-4 fw-bold'>Notes</p>
        </li>

  <div className="container">
    <div className="row mt-4 justify-content-center align-items-center">
    
        <div className="col-md-6">
            <img className='w-75 d-md-flex d-none mt-2' src={img2} alt="" />
        </div>
        <div className='col-md-6'>
        <div className='bg-light bg-opacity-25 w-100 shadow mx-auto p-5 rounded-2'>

          <h1 className='text-center'>Login Now</h1>
          {LoginError !== "" ?<div className="alert alert-danger">{LoginError}</div>:''}
          <form onSubmit={formik.handleSubmit} className='mt-4'>

          <input onChange={formik.handleChange} onBlur={formik.handleBlur} name = 'email' id='E-mail' className='form-control w-100 mt-2' type="email" placeholder='Enter your email'  />
          {formik.errors.email && formik.touched.email? <div className="alert alert-danger mt-2 p-2">{formik.errors.email}</div> : ''}

          <input onChange={formik.handleChange} onBlur={formik.handleBlur} name = 'password' id='Password' className='form-control w-100 mt-2' type="password" placeholder='Enter your password'  />
          {formik.errors.password && formik.touched.password? <div className="alert alert-danger mt-2 p-2">{formik.errors.password}</div> : ''}

          {isLoading?<button className='btn btn-info w-100 mt-3 text-light rounded-2' type='submit'><i className='fa-solid fs-4 fa-spinner fa-spin'></i></button> : <button className='btn btn-info w-100 mt-3 text-light rounded-2' type='submit'>Login</button>}
          <div className='mt-2 text-center'>don't have an account ? <Link className='text-decoration-none' to={"/"}>Register Now</Link></div>
          </form>
          </div>
        </div>
    </div>
  </div>
  </>
}
