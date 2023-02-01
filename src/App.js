import React, { useState, useEffect } from 'react'
import './App.css'

import Filter from './components/Filter'
import Notification from './components/Notification'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import personService from './services/phonebook'


const App = () => {
  const [ persons, setPersons ] = useState([]) 
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [message, setMessage] = useState(null)
  const [typeMessage, setTypeMessage] = useState(null)
  

  useEffect(() => {
    
    personService
      .getAll()
      .then( initialPersons => {
        setPersons(initialPersons)
      })
  }, [])
  
  const maxId = () => {
    const lastId = Math.max( ...persons.map(p => p.id) ) + 1
    return lastId
  }
  
  const add = (e) => {
    e.preventDefault()

    if (newName ==='' || newNumber === '') {
      return alert('You must enter the fields name and number')
    }

    const newPerson = {
      name: newName,
      number: newNumber,
      id: maxId()
    }

    const exist = persons.find( p => p.name.toLowerCase() === newName.toLowerCase())

    if (exist) {      
      const confirm = window.confirm(`${newName} is already added to phonebook, want update number?`) 
      
      if (confirm) {
        personService
        .update(exist.id, newPerson)
        .then( response => {          
          setPersons( response )
        })
        .catch( error => {
          setMessage(`Information of ${newName} has already been removed from server`)
          setTypeMessage('err')      
          setTimeout(() => {
            setMessage(null)
          }, 12000);  
        })
        setNewName('')
        setNewNumber('')
        setMessage(`Contact updated ${newName}`)
          setTypeMessage('upd') 
          setTimeout(() => {
            setMessage(null)
          }, 3000); 
      }
      return;
    }

    personService
      .create(newPerson)
      .then( response => {
        setPersons( persons.concat(newPerson) )
      })
      .catch( error => {
        setMessage(`Server error, data not added`)
        setTypeMessage('err')      
        setTimeout(() => {
          setMessage(null)
        }, 12000);  
      })
    console.log(persons)
    setNewName('')
    setNewNumber('')
    setMessage(`Contact added ${newName}`)
      setTypeMessage('add') 
      setTimeout(() => {
        setMessage(null)
      }, 3000);      
  }

  const handleNameChange = (event) => {
    setNewName( event.target.value )
  }
  const handlePhoneChange = (event) => {
    setNewNumber( event.target.value )
  }

  const handleRemove = (person) => {
    const msgtext = `Delete contact ${person.name} ?` 
    const confirm = window.confirm(msgtext)
    if (confirm) {     

      personService
      .remove(person.id)
      .then( response => {
        setPersons( persons.filter( p => p.id !== person.id) )
      })
      .catch( error => {
        setMessage(`Information of ${person.name} not exist`)
        setTypeMessage('err')
        setTimeout(() => {
          setMessage(null)
        }, 5000);  
      })
      setMessage(`Contact deleted ${person.name}`)
      setTypeMessage('err')
      setTimeout(() => {
        setMessage(null)
      }, 3000);  
    }    
  }

  return (
    <div>
      <h2 className='titulo1'>Phonebook</h2>

      <Filter persons={persons} />

      <h3>Add a new</h3>

      <PersonForm 
        addPhone={add} 
        newName={newName} 
        newNumber={newNumber}
        handleNameChange={handleNameChange}
        handlePhoneChange={handlePhoneChange}
      /> 

      <h2 className='titulo2'>Numbers</h2>
      <Notification message={message} typeMessage={typeMessage}/>
      <Persons persons={persons} handleRemove={handleRemove}/>
      
    </div>
  )
}

export default App
