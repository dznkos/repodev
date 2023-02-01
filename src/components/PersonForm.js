import React from 'react'

const PersonForm = ({addPhone, newName, newNumber,handleNameChange, handlePhoneChange }) => {
  
  return (
    <div>
      <form onSubmit={addPhone}>
        <div>
          name: <input value={newName} onChange={handleNameChange} />
        </div>
        <div>  
          number: <input value={newNumber} onChange={handlePhoneChange} />
        </div>
        <div>
          <button type='submit'>add</button>
        </div>
      </form>
    </div>
  )
}

export default PersonForm