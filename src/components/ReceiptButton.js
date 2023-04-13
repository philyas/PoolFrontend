import { PDFDownloadLink, Document, Page, Text, StyleSheet} from '@react-pdf/renderer';
import {Box} from '@mui/material'

const styles = StyleSheet.create({
  body: {
    width:'100%',
    paddingLeft:'10%'
  },
  title: {
    fontSize:24,
    textAlign:'center',
    marginBottom:5,
    marginTop:20
  },
  secondtitle:{
    fontSize:12,
    textAlign:'center',
    marginBottom:10
  },
  text:{
    textAlign:'justify',
    fontFamily:'Times-Roman',
    fontSize:16,
    width:'25%'
  },
  result: {
      fontFamily:'Times-Roman',
      marginTop:10,
      fontSize:16,
      fontWeight:'bold'
  }
})

const Receipt = ({data}) => (
  <Document>
    <Page style={styles.body}>
       <Text style={styles.title}>Quittung Tisch Nr. {data.tableid} </Text>
       <Text style={styles.secondtitle}>Vorgangsnummer {data.orderid} </Text>
        {
          data.details.map((row,index)=>
            <div key={index} style={{display:'flex',width:'100%', flexDirection:'row', justifyContent:'space-between', marginTop:15}}>
              <Text style={styles.text}>{new Date(row.createdat).toLocaleString()}</Text>
              <Text style={styles.text}>{row.name}</Text>
              <Text style={styles.text}>{row.quantity} x</Text>
              <Text style={styles.text}>{row.price} €</Text>
            </div>
          )
        }
        
            <Text style={{textAlign:'center', marginTop:30, fontWeight:'bold', fontSize:14}}>Bestellung: {data.total} €</Text>
            <Text style={{textAlign:'center', marginTop:10, fontWeight:'bold', fontSize:14}}>Billard: {data.pooltotal} €</Text>
            <Text style={{textAlign:'center', marginTop:10, fontWeight:'bold', fontSize:14}}>Gesamt: {Number(data.pooltotal)+ Number(data.total)} €</Text>
    </Page>
  </Document>
);

const ReceiptButton = ({data}) => (
  <Box my={2}>
    <PDFDownloadLink style={{color:'black'}} document={<Receipt data={data}  />} fileName={"Quittung.pdf"}>
      {({ blob, url, loading, error }) =>
        loading ? 'Loading...' : 'Quittung drucken'
      }
    </PDFDownloadLink>
  </Box>
);

export default ReceiptButton

