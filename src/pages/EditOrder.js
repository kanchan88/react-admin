import {
  Container,
  TextField,
  Typography,
  Button,
  Box,
  Modal,
  Icon,
  Grid,
  Paper,
  TableRow,
  Stack
} from '@mui/material';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import { useState, useEffect } from 'react';
import { Card, Row, Col } from 'reactstrap';
import { Link as RouterLink, useParams } from 'react-router-dom';
import { getSingleOrder, getSingleProduct } from '../_mocks_/repo/data';
import OrderItems from './OrderItems';

export default function EditOrder(props) {
  const [singleOrder, setSingleOrder] = useState();
  const [singleProduct, setSingleProduct] = useState([]);
  const ids = useParams();

  const init = async (id) => {
    await getSingleOrder(id).then((data) => {
      setSingleOrder(data.data);
    });
  };
  useEffect(() => {
    init(ids.id);
  }, []);

  return singleOrder ? (
    <Container>
      <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
        <Typography variant="h4" gutterBottom>
          Order Number #{singleOrder ? singleOrder.order_number : ''}
        </Typography>
        <Button variant="contained" component={RouterLink} to="#">
          Update
        </Button>
      </Stack>
      You recieved an order <b>#{singleOrder ? singleOrder.order_number : ''}</b> with total Rs.
      <b>{singleOrder ? singleOrder.price : ''}</b> The user made payment via{' '}
      <b>{singleOrder ? singleOrder.payment_method : ''}</b> is now{' '}
      <b>{singleOrder ? singleOrder.delivery_status : ''}</b>
      <Container>
        <Row>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell scope="col">Order Items</TableCell>
                <TableCell scope="col">Qty</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {singleOrder.items.map((singleProd) => (
                <TableRow>
                  <TableCell>
                    <OrderItems id={singleProd.prod} />
                  </TableCell>
                  <TableCell style={{ textAlign: 'left', marginLeft: 20 }}>
                    {singleProd.quantity}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Row>
      </Container>
      <Typography variant="h6" component="h6" style={{ marginBottom: 20, marginTop: 20 }}>
        Cart Details
      </Typography>
      <Table>
        <TableBody>
          <TableRow>
            <TableCell>Payment Method</TableCell>
            <TableCell style={{ textAlign: 'left', marginLeft: 20 }}>
              {singleOrder ? singleOrder.payment_method : ''}
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Total</TableCell>
            <TableCell style={{ textAlign: 'left', marginLeft: 20 }}>
              Rs. {singleOrder ? singleOrder.price : ''}
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
      <Typography variant="h6" component="h6" style={{ marginBottom: 20, marginTop: 20 }}>
        Delivery Details
      </Typography>
      <Table>
        <TableBody>
          <TableRow>
            <TableCell>Delivery Date</TableCell>
            <TableCell style={{ textAlign: 'left', marginLeft: 20 }}>
              {singleOrder.delivery_date.slice(0, 10)}
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Delivery Address</TableCell>
            <TableCell style={{ textAlign: 'left', marginLeft: 20 }}>
              {singleOrder.order_address[0].address_1}, {singleOrder.order_address[0].address_2}
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Order Status</TableCell>
            <TableCell style={{ textAlign: 'left', marginLeft: 20 }}>
              {singleOrder ? singleOrder.delivery_status : ''}
              <Button>Change Status</Button>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </Container>
  ) : (
    ''
  );
}
