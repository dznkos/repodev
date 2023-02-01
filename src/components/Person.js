import React from 'react'

const Person = ({person , handleRemove}) => {
  return (
    <li className='personlist'>
      {person.name} {person.number}      
      &nbsp;  <button onClick={()=> handleRemove(person)}>Remove</button>           
     
    </li>
  )
}

export default Person