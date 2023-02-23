import {Box, MenuItem, Select } from '@mui/material'
import { Link } from 'react-router-dom'
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import TableComponent from './TableComponent';
import axios from 'axios';
import { useEffect, useState } from 'react';

const Dashboard = ()=> {
    const [data, setData] = useState([])
    const [total, setTotal] = useState()
    const [month, setMonth] = useState(1)
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
        axios.get(`http://localhost:3002/filterorder?month=${month}&year=${year}`).then((res)=> {
            setData(res.data.msg.details)
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
        <Box style={{ background:'white', margin:0, padding:0}}>
              <Link style={{textDecoration:'none'}} to={"/"}><ArrowBackIcon sx={{margin:2}}></ArrowBackIcon></Link>
              <Box py={2} px={10}>
                  <Box display={'flex'} gap={2}>
                      <Select onChange={monthHandler} value={month} label={'Monat'}>
                            {months.map((item)=> <MenuItem key={item.value} value={item.value}>{item.name}</MenuItem>)}
                      </Select>
                        <Select onChange={yearHandler} value={year} label={'Jahr'}>
                            <MenuItem value={year}>{year}</MenuItem>
                      </Select>
                        
                  </Box> 
                  <p>{month}/{year}</p>
                  <Box sx={{height:'65vh', overflowY:'scroll'}}>
                       <TableComponent data={data}></TableComponent>
                  </Box>
        
                  <Box mt={2} boxShadow={3} py={1} textAlign='center' borderRadius={1} width='100%'>
                    <p style={{fontFamily:'sans-serif'}}>Summe {Number(total).toFixed(2)} €</p>
                  </Box>
              </Box>
        </Box>
    )
}

export default Dashboard