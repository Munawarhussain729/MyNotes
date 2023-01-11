import React from 'react'
import { Link } from 'react-router-dom'
import { ReactComponent as AddIcon } from "./../../assets/add.svg"

const AddButton = () => {
    return (
        <div>
            <Link to="/notes/new/" className='floating-button'>
                <AddIcon />
            </Link>
        </div>
    )
}

export default AddButton