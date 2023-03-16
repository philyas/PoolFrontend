import {Modal, Box, Grid, Button, FormControlLabel, FormGroup, Checkbox} from '@mui/material'
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


function Detailview ({onclose,open,tableid}) {
    const [selectedOrder, setSelectedOrder] = useState()
    const [details, setDetails] = useState([])
    const [total,setTotal] = useState()
    const [products, setProducts] = useState([])
    const [checked, setChecked] = useState(false)
    const [played, setPlayed] = useState(false)
    const [poolBool, setPoolBool] = useState()
    const [orderandpool, setOrderandPool] = useState()

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
    const OrderSortedByTable = orderSelector.filter((order)=> order.tableid === Number(tableid))
    const [openSide, setOpenSide] = useState(false)

    const getDetail = (orderid, played)=> {
        axios.get(`https://poolbackendservice.onrender.com/orderinformation?orderid=${orderid}`).then((res)=> {
            setSelectedOrder(orderid)
            setDetails(res.data.msg.order)
            setTotal(Number(res.data.msg.total).toFixed(2))
            setPoolBool(played)
            setOrderandPool(Number(res.data.msg.orderandpool).toFixed(2))
            setOpenSide(true)
        })
    }

 

    const increaseItem = (productname)=> {
        axios.post(`https://poolbackendservice.onrender.com/additem?orderid=${selectedOrder}&name=${productname}`).then((res)=> {
            getDetail(selectedOrder)
        }).catch((err)=> {
            alert(err)
        })
    }

    const decreaseItem = (productname)=> {
        axios.post(`https://poolbackendservice.onrender.com/removeitem?orderid=${selectedOrder}&name=${productname}`).then((res)=> {
            getDetail(selectedOrder)
        }).catch((err)=> {
            alert(err)
        })
    }

   const getProducts = ()=> {
        axios.get('https://poolbackendservice.onrender.com/products').then((res)=> {
            setProducts(res.data.msg)
        })
   }

   const completeOrder = ()=> {
      axios.post(`https://poolbackendservice.onrender.com/completeorder?orderid=${selectedOrder}&played=${played}`).then((res)=> {
        updateStatus()
        getDetail(selectedOrder, played)
        alert(res.data.msg)
      }).catch((err)=> {
        alert(err)
      })
   }


   const updateStatus = ()=> {
        axios.get(`https://poolbackendservice.onrender.com/orders/all`).then((res)=> {
            dispatch(orderAction(res.data.msg))
        })
        axios.get(`https://poolbackendservice.onrender.com/tables`).then((res)=> {
            dispatch(tableAction(res.data.msg))
        })
   }


   const addItem = (product)=> {
    axios.post(`https://poolbackendservice.onrender.com/additem?orderid=${selectedOrder}&name=${product}`).then((res)=> {
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


    // initial load products
   useEffect(()=> {
    getProducts()
   },[])



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
                                    <p style={{color:item.completed? "gray" : "white"}}>{new Date(item.createdat).toISOString().split('T')[0]}</p>
                                    <p style={{color:item.completed? "gray" : "white"}}>{new Date(item.createdat).toISOString().split('T')[1].split('.')[0].slice(0,5)}</p>
                                    <p style={{color:item.completed? "gray" : "white"}}>{new Date(item.updatedat).toISOString().split('T')[1].split('.')[0].slice(0,5)}</p>
                                    <Button>{item.completed ? <CheckCircleOutlineIcon sx={{color:'yellowgreen', width:20}}></CheckCircleOutlineIcon> : <MoreHorizIcon sx={{color:'white', width:20}}></MoreHorizIcon>}</Button>
                                    {item.played? <SportsBaseballIcon sx={{width:20, color:item.completed?"gray":"white"}}></SportsBaseballIcon> : 
                                    <HorizontalRuleIcon sx={{width:20, color:item.completed?"gray":"white"}}></HorizontalRuleIcon>
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
                                <p>Bestellungsdetails</p>
                                { details.map((item,index)=> 
                                <Box p={1} boxShadow={2} width={'80%'} margin={'auto'} bgcolor={'white'} key={index} display={'flex'} flexDirection={'row'} justifyContent='space-around'>
                                    <Button onClick={()=> decreaseItem(item.name)} style={{fontWeight:'bold', fontSize:20, color:'#696969'}} >-</Button>
                                    <p>{item.name}</p> 
                                    <p>{item.quantity} x</p>   
                                    <p>{item.price}</p>   
                                    <Button onClick={()=> increaseItem(item.name)} style={{fontWeight:'bold', fontSize:20, color:'#696969'}}>+</Button>
                                </Box>   
                                )}
                                {selectedOrder ?   <Box boxShadow={3} bgcolor={'white'} width={'80%'}  p={1} margin='2rem auto' display={'flex'} flexDirection={'row'} alignItems={'center'} justifyContent={'center'} gap={2}>
                                    <p style={{color:'#696969'}}>Gesamt</p>
                                    <p style={{color:'#696969'}}>{poolBool? orderandpool : total}</p>
                                </Box>: <p>Bitte Bestellung wählen</p> }

                                <FormGroup sx={{display:'flex', justifyContent:'center', alignItems:'center'}}>
                                    <FormControlLabel control={<Checkbox checked={checked} onChange={checkHandler} />} label="Billard" />
                                </FormGroup>
                        </Box>

                            <ProductSelection products={products} addItem={addItem}></ProductSelection>
                         <Box sx={{position:'relative'}} width={300} m={'auto'} marginY={5}>
                             <DialogModule openHandler={completeOrder} buttonName={'Bestellung abschliessen'}
                             title={'Sind Sie sicher?'} text={'Bestellung abschliessen?'} btnColor={'#DC143C'} hoverColor={'red'}
                             ></DialogModule>     
                         </Box>  

                     </Box>
                       
            </Box>
        </Modal>
    )
}

export default Detailview