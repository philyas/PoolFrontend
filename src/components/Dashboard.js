import {Box, MenuItem, Select } from '@mui/material'
import { Link } from 'react-router-dom'
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import TableComponent from './TableComponent';
import axios from 'axios';
import { useEffect, useState } from 'react';

const Dashboard = ()=> {
    const [data, setData] = useState([])
    const [total, setTotal] = useState()
    const [subtotal, setSubtotal] = useState()
    const [month, setMonth] = useState(new Date().getMonth()+1)
    const [year, setYear] = useState(new Date().getFullYear())
    const [pooltime,setPooltime] = useState()

    const months = [ {name:'Januar', value:1},
                    {name:'Februar', value:2},
                    {name:'März', value:3},
                    {name:'April', value:4},
                    {name:'Mai', value:5},
                    {name:'Juni', value:6},
                    {name:'Juli', value:7},
                    {name:'August', value:8},
                    {name:'September', value:9},
                    {name:'Oktober', value:10},
                    {name:'November', value:11},
                    {name:'Dezember', value:12} ]

    const fetchData = ()=> {
        axios.get(`https://poolbackendservice.onrender.com/filterorder?month=${month}&year=${year}`).then((res)=> {
            setData(res.data.msg.details)
            setSubtotal(res.data.msg.total[0].subtotal)
            setTotal(res.data.msg.orderandpool)
            setPooltime(res.data.msg.pooltime)
        })
    }

    useEffect(fetchData, [month,year])

    const monthHandler = (event)=> {
        setMonth(event.target.value)
    }

    const yearHandler = (event)=> {
       setYear(event.target.value)
    }

    return(
        <Box  sx={{ background:'white', margin:0, padding:2}}>
              <Link style={{textDecoration:'none'}} to={"/"}><ArrowBackIcon sx={{margin:2, color:'black'}}></ArrowBackIcon></Link>
              <Box>
                  <Box display={'flex'} gap={2}>
                      <Select onChange={monthHandler} value={month} label={'Monat'}>
                            {months.map((item)=> <MenuItem key={item.value} value={item.value}>{item.name}</MenuItem>)}
                      </Select>
                        <Select onChange={yearHandler} value={year} label={'Jahr'}>
                            <MenuItem value={year}>{year}</MenuItem>
                      </Select>
                        
                  </Box> 
                  <p>{month}/{year}</p>
                  <Box >
                       <TableComponent data={data}></TableComponent>
                  </Box>
                  <Box m={'auto'} mt={3} boxShadow={1}  width={250} p={1} textAlign='center'  >
                    <p style={{fontFamily:'sans-serif'}}>Orders {Number(subtotal).toFixed(2)} €</p>
                  </Box>
                  <Box m={'auto'} width={250}  boxShadow={1} p={1} textAlign='center'  >
                    <p style={{fontFamily:'sans-serif'}}>Billard {Number(pooltime).toFixed(2)} €</p>
                  </Box>
        
                  <Box m={'auto'} width={250}  boxShadow={1} p={1} textAlign='center'  >
                    <p style={{fontFamily:'sans-serif'}}>Summe {Number(total).toFixed(2)} €</p>
                  </Box>
              </Box>
        </Box>
    )
}

export default Dashboard