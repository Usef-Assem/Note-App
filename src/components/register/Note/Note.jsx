import axios from 'axios'
import { useFormik } from 'formik';
import React from 'react'
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

export default function Note({noteDetails,getUserNotes}) {

const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  async function DeleteNote(id){
    try {
      let{data} = await axios.delete(`https://note-sigma-black.vercel.app/api/v1/notes/${id}`, {
        headers: {token: `3b8ny__${localStorage.getItem("userToken")}`}
      })
      getUserNotes()
      console.log(data);
    } 
    catch (error) {
      console.log(error);
    }
  }

  async function UpdateNote(values){
      try {
        let{data} = await axios.put(`https://note-sigma-black.vercel.app/api/v1/notes/${noteDetails._id}` , values , {
          headers:{
            token: `3b8ny__${localStorage.getItem("userToken")}`
          }
        })
        console.log(data);
        getUserNotes()
        handleClose()
      }
       catch (error) {
        console.log(error);
      }
  }

  let formik = useFormik({
    initialValues:{
      title:noteDetails.title,
      content:noteDetails.content
    },onSubmit:UpdateNote
  })



  return <>

<Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Update Note</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <form>
                <input defaultValue={noteDetails.title} className='form-control mb-2' onChange={formik.handleChange} type="text" name='title' placeholder='title'/>
                <input defaultValue={noteDetails.content} className='form-control' onChange={formik.handleChange} type="text" name='content' placeholder='content'/>
            </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={formik.handleSubmit}>
            Edit Note
          </Button>
        </Modal.Footer>
      </Modal>

  <div className="col-md-4">
    <div className="bg-white p-4 m-2 rounded-2 shadow-sm">
        <h3 className="text-secondary fw-bold">{noteDetails.title}</h3>
        <p>{noteDetails.content}</p>
        <div>
            <i onClick={()=>{DeleteNote(noteDetails._id)}} className='fa-solid fa-trash-can pe-2 cursor-pointer'></i>
            <i onClick={handleShow} className='fa-solid fa-pen-to-square cursor-pointer'></i>
        </div>
    </div>
  </div>
  </>
}
