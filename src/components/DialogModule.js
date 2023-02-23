import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useState } from 'react';

function DialogModule({openHandler, buttonName, title,text, btnColor, hoverColor, color}) {
  const [open, setOpen] = useState(false)

  const handleClickOpen = () => {
    setOpen(true);
  };

  const cancel = () => {
    setOpen(false);
  };

  const confirm = ()=> {
    openHandler()
    setOpen(false);
  }

  return (
    <div style={{textAlign:'center'}}>
      <Button sx={{width:'100%', color:color, marginTop:1, background:btnColor, "&:hover":{background:hoverColor} }}  variant="contained" onClick={handleClickOpen}>
        {buttonName}
      </Button>
      <Dialog
        open={open}
        onClose={cancel}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {title}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
           {text}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={cancel}>Abbrechen</Button>
          <Button onClick={confirm} autoFocus>
            Ja
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default DialogModule