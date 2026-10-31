import axios from "axios";

const URL = "http://localhost:3001/api/persons";

export const getAllPerson = () => {
  return axios.get(URL).then((result) => result.data);
};

export const addPersonApi = (person) => {
  return axios.post(URL, person).then((result) => result.data);
};

export const deletePersonApi = (id) => {
  // console.log(`${URL}/:${id}`)
  return axios.delete(`${URL}/${id}`).then((result) => result.data);
};

export const updatePersonApi = (id, person) => {
  return axios.put(`${URL}/${id}`, person).then((result) => result.data);
};
/*

你不得不承认
if (exp) {
    //...
}

if (exp)
{
    //...
}

const func = ()=>{
}

function func(){
}

 */
