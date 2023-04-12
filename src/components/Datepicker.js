import * as React from 'react';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { Box } from '@mui/material';

const Datepicker = ({dateHandler}) => {

  return (
    <Box>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DemoContainer sx={{padding:0,margin:0}} components={['DatePicker']}>
        <DatePicker label={'Datum'} format='DD.MM.YYYY' onChange={dateHandler} />
      </DemoContainer>
    </LocalizationProvider>
    </Box>
  );
}

export default Datepicker