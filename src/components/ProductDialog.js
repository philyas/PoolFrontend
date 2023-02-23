import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { useState, useRef } from 'react';
import { TextField } from '@mui/material';
import FastfoodIcon from '@mui/icons-material/Fastfood';

const  ProductDialog = ({openHandler}) => {
    const [open, setOpen] = useState(false)
    const nameRef = useRef()
    const priceRef = useRef()

    const handleClickOpen = () => {
        setOpen(true);
    };


    const cancel = () => {
        setOpen(false);
    };


    const confirm = ()=> {
        const productInfo = {
            name:nameRef.current.value,
            price:priceRef.current.value
        }
        openHandler(productInfo)
        setOpen(false);
    }

  return (
    <div>
      <Button style={{width:'100%', background:'white', color:'#032729'}} variant="contained" onClick={handleClickOpen}>
          <FastfoodIcon></FastfoodIcon>
      </Button>
      <Dialog
        open={open}
        onClose={cancel}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Neues Produkt"}
        </DialogTitle>
        <DialogContent style={{display:'flex', flexDirection:'column', gap:'15px'}}>
          <TextField inputRef={nameRef} required label="Name" variant="outlined" />
          <TextField inputRef={priceRef} required type={'number'} label="Preis" variant="outlined" />
        </DialogContent>
        <DialogActions>
          <Button onClick={cancel}>Abbrechen</Button>
          <Button onClick={confirm} autoFocus>
            Erstellen
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default ProductDialog;