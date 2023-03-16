import {Box} from '@mui/material'
import axios from 'axios'
import {  useState } from 'react'
import Detailview from './Detailview'
import DialogModule from './DialogModule'
import { useDispatch } from 'react-redux'
import { orderAction } from '../slices/OrderSlice'
import { tableAction } from '../slices/TableSlice'
import PlaylistAddIcon from '@mui/icons-material/PlaylistAdd';


function Pooltable({source, tableid, busy}){
 
    const [openModal,setOpenModal] = useState(false)
    const dispatch = useDispatch()

    const createOrder = ()=> {
        axios.post(`https://poolbackendservice.onrender.com/orders?tableid=${tableid}`).then((res)=> {
            updateStates()
        }).catch((err)=> {
            alert(err)
        })
    }


    const updateStates = ()=> {
        axios.get(`https://poolbackendservice.onrender.com/orders/all`).then((res)=> {
            dispatch(orderAction(res.data.msg))
        })
        axios.get(`https://poolbackendservice.onrender.com/tables`).then((res)=> {
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
                    <Box boxShadow={5} width={150} height={270} sx={{background: `${busy?'#DC143C':'white'}`, color:`${busy?"white":"gray" }`}} borderRadius={1}>
                    </Box>
                        <p style={{position:'absolute', left:'50%', top:'45%', transform:'translate(-50%,-50%)' }}>{tableid}</p>
                    </Box>
                <DialogModule btnColor={'black'} hoverColor={'#00003f'}  openHandler={createOrder} buttonName={<PlaylistAddIcon></PlaylistAddIcon>} title={'Sind Sie sicher?'} text={'Bestellung aufnehmen?'}></DialogModule>
                <Detailview tableid={tableid} onclose={closeHandler}  open={openModal}></Detailview>
            </Box>
    )
}

export default Pooltable;