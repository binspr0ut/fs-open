import axios from 'axios'
const url = 'http://localhost:3001/persons'

const getAll = () => {
    return axios.get(url)
}

const create = (newObject) => {
    return axios.post(url, newObject)
}

const update = (object, id) => {
    return axios.put(`${url}/${id}`, object)
}

const deletePerson = (id) => {
    return axios.delete(`${url}/${id}`)
}

export default {
    getAll: getAll,
    create: create,
    update: update,
    deletePerson: deletePerson
}