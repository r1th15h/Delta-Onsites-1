import axios from "axios";

const axi = axios.create({
  baseURL:'http://localhost:5000'
})

export default axi;