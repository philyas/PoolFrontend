import {Box, Button, Grid} from '@mui/material'
import Pooltable from './Pooltable';
import pooltable from './assets/poolimg.png'
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


function Overview() {

     const dispatch = useDispatch()
     const tableSelector = useSelector((state)=> state.table.value)
     const color = 'white'

     function getTables() {
        axios.get('http://localhost:3002/tables').then((res)=> {
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
        axios.get('http://localhost:3002/orders/all').then((res)=> {
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
        axios.post('http://localhost:3002/tables').then((res)=> {
            alert("Tisch wurde hinzugefügt!")
           getTables()
        }).catch((err)=> {
            alert(err)
        })
     }


     const createProduct = (product)=> {
        if (!product.name || !product.price) return alert('not valid')
        
        axios.post(`http://localhost:3002/products?name=${product.name}&price=${product.price}`).then((res)=> {
            alert(res.data.msg)
        }).catch((err)=> {alert(err)})
     }


    return(
        <Grid container display={'flex'} height={'100vh'} >
            <Grid  className={classes.flex} item lg={2} boxShadow={2} style={{ alignItems:'center',height:'100%', display:'flex', flexDirection:'column'}} >   
                <h1 style={{marginBottom:'3rem',color:color }}>Order Management</h1>
             
                <p style={{marginBottom:0,color:color }}>Tisch hinzufügen</p>
                <DialogModule openHandler={createTable} title={'Sind Sie sicher?'}
                text={'Neuen Tisch erstellen?'} buttonName={<TableRestaurant></TableRestaurant>} 
                btnColor={'white'} hoverColor={'white'} color={'#032729'}
                />
                <p style={{marginBottom:0,color:color }}>Produkt hinzufügen</p>
                <ProductDialog  openHandler={(product)=>createProduct(product)}></ProductDialog>
                <p style={{marginBottom:0,color:color }}>Dashboard</p>
                <Link style={{textDecoration:'none'}} to={"dashboard"}>
                 
                        <Button sx={{background:'white',"&:hover": {background:'white'},color:color, width:'100%'}} variant='contained'>
                            <DashboardIcon style={{color:'#032729'}}></DashboardIcon>
                        </Button>
               
                </Link>
                   
            </Grid>
        
           <Grid item lg={10} boxShadow={2} height={'100%'} display={'flex'} alignItems={'center'}>
            <Grid container display={'flex'} alignItems={'center'} justifyContent={'center'} gap={2}  >
                    {tableSelector.map((table, index)=>
                    <Grid key={index} item lg={2}  alignItems={'center'} justifyContent={'center'} display='flex'>
                        <Pooltable source={pooltable} tableid={table.tableid} busy={table.busy} ></Pooltable>
                    </Grid>)}
                </Grid>
           </Grid>
        </Grid>
  
    )
}

export default Overview;