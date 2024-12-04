import axios from "axios";

import Cookie from 'cookie-universal' ;
import { baseUrl } from "./Api";

const cookie=Cookie();
const token =cookie.get('e-commerce')

export  const Axios=axios.create({
    baseURL: baseUrl,
    headers:{
        Authorization:`Bearer ${token}`
    }
})