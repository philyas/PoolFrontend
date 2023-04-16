import {Box} from '@mui/material'
import axios from 'axios'
import {  useState } from 'react'
import Detailview from './Detailview'
import DialogModule from './DialogModule'
import { useDispatch } from 'react-redux'
import { orderAction } from '../slices/OrderSlice'
import { tableAction } from '../slices/TableSlice'
import PlaylistAddIcon from '@mui/icons-material/PlaylistAdd';
import billardred from './assets/billardred.png'
import billardgreen from './assets/billardgreen.png'


function Pooltable({tableid, busy}){
 
    const [openModal,setOpenModal] = useState(false)
    const dispatch = useDispatch()

    const createOrder = ()=> {
        axios.post(`https://poolbackendservice.onrender.com/orders?tableid=${tableid}`, 
        { } ,  { headers: { authorization: 'BEARER '+ localStorage.getItem('token')  }}
        ).then((res)=> {
         updateStates()
        }).catch((err)=> {
            alert(err)
        })
    }

    const updateStates = ()=> {
        axios.get(`https://poolbackendservice.onrender.com/tables`, 
        { headers: { authorization: 'BEARER '+ localStorage.getItem('token')  }}
        ).then((res)=> {
            dispatch(tableAction(res.data.msg))
        })

       axios.get(`https://poolbackendservice.onrender.com/orders/all`, 
       { headers: { authorization: 'BEARER '+ localStorage.getItem('token')  }}
       ).then((res)=> {
            dispatch(orderAction(res.data.msg))
        })
      }


    const openMenu = ()=> {
        setOpenModal(true)
    }

    const closeHandler = ()=> {
        setOpenModal(false)
    }

    const poolStyle = {
        margin:'auto',
        width:150,
        height:270,
        borderRadius:2,
        background: 'white',
        padding:1,
        "&:hover": {
            background:'darkred'
        }
      }



    return(
            <Box style={{background:'transparent', position:'relative'}} my={2}>
                <Box sx={poolStyle} onClick={openMenu}>
                    {
                    <Box boxShadow={5} width={150} height={270} sx={{background: `${'white'}`, color:`${busy?"white":"gray" }`}} borderRadius={1}>
                         <img width={150} height={270} src={busy? billardred : billardgreen}></img>
                    </Box> }
                        <p style={{position:'absolute', left:'50%', top:'45%', transform:'translate(-50%,-50%)' }}>{tableid}</p>
                    </Box>
                <DialogModule btnColor={'black'} hoverColor={'#00003f'}  openHandler={createOrder} buttonName={<PlaylistAddIcon></PlaylistAddIcon>} title={'Sind Sie sicher?'} text={'Bestellung aufnehmen?'}></DialogModule>
                <Detailview tableid={tableid} onclose={closeHandler}  open={openModal}></Detailview>
            </Box>
    )
}

export default Pooltable;