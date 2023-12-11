import React,{useEffect} from 'react'
import verifyRole from '../../utils/VerifyRole'
import { useNavigate } from 'react-router-dom'
const Dashboard = ()=>{
    const navigate = useNavigate()
    useEffect(()=>{
        const verifyDetails=async()=>{
            const userDetails =await verifyRole()
            console.log(userDetails)
            if (userDetails==="manager"){
                navigate('/admin/dashboard')
            }else if(userDetails==="customer"){
                navigate('/home')
            }
            else if (userDetails===null){
                navigate('/login')
            }
        }
        verifyDetails() 
    },[])

    return(
        <div>
           <h1>Welcome to dahsboard ADMIN</h1>
            </div>
    )
}
export default Dashboard