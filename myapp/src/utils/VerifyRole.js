import { jwtDecode } from "jwt-decode";
import API_URL from "../Url";
import axios from "axios";
const verifyRole=async() => {
    const token = localStorage.getItem('techEagleToken');

    if (token) {
      const phoneNumber =jwtDecode(token); 
      console.log(phoneNumber)
      const userDetails =await axios.post(`${API_URL}/getUser`,{
        "phoneNumber":phoneNumber
      })
      console.log(userDetails.data.user.role)
      return userDetails.data.user.role
      

    }
    return null
  }

export default verifyRole