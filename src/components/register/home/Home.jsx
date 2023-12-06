import React, { useEffect } from 'react'
import Note from '../Note/Note'
import Sidebar from '../sidebar/Sidebar'
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useFormik } from 'formik';
import axios from 'axios';
import { Helmet } from "react-helmet";

export default function Home() {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [AddNoteErr, setAddNoteErr] = useState("")
  const [userNotes, setuserNotes] = useState([])


  // Add Notes Function

 async function sendNote(values){
try {
  let{data} = await axios.post("https://note-sigma-black.vercel.app/api/v1/notes" , values , {
    headers:{token: `3b8ny__${localStorage.getItem('userToken')}`}
  })
  console.log(data);
  getUserNotes()
  handleClose()
 
} 
catch (error) {
  setAddNoteErr(error.response.data.msg)
}
  }

  
                                // ------------------------------------------------------------------


  // Get Notes Function

  async function getUserNotes(){
    try {
      let {data} = await axios.get("https://note-sigma-black.vercel.app/api/v1/notes" , {
      headers:{token:`3b8ny__${localStorage.getItem('userToken')}`}
    }) 
    setuserNotes(data.notes)
    console.log(data.notes);

    } 
    catch (error) {

    }
  }
         
  
                                      // ------------------------------------------------------------------


  let formik = useFormik({
    initialValues:{
      title:'',
      content:''
    },onSubmit:sendNote
  })

  useEffect(() => {
    getUserNotes()
  }, [])
  


  return <>
  <Helmet>
      <meta charSet="utf-8" />
      <title>Note App</title>
  </Helmet>
  <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add Note</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={formik.handleSubmit}>
          {AddNoteErr !== "" ?<div className="alert alert-danger">{AddNoteErr}</div>:''}
          <input onChange={formik.handleChange} onBlur={formik.handleBlur} name='title' id='title' className='form-control' type="text" placeholder='title' />
          <input onChange={formik.handleChange} onBlur={formik.handleBlur} name='content' id='content' className='form-control mt-1' type="text" placeholder='content' />
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={formik.handleSubmit}>
            Add Note
          </Button>
        </Modal.Footer>
      </Modal>

  <div className="overflow-hidden">
    <div className="row">
      <div className="col-2">
        <div className="position-fixed col-lg-2">
          <Sidebar/>
        </div>
      </div>


      <div className="col-10 px-lg-5 px-2 py-5">
        <div className="text-end me-2">
          <button onClick={handleShow} className='btn btn-info text-white'><i className='fa-solid fa-plus'></i>Add Note</button>
        </div>
        <div className="row">
                {userNotes.map((note)=>(<Note key={note._id} noteDetails={note} getUserNotes={getUserNotes} />))}
          </div>

      </div>
    </div>
  </div>
  </>
}
