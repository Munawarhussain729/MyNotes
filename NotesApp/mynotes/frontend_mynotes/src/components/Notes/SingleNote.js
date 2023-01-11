import axios from 'axios';
import React from 'react'
import { useState } from 'react';
import { useEffect } from 'react';
import { Card } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { ReactComponent as ArrowLeft } from "../../assets/arrow-left.svg"

const SingleNote = () => {
    const { id } = useParams();
    const [note, setNote] = useState(null);
    const navigate = useNavigate()
    useEffect(() => {
        const getNote = async () => {

            if (id === 'new') {
                return
            }
            await axios.get(`/api/notes/${id}`).then((response) => {
                setNote(response.data);
            })
        }
        getNote();
    }, [])


    const updateNote = async () => {
        fetch(`/api/notes/${id}/update/`, {
            method: "PUT",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(note)
        })
    }
    const deleteNote = async () => {

        fetch(`/api/notes/${id}/delete/`, {
            method: "DELETE",
            headers: {
                'Content-Type': 'application/json'
            },
        })
        navigate("/")
    }


    const createNote = async () => {
       
        fetch(`/api/notes/create/`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(note)
        })
    }
    const handleSubmit = () => {
        if (id !== 'new' && note.body === '') {
            deleteNote()
        } else if (id !== 'new') {
            updateNote()
        } else if (id === 'new' && note !== null) {
            createNote()
        }
        navigate('/')
    }
    const handleChange = (value)=>{
        setNote({...note, 'body':value})   
    }
    return (
        <div>
            {/* <h1>Single Note {id}</h1> */}
            <div className='note'>
                <div className='note-header'>
                    <h3>
                        <Link to="/">
                            <ArrowLeft onClick={() => {
                                handleSubmit();
                            }} />
                        </Link>
                    </h3>
                    {id != 'new' ? (
                        <button onClick={deleteNote}>Delete</button>
                    ) : (<button onClick={handleSubmit}> Done</button>)
                    }
                </div>
                <textarea onChange={(event) => {handleChange(event.target.value) }} value={note?.body}></textarea>
            </div>
        </div>
    )
}

export default SingleNote