import axios from 'axios';

let token=localStorage.getItem('tokens')

let API= axios.create({
    baseURL:'http://localhost:3030/' + '/',
    headers:{
        'authorization':`${token}`
    }
})

export default API;