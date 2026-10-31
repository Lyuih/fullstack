import { useState, useEffect } from "react";
// import axios from "axios";
import { getAllPerson, addPersonApi, deletePersonApi, updatePersonApi } from "./services/person";
import Notification from "./components/Notification";
const Person = ({ person, handle }) => {
  console.log("you");

  return (
    <div>
      <p style={{ display: "flex", gap: "2rem" }}>
        <span>name: {person.name}</span>
        <span>phone: {person.phone}</span>
        <button onClick={() => handle(person.id)}>delete</button>

      </p>
    </div>
  );
};



const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newPhone, setNewPhone] = useState("");
  const [filterName, setFilterName] = useState("");
  const [errorMessage, setErrorMessage] = useState("")
  useEffect(() => {
    getAllPerson().then(data => {
      console.log(data)
      setPersons(data)
    })
  }, [])
  const generateId = () => {
    if (persons.length == 0) {
      return 1
    }
    return Math.max(...persons.map(p => Number(p.id))) + 1
  }
  const addPerson = (event) => {
    event.preventDefault();
    console.log("clicked");
    const name = newName.trim()
    const phone = newPhone.trim()
    console.log("name:", name)
    if (!name || !phone) {
      console.log("name is empty")
      return;
    }
    const person = {
      name,
      phone,
    }
    if (persons.find(p => p.name === name)) {
      const { id } = persons.find(p => p.name === name)
      alert("你添加的用户已经存在,本次添加将会更新其信息")
      updatePersonApi(id, person).then(data => {
        const newPersons = persons.map(p => {
          if (p.name === name) {
            return data
          } else {
            return p
          }
        })
        setPersons(newPersons);
      })
    } else {
      addPersonApi(person).then(data => {
        setPersons(persons.concat(data))
      })
    }


    setNewName("")
    setNewPhone("")
  };

  const handleFilterName = (event) => {
    event.preventDefault()
    const name = filterName.trim()
    if (!name) {
      console.log("name is empty")
      return
    }
    const { phone } = persons.find(p => p.name === name)
    alert(`name:${name} phoneL${phone}`)
  }

  const handlePersonChange = (event) => {
    setNewName(event.target.value);
  }

  const handlePhoneChange = (event) => {
    setNewPhone(event.target.value);
  }

  const handleFilterNameChange = (event) => {
    setFilterName(event.target.value);
  }

  const handleDelete = (id) => {
    // console.log(id)
    deletePersonApi(id).then(data => {
      // console.log(data)
      const newPersons = persons.filter(p => p.id !== id)
      setPersons(newPersons)
    }).catch(error => {
      setErrorMessage("person already removed")
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    })
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={handleFilterName}>
        filter shown with: <input value={filterName} onChange={handleFilterNameChange} />
        <br />
        <button type="submit">filter</button>
      </form>
      <Notification message={errorMessage} />
      <h1>
        add a new
      </h1>
      <form onSubmit={addPerson}>
        <div>
          name: <input value={newName} onChange={handlePersonChange} />
          <br />
          phone: <input value={newPhone} onChange={handlePhoneChange} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <div>
        <ul>
          {persons.map((person) => {
            return <Person key={person.id} person={person} handle={handleDelete} />;
          })}
        </ul>
      </div>
    </div>
  );
};

export default App;
