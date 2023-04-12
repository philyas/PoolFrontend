import {Box, MenuItem, Select } from '@mui/material'
import { Link } from 'react-router-dom'
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import TableComponent from './TableComponent';
import axios from 'axios';
import { useEffect, useState } from 'react';
import Datepicker from './Datepicker'
import PDFDownloadButton from './PDFDownloadButton';

const Dashboard = ()=> {
    const [data, setData] = useState([])
    const [total, setTotal] = useState()
    const [subtotal, setSubtotal] = useState()
    const [month, setMonth] = useState(new Date().getMonth()+1)
    const [year, setYear] = useState(new Date().getFullYear())
    const [pooltime,setPooltime] = useState()
    const [day, setDay] = useState()

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
            if (!day) {
                axios.get(`https://poolbackendservice.onrender.com/filterorder?month=${month}&year=${year}`).then((res)=> {
                    setData(res.data.msg.details)
                    setSubtotal(res.data.msg.total[0].sum)
                    setTotal(res.data.msg.orderandpool)
                    setPooltime(res.data.msg.pooltime[0].sum)

                    console.log(res.data.msg)
                })
            }
            else {
                axios.get(`https://poolbackendservice.onrender.com/filterorder?month=${month}&year=${year}&day=${day}`).then((res)=> {
                    setData(res.data.msg.details)
                    setSubtotal(res.data.msg.total[0].sum)
                    setTotal(res.data.msg.orderandpool)
                    setPooltime(res.data.msg.pooltime[0].sum)

                    console.log(res.data.msg)
                })
            }
    }

    useEffect(fetchData, [month,year,day])

    const monthHandler = (event)=> {
        setDay(undefined)
        setMonth(event.target.value)
    }

    const yearHandler = (event)=> {
        setDay(undefined)
       setYear(event.target.value)
    }

    const dateHandler = (_date)=> {
        setMonth(new Date(_date).getMonth()+1)
        setYear(new Date(_date).getFullYear())
        setDay(new Date(_date).getDate())
    }

    return(
        <Box sx={{ background:'white', margin:0, padding:2}}>
              <Link style={{textDecoration:'none'}} to={"/home"}><ArrowBackIcon sx={{margin:2, color:'black'}}></ArrowBackIcon></Link>
              <Box>
                  <Box display={'flex'} gap={2} alignItems={'center'}>
                      <Select sx={{height:55}} onChange={monthHandler} value={month} label={'Monat'}>
                            {months.map((item)=> <MenuItem key={item.value} value={item.value}>{item.name}</MenuItem>)}
                      </Select>
                        <Select sx={{height:55}} onChange={yearHandler} value={year} label={'Jahr'}>
                            <MenuItem value={2023}>{2023}</MenuItem>
                            <MenuItem value={2024}>{2024}</MenuItem>
                      </Select>
                
                      <Datepicker dateHandler={dateHandler}></Datepicker>
                  </Box> 
                  <Box width={200} display={'flex'} justifyContent={'space-between'} alignItems={'center'}>
                    <p>{month}/{year}</p>
                    <PDFDownloadButton data={{month:month, year:year, details:data, subtotal:subtotal, pooltime:pooltime, total:total}}></PDFDownloadButton>
                  </Box>
       
                  <Box>
                       <TableComponent data={data}></TableComponent>
                  </Box>
                  <Box m={'auto'} mt={3} boxShadow={1}  width={250} p={1} textAlign='center'  >
                    <p style={{fontFamily:'Times New Roman'}}>Orders {Number(subtotal).toFixed(2)} €</p>
                  </Box>
                  <Box m={'auto'} width={250}  boxShadow={1} p={1} textAlign='center'  >
                    <p style={{fontFamily:'Times New Roman'}}>Billard {Number(pooltime).toFixed(2)} €</p>
                  </Box>
        
                  <Box m={'auto'} width={250}  boxShadow={1} p={1} textAlign='center'  >
                    <p style={{fontFamily:'Times New Roman'}}>Summe {Number(total).toFixed(2)} €</p>
                  </Box>
              </Box>
        </Box>
    )
}

export default Dashboard