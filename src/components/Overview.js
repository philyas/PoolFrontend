import {Box, Button, Drawer, Grid, Stack} from '@mui/material'
import Pooltable from './Pooltable';
import { useEffect, useState } from 'react';
import axios from 'axios'
import ProductDialog from './ProductDialog';
import {useSelector, useDispatch } from 'react-redux'
import classes from './Overview.module.css'
import DialogModule from './DialogModule';
import TableRestaurant from '@mui/icons-material/TableRestaurant';
import { orderAction } from '../slices/OrderSlice'
import { tableAction} from '../slices/TableSlice'
import {productAction} from '../slices/ProductSlice'
import { Link } from 'react-router-dom';
import DashboardIcon from '@mui/icons-material/Dashboard';
import MenuIcon from '@mui/icons-material/Menu';
import palaceimg from './assets/palaceimg.png'
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import {TextField} from '@mui/material';
import LogoutIcon from '@mui/icons-material/Logout';
import { useNavigate } from 'react-router-dom';
import { tokenAction } from '../slices/TokenSlice';
import SyncIcon from '@mui/icons-material/Sync';

function Overview() {
     const [open,setOpen] = useState(false)
     const [products, setProducts] = useState([])
     const [product, setProduct] = useState("")
     const [price, setPrice] = useState()

     const dispatch = useDispatch()
     const tableSelector = useSelector((state)=> state.table.value)
     const tokenSelector = useSelector((state)=> state.token.value )

     const color = 'white'

     const navigate = useNavigate()

     function getTables() {
        axios.get('https://poolbackendservice.onrender.com/tables',
        { headers: { authorization: 'BEARER '+ localStorage.getItem('token')}}
        ).then((res)=> {
            try {
                dispatch(tableAction(res.data.msg))
            }
            catch(err) {
                console.error(err)
            }
        }).catch((err)=> {
            alert(err)
        })

     }

     function getAllOrders() {
        axios.get('https://poolbackendservice.onrender.com/orders/all').then((res)=> {
            try {
                console.log(res.data.msg)
                dispatch(orderAction(res.data.msg))
            }
            catch(err) {
                console.error(err)
            }
        }).catch((err)=> {
            console.log("Noch keine Einträge vorhanden!")
        })
     }

     function getProducts () {
        axios.get('https://poolbackendservice.onrender.com/products').then((res)=> {
            try {
                console.log(res.data.msg)
                dispatch(productAction(res.data.msg))
            }
            catch(err) {
                console.error(err)
            }
        }).catch((err)=> {
            console.log("Noch keine Einträge vorhanden!")
        })
   }

   const reload = ()=> {
    getTables()
    getAllOrders()
    getProducts()
   }


     useEffect(()=> {
       reload()
     }, [])



     const createTable = ()=> {
        axios.post('https://poolbackendservice.onrender.com/tables', {} , 
        { headers: { authorization: 'BEARER '+ localStorage.getItem('token')}}
        ).then((res)=> {
            alert("Tisch wurde hinzugefügt!")
           getTables()
        }).catch((err)=> {
            alert(err)
        })
     }


     const createProduct = (product)=> {
        if (!product.name || !product.price) return alert('not valid')
        
        axios.post(`https://poolbackendservice.onrender.com/products?name=${product.name}&price=${product.price}`, {},
        { headers: { authorization: 'BEARER '+ localStorage.getItem('token')}}
        ).then((res)=> {
            alert(res.data.msg)
            getProducts()
        }).catch((err)=> {alert(err)})
     }



     const updateProduct = ()=> {
        if (!price || price === "" || !product) return alert("select values!")
        axios.post(`https://poolbackendservice.onrender.com/updateproduct?productid=${product}&price=${price}`, {},
        { headers: { authorization: 'BEARER '+ localStorage.getItem('token')}}
        )
        .then((res)=> {
            alert("Price Updated!")
        })
     }

     const priceHandler = (event)=> {
        setPrice(event.target.value)
     }

     const productHandler = (event)=> {
        setProduct(event.target.value)
     }

     const logOut = ()=> {
        dispatch(tokenAction(false))
        navigate('/')
        localStorage.clear()
     }


    return(
        <Box>
          <Button sx={{padding:1,margin:3, background:'white',"&:hover":{background:'white'}, boxShadow:'2px'}} variant='contained' onClick={()=> setOpen(true)}><MenuIcon sx={{color:'black'}}></MenuIcon></Button>
          <Drawer 
            anchor='left'
            open={open}
            onClose={()=> setOpen(false) }>
            <Box  className={classes.flex} lg={2} boxShadow={2} style={{ alignItems:'center',height:'100%', display:'flex', flexDirection:'column'}} >   
                <Box style={{ width:300, height:120, display:'flex', justifyContent:'center', alignItems:'center'}}><img style={{width:120, height:150, margin:'auto'}} src={palaceimg} alt='palaceimg'></img></Box>
             {
                tokenSelector.userid === 'admin' ? 
                <>
                             <p style={{marginBottom:0,color:color }}>Tisch hinzufügen</p>
                <DialogModule openHandler={createTable} title={'Sind Sie sicher?'}
                text={'Neuen Tisch erstellen?'} buttonName={<TableRestaurant sx={{color:'#DC143C'}}></TableRestaurant>} 
                btnColor={'white'} hoverColor={'white'} color={'#DC143C'}
                />
                <p style={{marginBottom:0,color:color }}>Produkt hinzufügen</p>
                <ProductDialog  openHandler={(product)=>createProduct(product)}></ProductDialog>

                <p style={{marginBottom:0,color:color }}>Produkt ändern</p>
                <DialogModule openHandler={updateProduct}
                title={'Produkt Update'}
                 buttonName={<TableRestaurant sx={{color:'#DC143C'}}></TableRestaurant>} 
                btnColor={'white'} hoverColor={'white'} color={'#DC143C'}
                >
                    <Stack flexDirection={'column'} gap={2}>
                  
                    <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">Produkt</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        label="Product"
                        onChange={productHandler}
                        value={product}
                    >
                        {products.map((item,index)=> <MenuItem key={index} value={item.id}>{item.name}</MenuItem>)}
                    </Select>
                    </FormControl>

                    <TextField  required type={'number'} label="Preis" variant="outlined" onChange={priceHandler}></TextField>
                    </Stack>
                </DialogModule>

                <p style={{marginBottom:0,color:color }}>Dashboard</p>
                <Link style={{textDecoration:'none'}} to={"/dashboard"}>
                 
                        <Button sx={{background:'white',"&:hover": {background:'white'},color:color, width:'100%'}} variant='contained'>
                            <DashboardIcon style={{color:'#DC143C'}}></DashboardIcon>
                        </Button>
               
                </Link>
                </> :
                null
             }
               
                <p style={{marginBottom:0, color:color}}>Ausloggen</p>
                <DialogModule title={'Ausloggen?'} openHandler={logOut} text={'Sind Sie sicher?'}
                 buttonName={<LogoutIcon sx={{color:'#DC143C'}}></LogoutIcon>} 
                 btnColor={'darkred'} hoverColor={'white'} color={'#DC143C'}
                ></DialogModule>
                    
              </Box>
            </Drawer>
           <Button onClick={reload}><SyncIcon></SyncIcon></Button>
           <Box display={'flex'} alignItems={'center'}>
            <Grid container display={'flex'} alignItems={'center'} justifyContent={'center'} gap={2}  >
                    {tableSelector.map((table, index)=>
                    <Grid key={index} item lg={2}  alignItems={'center'} justifyContent={'center'} display='flex'>
                        <Pooltable tableid={table.id} busy={table.busy} ></Pooltable>
                    </Grid>)}
                </Grid>
           </Box>
        </Box>
  
    )
}

export default Overview;