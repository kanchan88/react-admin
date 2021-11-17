import {
  Container,
  TextField,
  Typography,
  Button,
  Box,
  Modal,
  Icon,
  Grid,
  Paper
} from '@mui/material';
import { styled } from '@mui/material/styles';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import DeleteIcon from '@mui/icons-material/Delete';
import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import axios from 'axios';
import * as React from 'react';
import { Card, Row, Col } from 'reactstrap';
import { Link as RouterLink, useParams } from 'react-router-dom';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import ListItemText from '@mui/material/ListItemText';
import Select from '@mui/material/Select';
import Checkbox from '@mui/material/Checkbox';
import CategoryItems from './CategoryItems';
import { getSingleCategory, getAllProducts } from '../_mocks_/repo/data';
// prettier-ignore

export default function EditCategory(props) {
    const [prodImage, setProductImage] = useState();
    const [displayImage, setDisplayImage] = useState();
    const [productAdded, setProductAdded] = useState(false);
  
    const [product, setProduct] = useState([]);
    const [error, setError] = useState(false);
    const [id, setId] = useState([]);
    const [personName, setPersonName] = useState([]);

  
    const ids = useParams();

    const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

    const handleChange = (event) => {
        const {
            target: { value },
          } = event;
          setPersonName(value);
          console.log(personName);
    };
  
    const [categoryValues, setcategoryValues] = useState({
      name: '',
      description: '',
      image: '',
      products:[]
    });
  
    const getCategory = (id) => {
      getSingleCategory(id).then((data) => {
          console.log("DATA");
          console.log(data.data);
          setcategoryValues(data.data);
      });
      getAllProducts().then((data) => {
        setProduct(data.data);
    });
  };
    useEffect(() => {
      console.log(ids.id);
      getCategory(ids.id);
    }, []);
  
    const [open, setEditOpen] = React.useState(false);
    const handleEditOpen = () => setEditOpen(true);
    const handleEditClose = () => setEditOpen(false);
  
    const handleImageChange = (e) => {
      setProductImage(e.target.files[0]);
      setDisplayImage(URL.createObjectURL(e.target.files[0]));
    };
  
    const formData = new FormData();
    formData.append('name', categoryValues.name);
    formData.append('description', categoryValues.description);
    formData.append('products', [personName]);
    if(prodImage!=null){formData.append('images', prodImage)};
  
    const handleProductChanges = (e) => {
      setcategoryValues({
        ...categoryValues,
        [e.target.name]: e.target.value
      });
    };
  
    const headerFile = {
      headers:{
        'Content-Type': 'multipart/form-data'
        }
      };
  
    const editProduct = async () => {
      await axios
        .put(`http://127.0.0.1:8000/api/category/${ids.id}`, formData, headerFile )
        .then((response) => {
          setProductAdded(true);
          handleEditOpen();
        })
        .catch((error) => {
          console.log(error);
        });
      console.log(formData);
    };
  
    const deleteProduct = async () => {
      await axios
        .delete(`http://127.0.0.1:8000/api/product/${ids.id}`, formData, headerFile )
        .then((response) => {
          setProductAdded(true);
          handleEditOpen();
        })
        .catch((error) => {
          console.log(error);
        });
    };
  
    const style = {
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      width: 800,
      height: 500,
      overflow:'scroll',
      bgcolor: 'background.paper',
      border: '1px solid #000',
      boxShadow: 12,
      p: 4,
    };
  
    return (
      <div>
        {
        productAdded?
        <Modal 
          open={open}
          onClose={handleEditClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description">
          <Box sx={style}>
            <Typography id="modal-modal-title" variant="h4" component="h2">
              Category Edited Successfully
            </Typography>
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
              <Button
                variant="contained"
                icon={<Icon name="back" size={15} color="white" />}
                component={RouterLink}
                to="/dashboard/categories"
              >
                Go Back 
              </Button>
            </Typography>
          </Box>
        </Modal>:
            <Container>
            <Typography m={2} variant="h4" gutterBottom> 
              Edit Category
              <Button  sx={{ ml:80 }} variant="outlined" component="label" onClick={deleteProduct} color="error" startIcon={<DeleteIcon />}>
                <h3>Delete Category</h3>
              </Button>
            </Typography>
            <Box m={2}>
              <TextField
                label="Product Name"
                name="name"
                variant="outlined"
                value={categoryValues.name}
                onChange={handleProductChanges}
                fullWidth
              />
            </Box>
            <Box m={2}>
              <TextField
                label="Short Description"
                multiline
                rows={2}
                rowsMax={2}
                name="product_detail"
                value={categoryValues.description}
                onChange={handleProductChanges}
                fullWidth
              />
            </Box>
            <Typography m={2} variant="h6">
            Products
            </Typography>
            <Box m={2}>
            {
                categoryValues.products.map((prod)=>(
                  <CategoryItems id={prod} />
                ))
            }
            </Box>
<FormControl sx={{ m: 1, width: 300 }}>
        <InputLabel id="demo-multiple-checkbox-label">Add Products</InputLabel>
        <Select
          labelId="demo-multiple-checkbox-label"
          id="demo-multiple-checkbox"
          multiple
          value={personName}
          onChange={handleChange}
          input={<OutlinedInput label="Add Products" />}
          renderValue={(selected) => selected.join(', ')}
          MenuProps={MenuProps}
        >
          {product.map((name) => (
            <MenuItem key={name.id} value={name.id}>
              <Checkbox checked={personName.indexOf(name.id) > -1} />
              <ListItemText primary={name.name} />
            </MenuItem>
          ))}
        </Select>
      </FormControl>
            <Typography m={2} variant="h5" gutterBottom>
              Product Images
            </Typography>
            <Box m={2}>
              {displayImage==null?<img src={ categoryValues.images } alt="img" height="100px"/>:<img src={ displayImage } alt="img" height="100px"/>}
              <Button variant="outlined" component="label">
                Upload Images*
                <input type="file" name="image" onChange={handleImageChange} hidden />
              </Button>
            </Box>
            <Box m={2}>
              <Button variant="contained" component="label" onClick={editProduct} fullWidth>
                <h3>Update Category</h3>
              </Button>
            </Box>
          </Container>
          }
      </div>
    );
  }
