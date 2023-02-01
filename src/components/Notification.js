import React from 'react'

const Notification = ({message, typeMessage }) => {

  if (message === null) {
    return null
  }
  
  return (
    <div 
      className='error' 
      style={{
        display: `${message}`=== null ? 'none' : 'block',
        color: `${typeMessage}` === 'add' ? 'green' :
          (`${typeMessage}` === 'upd' ? 'yellow' : 'red') 
      }}>
      {message}
    </div>
  )
}

export default Notification