import { useState } from 'react';
import Box from '@mui/material/Box';
import { Button } from '@mui/material';
import {TextField, Autocomplete} from '@mui/material';

function ProductSelection({products, addItem}) {
    const [selectedProduct,setSelectedProduct] = useState(null)

  const handleChange = (event, value) => {
    console.log(value)
    setSelectedProduct(value);
  };

  return (

    <Box sx={{ width:300 , margin:'auto', marginTop:10, display:'flex', flexDirection:'column', gap:2 }}>
      <Autocomplete
      id="combo-box-demo"
      getOptionLabel={(option) => option.name}
      options={products}
      value={selectedProduct}
      sx={{ width: 300 }}
      onChange={handleChange}
      renderInput={(params) => <TextField {...params} label="Produkte" />}
    />

      <Button onClick={()=>addItem(selectedProduct?.id)} sx={{background:'#000000'}} variant='contained'>Hinzufügen</Button>
    </Box>

  );
}

export default ProductSelection