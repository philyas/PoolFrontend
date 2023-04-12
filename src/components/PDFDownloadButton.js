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
    marginTop:10
  },
  text:{
    textAlign:'justify',
    fontFamily:'Times-Roman',
    fontSize:16,
    width:'25%'
  },
  result: {
      fontFamily:'Times-Roman',
      fontSize:16,
      fontWeight:'bold'
  }
})

const MyDoc = ({data}) => (
  <Document>
    <Page style={styles.body}>
       <Text style={styles.title}>Abrechnung {data.month}/{data.year}</Text>
       <div style={{marginBottom:15, marginTop:5}}>
        <Text style={styles.result}>Bestellungen: {Number(data.subtotal).toFixed(2)} €</Text>
        <Text style={styles.result}>Billard: {Number(data.pooltime).toFixed(2)} €</Text>
        <Text style={styles.result}>Gesamt: {Number(data.total).toFixed(2)} €</Text>
       </div>
        {
          data.details.map((row,index)=>
            <div key={index} style={{display:'flex',width:'100%', flexDirection:'row', justifyContent:'space-between', marginTop:5}}>
              <Text style={styles.text}>{new Date(row.createdat).toLocaleString()}</Text>
              <Text style={styles.text}>{row.name}</Text>
              <Text style={styles.text}>{row.quantity}</Text>
              <Text style={styles.text}>{row.tableid}</Text>
            </div>
          )
        }
    </Page>
  </Document>
);

const PDFDownloadButton = ({data}) => (
  <Box my={2}>
    <PDFDownloadLink style={{color:'black'}} document={<MyDoc data={data}  />} fileName={data.month + "_" + data.year + ".pdf"}>
      {({ blob, url, loading, error }) =>
        loading ? 'Loading document...' : 'Download PDF'
      }
    </PDFDownloadLink>
  </Box>
);

export default PDFDownloadButton

