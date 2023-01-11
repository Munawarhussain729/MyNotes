import React, { useEffect } from 'react'
import { useState } from 'react'
import axios from 'axios';
import { Card } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import "./Notes.css"
import AddButton from './AddButton';

const NotesList = () => {
    const [notes, setNotes] = useState([]);
    const navigate = useNavigate()

    useEffect(() => {
        const getNotes = async () => {
            await axios.get('/api/notes/')?.then((response) => {
                
                setNotes(response.data);
            })
        }
        getNotes();
    }, [])

    let getTitle = (note) => {

        let title = note.body.split('\n')[0]
        if (title.length > 45) {
            return title.slice(0, 45)
        }
        return title
    }

    let getTime = (note) => {
        return new Date(note.updated).toLocaleDateString()
    }

    let getContent = (note) => {
        let title = getTitle(note)
        let content = note.body.replaceAll('\n', ' ')
        content = content.replaceAll(title, '')
    
        if (content.length > 45) {
            return content.slice(0, 45) + '...'
        } else {
            return content
        }
    }

    return (
        <div className='notes'>
            <div className='notes-header'>
                <h2 className='notes-title'>&#9782;</h2>
                <p className='notes-count'>{notes.length}</p>
            </div>
            <div className='notes-list'>
                {notes.map((item, index) => {
                    return (
                        <Link key={index} to={`/notes/${item.id}`} className="note-link">
                            <div className='notes-list-item'>
                                <p style={{color:"white"}}>{getTitle(item)}</p>
                                <p><span>{getTime(item)}</span> {getContent(item)}</p>
                            </div>
                        </Link>
                    )
                })}
               <AddButton/>
            </div>
        </div>
    )
}

export default NotesList