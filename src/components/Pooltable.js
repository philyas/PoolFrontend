import {Box} from '@mui/material'
import axios from 'axios'
import {  useState } from 'react'
import Modalview from './Modalview'
import DialogModule from './DialogModule'
import { useDispatch } from 'react-redux'
import { orderAction } from '../slices/OrderSlice'
import { tableAction } from '../slices/TableSlice'


function Pooltable({source, tableid, busy}){
 
    const [openModal,setOpenModal] = useState(false)
    const dispatch = useDispatch()

    const createOrder = ()=> {
        axios.post(`http://localhost:3002/orders?tableid=${tableid}`).then((res)=> {
            updateStates()
        }).catch((err)=> {
            alert(err)
        })
    }


    const updateStates = ()=> {
        axios.get(`http://localhost:3002/orders/all`).then((res)=> {
            dispatch(orderAction(res.data.msg))
        })
        axios.get(`http://localhost:3002/tables`).then((res)=> {
            dispatch(tableAction(res.data.msg))
        })
    }


    const openMenu = ()=> {
        setOpenModal(true)
    }

    const closeHandler = ()=> {
        setOpenModal(false)
    }

    const poolStyle = {
        width:150,
        height:270,
        borderRadius:2,
        background: 'white',
        padding:1,
        "&:hover": {
            background:'beige'
        }
    }



    return(
            <Box alignItems={'center'} justifyContent='center' style={{background:'transparent', position:'relative'}}>
                <Box sx={poolStyle} onClick={openMenu}>
                    <Box boxShadow={5} width={150} height={270} sx={{background: `${busy?'beige':'white'}`, color:`${busy?"white":"gray" }`}} borderRadius={1}></Box>
                    <p style={{position:'absolute', left:'50%', top:'45%', transform:'translate(-50%,-50%)' }}>{tableid}</p>
                </Box>
                <DialogModule btnColor={'#032729'} hoverColor={'yellowgreen'}   openHandler={createOrder} buttonName={'Neue Bestellung'} title={'Sind Sie sicher?'} text={'Bestellung aufnehmen?'}></DialogModule>
                <Modalview tableid={tableid} onclose={closeHandler}  open={openModal}></Modalview>
            </Box>
    )
}

export default Pooltable;