import {Modal, Box,  Button, FormControlLabel, FormGroup, Checkbox} from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useState } from 'react';
import axios from 'axios';
import ProductSelection from './ProductSelection';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import DialogModule from './DialogModule'
import { orderAction } from '../slices/OrderSlice';
import { tableAction} from '../slices/TableSlice'
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import SportsBaseballIcon from '@mui/icons-material/SportsBaseball';
import HorizontalRuleIcon from '@mui/icons-material/HorizontalRule';
import ReceiptButton from './ReceiptButton';
import Calculator from './Calculator';


function Detailview ({onclose,open,tableid}) {
    const [selectedOrder, setSelectedOrder] = useState()
    const [details, setDetails] = useState([])
    const [total,setTotal] = useState()
    const [checked, setChecked] = useState(false)
    const [played, setPlayed] = useState(false)
    const [poolBool, setPoolBool] = useState()
    const [orderandpool, setOrderandPool] = useState()
    const [pooltotal, setPoolTotal] = useState()

    const dispatch = useDispatch()

    const modalStyle = {
        position:'absolute',
        margin:0,
        right:0,
        width:'100%',
        background:'white',
        textAlign:'center',
        outline:0,
        color:'#696969',
        height:'100vh',
        overflowY:'auto',
        overflowX:'hidden'
    }

    const orderSelector = useSelector((state)=> state.order.value)
    const OrderSortedByTable = orderSelector.filter((order)=> order.table_id === Number(tableid))
    const productSelector = useSelector((state)=> state.product.value)
    const [openSide, setOpenSide] = useState(false)

    const getDetail = (orderid, played)=> {
        axios.get(`https://poolbackendservice.onrender.com/orderinformation?orderid=${orderid}`).then((res)=> {
            setSelectedOrder(orderid)
            setDetails(res.data.msg.order)
            setTotal(Number(res.data.msg.total).toFixed(2))
            setPoolTotal(Number(res.data.msg.poolprice).toFixed(2))
            setPoolBool(played)
            setOrderandPool(Number(res.data.msg.orderandpool).toFixed(2))
            setOpenSide(true)
        })
    }

 

    const increaseItem = (productid)=> {
        axios.post(`https://poolbackendservice.onrender.com/additem?orderid=${selectedOrder}&productid=${productid}`).then((res)=> {
            getDetail(selectedOrder)
        }).catch((err)=> {
            alert(err)
        })
    }

    const decreaseItem = (productid)=> {
        axios.post(`https://poolbackendservice.onrender.com/removeitem?orderid=${selectedOrder}&productid=${productid}`).then((res)=> {
            getDetail(selectedOrder)
        }).catch((err)=> {
            alert(err)
        })
    }

   const completeOrder = ()=> {
      axios.post(`https://poolbackendservice.onrender.com/completeorder?orderid=${selectedOrder}&played=${played}`).then((res)=> {
        getDetail(selectedOrder, played)
        updateStatus()
        alert(res.data.msg)
      }).catch((err)=> {
        alert(err)
      })
   }


   const updateStatus = ()=> {
    axios.get(`https://poolbackendservice.onrender.com/tables`, 
    { headers: { authorization: 'BEARER '+ localStorage.getItem('token')  }}
    ).then((res)=> {
        dispatch(tableAction(res.data.msg))
    })

    axios.get(`https://poolbackendservice.onrender.com/orders/all`).then((res)=> {
        dispatch(orderAction(res.data.msg))
    })
   }


   const addItem = (productid)=> {
    if (!productid) return alert("Bitte Produkt wählen!")
    axios.post(`https://poolbackendservice.onrender.com/additem?orderid=${selectedOrder}&productid=${productid}`).then((res)=> {
        getDetail(selectedOrder)
      }).catch((err)=> {
        alert(err)
      })
   }

   const checkHandler =(e)=> {
         setChecked(e.target.checked)
         if (e.target.checked) setPlayed(true)
         else setPlayed(false)
   }

   const pickHandler = (id)=> {
      let element = document.getElementById(id)
      removeSelected()
      element.style.boxShadow = "0 0 2px 2px gray"
   }

   const removeSelected = ()=> {
     let boxElements = document.getElementsByClassName("boxclass")
     for (let box of boxElements) {
        box.style.boxShadow = "0px 2px 5px lightgray"
     }
   }


    return(
        <Modal
            style={{margin:0}}
            open={open} 
            onClose={onclose}
   
            >
            <Box sx={modalStyle}>

            <Button onClick={onclose} variant='contained' sx={{width:100,position:'relative',background:'white',"&:hover":{background:'white'}, margin:'1rem'}}>
                <KeyboardBackspaceIcon sx={{color:'black'}}></KeyboardBackspaceIcon>
            </Button>
             
                    <Box sx={{width:'100%', height:'100%', opacity:openSide? 0 : 1, pointerEvents: openSide?"none":"auto"}}>
                        <p>Bestellungen Tisch {tableid}</p>
                        <div style={{display:'flex', flexDirection:'column', justifyContent:'space-between', width:'100%', margin:'auto'}}>
                            {OrderSortedByTable.map((item,index)=>
                            <Box  id={index} className="boxclass"  boxShadow={2} bgcolor={item.completed? 'white' : "#DC143C"}  sx={{"&:hover": {boxShadow:'0 0 1px 3px gray'}} } 
                             onClick={()=> {
                                getDetail(item.id, item.played)
                                pickHandler(index)
                                }} p={1} m={1} borderRadius={1} key={index}>
                                <div style={{display:'flex', flexDirection:'row', justifyContent:'space-around', alignItems:'center'}}>
                                    <p style={{color:item.completed? "gray" : "white", flex:'1 1 0'}}>{new Date(item.createdat).toLocaleDateString("de-DE")}</p>
                                    <p style={{color:item.completed? "gray" : "white", flex:'1 1 0'}}>{new Date(item.createdat).toLocaleTimeString("de-DE").slice(0,5)}</p>
                                    <p style={{color:item.completed? "gray" : "white", flex:'1 1 0'}}>{new Date(item.updatedat).toLocaleTimeString("de-DE").slice(0,5)}</p>
                                    <div>{item.completed ? <CheckCircleOutlineIcon sx={{color:'yellowgreen', flex:'1 1 0'}}></CheckCircleOutlineIcon> : <MoreHorizIcon sx={{color:'white', flex:'1 1 0'}}></MoreHorizIcon>}</div>
                                    {item.played? <SportsBaseballIcon sx={{ flex:'1 1 0', color:item.completed?"gray":"white"}}></SportsBaseballIcon> : 
                                    <HorizontalRuleIcon sx={{flex:'1 1 0',color:item.completed?"gray":"white"}}></HorizontalRuleIcon>
                                    }
                                </div>
                            </Box>)}
                        </div>  
                    </Box>

                     <Box position={'absolute'} 
                         sx={{
                            transition:'0.3s', zIndex:3, left:openSide ? 0 : '100%'
                        }}
                     top={0} width='100%' heigth='100vh'>

                        <Box  display={'flex'} flexDirection={'column'} >
                                <Button sx={{width:100,  margin:'1rem auto', background:'white',"&:hover":{background:'white'}, color:'black'}} variant='contained' onClick={()=> setOpenSide(false)}><KeyboardBackspaceIcon></KeyboardBackspaceIcon></Button>
                                <p style={{color:'black'}}>Bestellungsdetails</p>
                                <Box p={1} boxShadow={2} width={'80%'} margin={'auto'} bgcolor={'white'} display={'flex'} flexDirection={'row'} justifyContent='space-between'>
                                     <p style={{flex:'1 1 0', fontWeight:'bold', color:'black'}}></p>
                                    <p style={{flex:'1 1 0', color:'black'}}>Name</p> 
                                    <p style={{flex:'1 1 0', color:'black'}}>Menge</p>   
                                    <p style={{flex:'1 1 0', color:'black'}}>Preis</p>   
                                    <p style={{flex:'1 1 0', color:'black'}}></p>
                                </Box>   
                                { details.map((item,index)=> 
                                <Box p={1} boxShadow={2} width={'80%'} margin={'auto'} bgcolor={'white'} key={index} display={'flex'} flexDirection={'row'} justifyContent='space-between'>
                                    <Button onClick={()=> decreaseItem(item.product_id)} style={{flex:'1 1 0',fontWeight:'bold', fontSize:20, color:'#696969'}} >-</Button>
                                    <p style={{flex:'1 1 0'}}>{item.name}</p> 
                                    <p style={{flex:'1 1 0'}}>{item.quantity} x</p>   
                                    <p style={{flex:'1 1 0'}}>{item.price}</p>   
                                    <Button onClick={()=> increaseItem(item.product_id)} style={{flex:'1 1 0',fontWeight:'bold', fontSize:20, color:'#696969'}}>+</Button>
                                </Box>   
                                )}
                                {selectedOrder ?   <Box boxShadow={3} bgcolor={'white'} width={'80%'}  p={1} margin='2rem auto' display={'flex'} flexDirection={'row'} alignItems={'center'} justifyContent={'center'} gap={2}>
                                    <p style={{color:'black'}}>Gesamt</p>
                                    <p style={{color:'black'}}>{poolBool? orderandpool : total}</p>
                                </Box>: <p>Bitte Bestellung wählen</p> }

                                <FormGroup sx={{display:'flex', justifyContent:'center', alignItems:'center'}}>
                                    <FormControlLabel control={<Checkbox checked={checked} onChange={checkHandler} />} label="Billard" />
                                </FormGroup>
                        </Box>

                            <ProductSelection products={productSelector} addItem={addItem}></ProductSelection>
                         <Box sx={{position:'relative'}} width={300} m={'auto'} marginY={5}>
                             <DialogModule openHandler={completeOrder} buttonName={'Bestellung abschliessen'}
                             title={'Abschlussrechnung'} text={''} btnColor={'#DC143C'} hoverColor={'red'}>
                                    <Calculator data={{details:details, total:total, pooltotal:pooltotal}}></Calculator>
                            </DialogModule>     
                         </Box>  
                         <ReceiptButton data={{details:details,total:total, pooltotal:pooltotal, tableid:tableid, orderid:selectedOrder}}></ReceiptButton>

                     </Box>
                       
            </Box>
        </Modal>
    )
}

export default Detailview