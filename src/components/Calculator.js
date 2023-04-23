import { Box, Button } from "@mui/material"
import { useState } from "react"


const Calculator = ({data})=> {
    let result = data.details
    result = result.map((item,index)=> {
        item.counter = 0
        item.price = Number(item.price)
        item.quantity = Number(item.quantity)
        item.productsum = Number(item.productsum)
        return item
    })

    const [subArr, setSubArr] = useState([]) 
    const [arr, setArr] = useState(Array.from(result))
    let total = data.total
    const [subtotal, setSubtotal] = useState(0)


    const addItemSub = (name, quantity )=> {
       const nextState = arr.map((item)=> {
        if (item.name === name) {
            if (item.counter === quantity) {
                return item
            } 
           return( {...item, counter : item.counter +=1 } ) 
        }
        return item
       })

       setArr(nextState)
       const newSub = arr.reduce((accumulator,currentValue)=> {
        return (accumulator + (currentValue.counter * currentValue.price))
    }, 0)
    setSubtotal(Number(newSub).toFixed(2))
    }



    const addSubOrder = ()=> {
        setSubArr((prev=> {
            let arr = []
            if (prev.length === 0) {
                arr = [...prev, subtotal]
            }
            else {
               if (prev[prev.length-1] === subtotal) {
                alert("Bitte weiter wählen!")
                arr = prev
               }
               else {
                arr = [...prev, subtotal]
               }
            }

            return arr
        }))
    }

    return(
        <Box width={300}>
             <hr></hr>
             <Box  sx={{display:'flex', justifyContent:'space-between'}}> 
          
                <p style={{fontWeight:'bold', flex:'2 1 0'}}>Produkt</p>
                <p style={{fontWeight:'bold', flex:'1 1 0'}}>Anzahl</p>
                
                <Button sx={{margin:'10px auto'}} variant="contained" onClick={addSubOrder}>Sub</Button>

            </Box>
            {arr.map((item,key)=> 
            <Box key={key} sx={{display:'flex', justifyContent:'space-between'}}> 
            
                <p style={{flex:'4 1 0'}}>{item.name}</p>
                <p style={{flex:'1 1 0'}}>{ item.counter + "/" + item.quantity}</p>
                <Button  onClick={()=> addItemSub(item.name, item.quantity )} >+</Button>
            </Box>
            )}
            <Box textAlign={'center'}>
                <hr></hr>
                {subArr.length !== 0 ? <p>1.Bstg. : {Number(subArr[0]).toFixed(2)}</p> : null}
                {subArr.slice(1).map((num, index)=> <p key={index}>{index+2 +".Bstg. : " + Number((num-subArr[index])).toFixed(2)}</p>)}
                <hr></hr>
                <p>Gesamt</p>
                <p >{ subtotal + "/"+ total} €</p>
                <hr></hr>
            </Box>
        </Box>
    )
}

export default Calculator;