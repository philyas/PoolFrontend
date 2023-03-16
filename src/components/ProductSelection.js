import { useState } from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { Button } from '@mui/material';
import axios from 'axios';

function ProductSelection({products, addItem}) {
    const [selectedProduct,setSelectedProduct] = useState()

  const handleChange = (event) => {
    setSelectedProduct(event.target.value);
  };

  return (
    <Box sx={{ width:300 , margin:'auto', marginTop:10, display:'flex', flexDirection:'column', gap:2 }}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Produkt</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={selectedProduct}
          label="Product"
          onChange={handleChange}
        >
          {products.map((item,index)=> <MenuItem key={index} value={item.name}>{item.name}</MenuItem>)}
        </Select>
      </FormControl>
      <Button onClick={()=>addItem(selectedProduct)} sx={{background:'#000000'}} variant='contained'>Hinzufügen</Button>
    </Box>
  );
}

export default ProductSelection