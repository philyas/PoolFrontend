import axios from "axios"
import { useEffect,  useState } from "react"
import { useNavigate } from "react-router-dom"
import { TextField, FormControl, Button, Box } from "@mui/material"
import { useDispatch } from "react-redux"
import { tokenAction } from "../slices/TokenSlice"
import billardlogo from './assets/billardlogin.png'

const Loginpage = ()=> {
    const [name, setName] = useState()
    const [password, setPassword] = useState()
    const [loaded, setLoaded] = useState(false)

    const dispatch = useDispatch()

    const nameHandler = (event)=> {
        setName(event.target.value)
    }

    const passwordHandler = (event)=> {
        setPassword(event.target.value)
    }

    const navigate = useNavigate()

    const submitHandler = ()=> {
        axios({
            method: 'post',
            url: 'https://poolbackendservice.onrender.com/login',
            data: {
              name: name,
              password: password
            },
          })
          .then((res)=> {
            localStorage.setItem('token', res.data.token)
            console.log('Logged in')
            dispatch(tokenAction(true))
            navigate('/home')
          })
          .catch((err)=> {
            alert(err)
          })
    }


    useEffect(()=> {
            axios.get('https://poolbackendservice.onrender.com/token',
           { headers: { authorization: 'BEARER '+ localStorage.getItem('token')  }} )
           .then((res)=> {
            const userid = res.data.userinfo.authorizedData.userid
            dispatch(tokenAction({logged:true,userid:userid}))
              navigate('/home')
           })
           .catch((err)=> {
            setLoaded(true)
             console.log("Error on mount: " + err)
           })
      
    }, [])

            { if (loaded) { return( 
            <div style={{margin:0, padding:0,background:'linear-gradient(to bottom, pink,purple)', width:'100%', height:'100vh'}}>
               <Box sx={{margin:'auto', display:'flex', flexDirection:'column', gap:2}}>
                      <img src={billardlogo} style={{margin:'auto'}} width={200} height={200} alt='billi'></img>
                     <p style={{textAlign:'center', color:'white'}}>Please enter your credentials</p>
               </Box>
                     <Box boxShadow={10} sx={{background:'white',
                      borderColor:'lightgray', borderWidth:1, borderStyle:'solid',
                      borderRadius:3, padding:5
                    }} width={250} height={200} m={'auto'} pt={15}>
                        <FormControl style={{display:'flex', gap:15}}>
                            <TextField label={'Name'} type={'text'} onChange={nameHandler}></TextField>
                            <TextField label={'Password'} type={'password'} onChange={passwordHandler} ></TextField>
                            <Button sx={{background:'#FF00FF'}} onClick={submitHandler} variant={'contained'}>Log in</Button>
                        </FormControl>
                     </Box>
            </div>) } 
            else {
              return null
            }
            }
    
}

export default Loginpage