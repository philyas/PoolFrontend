import {Box, Button, Drawer, Grid} from '@mui/material'
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
import { Link } from 'react-router-dom';
import DashboardIcon from '@mui/icons-material/Dashboard';
import MenuIcon from '@mui/icons-material/Menu';
import palaceimg from './assets/palaceimg.png'


function Overview() {
     const [open,setOpen] = useState(false)

     const dispatch = useDispatch()
     const tableSelector = useSelector((state)=> state.table.value)
     const color = 'white'

     function getTables() {
        axios.get('https://poolbackendservice.onrender.com/tables').then((res)=> {
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
                dispatch(orderAction(res.data.msg))
            }
            catch(err) {
                console.error(err)
            }
        }).catch((err)=> {
            console.log("Noch keine Einträge vorhanden!")
        })
     }


     useEffect(()=> {
        getTables()
        getAllOrders()
     },[])


     const createTable = ()=> {
        axios.post('https://poolbackendservice.onrender.com/tables').then((res)=> {
            alert("Tisch wurde hinzugefügt!")
           getTables()
        }).catch((err)=> {
            alert(err)
        })
     }


     const createProduct = (product)=> {
        if (!product.name || !product.price) return alert('not valid')
        
        axios.post(`https://poolbackendservice.onrender.com/products?name=${product.name}&price=${product.price}`).then((res)=> {
            alert(res.data.msg)
        }).catch((err)=> {alert(err)})
     }


    return(
        <Box>
            <Button sx={{padding:1,margin:3, background:'white',"&:hover":{background:'white'}, boxShadow:2}} variant='contained' onClick={()=> setOpen(true)}><MenuIcon sx={{color:'black'}}></MenuIcon></Button>
          <Drawer 
            anchor='left'
            open={open}
            onClose={()=> setOpen(false) }
          >
            <Box  className={classes.flex} item lg={2} boxShadow={2} style={{ alignItems:'center',height:'100%', display:'flex', flexDirection:'column'}} >   
                <Box style={{marginBottom:'3rem', width:300, height:200}}><img style={{width:300, height:300}} src={palaceimg}></img></Box>
             
                <p style={{marginBottom:0,color:color }}>Tisch hinzufügen</p>
                <DialogModule openHandler={createTable} title={'Sind Sie sicher?'}
                text={'Neuen Tisch erstellen?'} buttonName={<TableRestaurant sx={{color:'#DC143C'}}></TableRestaurant>} 
                btnColor={'white'} hoverColor={'white'} color={'#DC143C'}
                />
                <p style={{marginBottom:0,color:color }}>Produkt hinzufügen</p>
                <ProductDialog  openHandler={(product)=>createProduct(product)}></ProductDialog>
                <p style={{marginBottom:0,color:color }}>Dashboard</p>
                <Link style={{textDecoration:'none'}} to={"dashboard"}>
                 
                        <Button sx={{background:'white',"&:hover": {background:'white'},color:color, width:'100%'}} variant='contained'>
                            <DashboardIcon style={{color:'#DC143C'}}></DashboardIcon>
                        </Button>
               
                </Link>
                    
              </Box>
            </Drawer>
        
           <Box display={'flex'} alignItems={'center'}>
            <Grid container display={'flex'} alignItems={'center'} justifyContent={'center'} gap={2}  >
                    {tableSelector.map((table, index)=>
                    <Grid key={index} item lg={2}  alignItems={'center'} justifyContent={'center'} display='flex'>
                        <Pooltable tableid={table.tableid} busy={table.busy} ></Pooltable>
                    </Grid>)}
                </Grid>
           </Box>
        </Box>
  
    )
}

export default Overview;