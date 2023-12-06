import React, { useState } from 'react'
import img1 from "../../images/notes1.png"
import { useFormik } from 'formik';
import * as yup from 'yup'
import axios from "axios"
import { Link, useNavigate} from 'react-router-dom';
export default function Register() {
  let navigate = useNavigate()
  const [error , setError] = useState("")
  const [isLoading, setisLoading] = useState(false)
 async function Register(values){
    console.log(values);
    setisLoading(true)
    try {
      let {data} = await axios.post("https://note-sigma-black.vercel.app/api/v1/users/signUp" , values)
      navigate("/login")
      console.log(data);
    } catch (error) {
      console.log(error.response.data);
      setError(error.response.data.msg)
    }
    setisLoading(false)
  }
  let phoneRegex = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/
  let passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/
  let ageRegex = /^(1[89]|[2-9]\d)$/
  let validateScheme = yup.object({
      name: yup.string().min( 3 , 'name min length is 3').max( 10 , 'name max length is 10').required('name is required'),
      email: yup.string().email('email is invalid').required('email is required'),
      phone: yup.string().matches(phoneRegex , 'phone number is invalid').required('phone nuumber is required'),
      age: yup.string().matches(ageRegex , 'age is invalid').required('age is required'),
      password: yup.string().matches(passwordRegex , "password must start with uppercase and must contain numbers").required("password is required"),
  })

  let formik = useFormik({
    initialValues:{
      name: "" ,
      email: "",
      password: "",
      age: "",
      phone: ""
    },validationSchema: validateScheme,
    onSubmit:Register
  })
  
  return<>
        <li className="fixed-top p-3 pe-lg-5 d-lg-flex d-none  ">
            <i className="fa-regular fa-note-sticky text-info fs-2"></i>                           
            <p className='ps-2 fs-4 fw-bold'>Notes</p>
        </li>

  <div className="container">
    <div className="row mt-4 justify-content-center align-items-center">
    
        <div className="col-md-6">
            <img className='w-75 d-md-flex d-none mt-2' src={img1} alt="" />
        </div>
        <div className='col-md-6'>
        <div className='bg-light bg-opacity-25 w-100 shadow mx-auto p-5 rounded-2'>

          <h1 className='text-center'>Sign Up Now</h1>
          {error !== "" ?<div className="alert alert-danger">{error}</div>:''}
          <form onSubmit={formik.handleSubmit} className='mt-4'>
          <input onChange={formik.handleChange} onBlur={formik.handleBlur} name = 'name' id='Name' className='form-control w-100 mt-2' type="text" placeholder='Enter your name'  />
          {formik.errors.name && formik.touched.name? <div className="alert alert-danger mt-2 p-2">{formik.errors.name}</div> : ''}

          <input onChange={formik.handleChange} onBlur={formik.handleBlur} name = 'email' id='E-mail' className='form-control w-100 mt-2' type="email" placeholder='Enter your email'  />
          {formik.errors.email && formik.touched.email? <div className="alert alert-danger mt-2 p-2">{formik.errors.email}</div> : ''}

          <input onChange={formik.handleChange} onBlur={formik.handleBlur} name = 'password' id='Password' className='form-control w-100 mt-2' type="password" placeholder='Enter your password'  />
          {formik.errors.password && formik.touched.password? <div className="alert alert-danger mt-2 p-2">{formik.errors.password}</div> : ''}

          <input onChange={formik.handleChange} onBlur={formik.handleBlur} name = 'age' id='age' className='form-control w-100 mt-2' type="number" placeholder='Enter your age'  />
          {formik.errors.age && formik.touched.age? <div className="alert alert-danger mt-2 p-2">{formik.errors.age}</div> : ''}

          <input onChange={formik.handleChange} onBlur={formik.handleBlur} name = 'phone' id='phone' className='form-control w-100 mt-2' type="tel" placeholder='Enter your phone Number'  />
          {formik.errors.phone && formik.touched.phone? <div className="alert alert-danger mt-2 p-2">{formik.errors.phone}</div> : ''}

          {isLoading?<button className='btn btn-info w-100 mt-3 text-light rounded-2' type='submit'><i className='fa-solid fs-4 fa-spinner fa-spin'></i></button> : <button className='btn btn-info w-100 mt-3 text-light rounded-2' type='submit'>Sign Up</button>}
          <div className='mt-2 text-center'>Already have an account ? <Link className='text-decoration-none' to={"/login"}>Login Now</Link></div>
          </form>
          </div>
        </div>
    </div>
  </div>
  </>
}
