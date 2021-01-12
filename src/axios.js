import axios from 'axios'

const instance = axios.create({
    baseURL : 'https://cors-anywhere.herokuapp.com/https://s3-ap-southeast-1.amazonaws.com/he-public-data/',
});

export default instance;