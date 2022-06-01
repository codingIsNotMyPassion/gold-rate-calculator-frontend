import axios from "axios"

export default axios.create({
    baseURL:"https://gold-rate-calculator.herokuapp.com/api"
})
