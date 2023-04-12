import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';


 const TableComponent = ({data})=> {
  const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
  const lang = "de-DE"

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 250 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Datum</TableCell>
            <TableCell align="right">Tisch Nr.</TableCell>
            <TableCell align="right">Order Sum</TableCell>
            <TableCell align='right'>Pool Sum</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row,index) => (
            <TableRow
              key={index}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
               <TableCell>{new Date(row.updatedat).toLocaleDateString(lang,options)}</TableCell>
              <TableCell align='right' >{row.table_id}</TableCell>
              <TableCell align="right">{Number(row.ordertotal).toFixed(2)}</TableCell>
              <TableCell align="right">{Number(row.pooltotal).toFixed(2)}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default TableComponent