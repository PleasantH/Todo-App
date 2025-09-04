import React, { useState } from 'react'
import axios from 'axios'   

function Create({ onAdd }) {
    const [task, setTask] = useState('')
    
    const handleAdd = () => {
        axios.post('http://localhost:3001/add', {task: task})
        .then(result => {
            location.reload()
            if (onAdd) {
                onAdd(result.data) // Update parent component
            }
            setTask('') // Clear input after successful add
        })
        .catch(err => console.log(err))
    }
    
    return (
        <div className="create_form">
            <input 
                type="text" 
                placeholder='Enter Task' 
                value={task}
                onChange={(e) => setTask(e.target.value)}
            />
            <button type='button' onClick={handleAdd}>Add</button>
        </div>
    )
}

export default Create