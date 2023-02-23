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


function Modalview ({onclose,open,tableid}) {
    const [selectedOrder, setSelectedOrder] = useState()
    const [details, setDetails] = useState([])
    const [total,setTotal] = useState()
    const [products, setProducts] = useState([])
    const [checked, setChecked] = useState(false)
    const [poolPrice, setPoolPrice] = useState()
    const [showPrice, setShowPrice] = useState(false)
    const [orderandpool, setOrderandPool] = useState()


    const dispatch = useDispatch()

    const modalStyle = {
        position:'absolute',
        margin:0,
        right:0,
        width:'60%',
        height:'100%',
        background:'white',
        textAlign:'center',
        outline:0,
        color:'#696969'
    }

    const orderSelector = useSelector((state)=> state.order.value)
    const sortedByTable = orderSelector.filter((order)=> order.tableid === Number(tableid))

    const getDetail = (orderid)=> {
        axios.get(`http://localhost:3002/orderinformation?orderid=${orderid}`).then((res)=> {
            setSelectedOrder(orderid)
            setDetails(res.data.msg.order)
            setTotal(Number(res.data.msg.total).toFixed(2))
            setOrderandPool(Number(res.data.msg.orderandpool).toFixed(2))
            setPoolPrice(Number(res.data.msg.poolprice).toFixed(2))
        })
    }

 

    const increaseItem = (productname)=> {
        axios.post(`http://localhost:3002/additem?orderid=${selectedOrder}&name=${productname}`).then((res)=> {
            getDetail(selectedOrder)
        }).catch((err)=> {
            alert(err)
        })
    }

    const decreaseItem = (productname)=> {
        axios.post(`http://localhost:3002/removeitem?orderid=${selectedOrder}&name=${productname}`).then((res)=> {
            getDetail(selectedOrder)
        }).catch((err)=> {
            alert(err)
        })
    }

   const getProducts = ()=> {
        axios.get('http://localhost:3002/products').then((res)=> {
            setProducts(res.data.msg)
        })
   }

   const completeOrder = ()=> {
      axios.post(`http://localhost:3002/completeorder?orderid=${selectedOrder}&played=${showPrice}`).then((res)=> {
        updateStatus()
        alert(res.data.msg)
      }).catch((err)=> {
        alert(err)
      })
   }


   const updateStatus = ()=> {
        axios.get(`http://localhost:3002/orders/all`).then((res)=> {
            dispatch(orderAction(res.data.msg))
        })
        axios.get(`http://localhost:3002/tables`).then((res)=> {
            dispatch(tableAction(res.data.msg))
        })
   }


   const addItem = (product)=> {
    axios.post(`http://localhost:3002/additem?orderid=${selectedOrder}&name=${product}`).then((res)=> {
        getDetail(selectedOrder)
      }).catch((err)=> {
        alert(err)
      })
   }

   const checkHandler =(e)=> {
         setChecked(e.target.checked)
         if (e.target.checked) setShowPrice(true)
         else setShowPrice(false)
   }

   const pickHandler = (id)=> {
      let element = document.getElementById(id)
      removeSelected()
      element.style.boxShadow = "0 0 8px green"
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
            style={{margin:0 }}
            open={open} 
            onClose={onclose}
            >
            <Box sx={modalStyle}>
                <Grid container display={'flex'} flexDirection={'row'} height={'100%'}>
                    <Grid item height={'100%'} width={'50%'} style={{overflowY:'auto', borderRightStyle:'dotted',borderColor:'lightgray', borderWidth:1}}>
                        <p>Bestellungen Tisch {tableid}</p>
                        <div style={{display:'flex', flexDirection:'column', justifyContent:'space-between', width:'80%', margin:'auto'}}>
                            {sortedByTable.map((item,index)=>
                            <Box  id={index} className="boxclass"  boxShadow={5} bgcolor={item.completed? 'white' : "beige"}  sx={{"&:hover": {boxShadow:'0 0 5px 2px green'}} } 
                             onClick={()=> {
                                getDetail(item.id)
                                pickHandler(index)
                                }} p={1} m={1} borderRadius={1} key={index}>
                                <div style={{display:'flex', flexDirection:'row', justifyContent:'space-around'}}>
                                    <p>{new Date(item.createdat).toISOString().split('T')[0]}</p>
                                    <p>{new Date(item.createdat).toISOString().split('T')[1].split('.')[0]}</p>
                                    <p>{new Date(item.updatedat).toISOString().split('T')[1].split('.')[0]}</p>
                                    <Button>{item.completed ? <CheckCircleOutlineIcon style={{color:'yellowgreen'}}></CheckCircleOutlineIcon> : <MoreHorizIcon style={{color:'white'}}></MoreHorizIcon>}</Button>
                                </div>
                            </Box>)}
                        </div>  
                    </Grid>
                    <Grid item height={'100%'} width={'50%'} style={{overflowY:'auto'}}>
                        <Box display={'flex'} flexDirection={'column'} gap={1}>
                            <p>Bestellungsdetails</p>
                            { details.map((item,index)=> 
                            <Box p={1} boxShadow={2} borderRadius={1} width={'80%'} margin={'auto'} bgcolor={'white'} key={index} display={'flex'} flexDirection={'row'} justifyContent='space-around'>
                                <Button onClick={()=> decreaseItem(item.name)} style={{fontWeight:'bold', fontSize:20, color:'#696969'}} >-</Button>
                                <p>{item.name}</p> 
                                 <p>{item.quantity} x</p>   
                                 <p>{item.price}</p>   
                                 <Button onClick={()=> increaseItem(item.name)} style={{fontWeight:'bold', fontSize:20, color:'#696969'}}>+</Button>
                             </Box>   
                            )}
                            {selectedOrder ?   <Box boxShadow={3} bgcolor={'white'} width={'80%'}  p={1} margin='2rem auto' display={'flex'} flexDirection={'row'} alignItems={'center'} justifyContent={'center'} gap={2}>
                                <p style={{color:'#696969'}}>Gesamt</p>
                                <p style={{color:'#696969'}}>{checked ? orderandpool : total}</p>
                            </Box>: <p>Bitte Bestellung wählen</p> }
                        
                            {/*
                              showPrice ?  <Box boxShadow={2} bgcolor='white' width={'80%'}  p={1} margin='auto' >
                                <p>Pool Price {poolPrice}</p>
                            </Box> : null
                            */}
                            <FormGroup sx={{display:'flex', justifyContent:'center', alignItems:'center'}}>
                                <FormControlLabel control={<Checkbox checked={checked} onChange={checkHandler} />} label="Billard" />
                            </FormGroup>
                        </Box>
                         <ProductSelection products={products} addItem={addItem}></ProductSelection>
                         <Box sx={{position:'absolute', bottom:10, right:10}}>
                             <DialogModule openHandler={completeOrder} buttonName={'Bestellung abschliessen'}
                             title={'Sind Sie sicher?'} text={'Bestellung abschliessen?'} btnColor={'yellowgreen'} hoverColor={'orange'}
                             ></DialogModule>     
                         </Box>  
                    </Grid>
                </Grid>
             
            </Box>
        </Modal>
    )
}

export default Modalview