import { Container, TextField, Typography, Button, Box, Modal, Icon } from '@mui/material';
import { styled } from '@mui/material/styles';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import { useState, useEffect } from 'react';
import axios from 'axios';
import * as React from 'react';
import { Link as RouterLink } from 'react-router-dom';

// prettier-ignore

export default function AddProduct() {
  const [prodImage, setProductImage] = useState();
  const [displayImage, setDisplayImage] = useState();
  const [productAdded, setProductAdded] = useState(false);
  const [productValues, setProductValues] = useState({
    name: '',
    description: '',
    product_detail: '',
    weight: 1,
    slug: '',
    marked_price: '',
    price: '',
    seo_meta_title: '',
    seo_meta_description: ''
  });

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const formData = new FormData();
  formData.append('name', productValues.name);
  formData.append('description', productValues.description);
  formData.append('product_detail', productValues.product_detail);
  formData.append('weight', productValues.weight);
  formData.append('slug', productValues.slug);
  formData.append('marked_price', productValues.marked_price);
  formData.append('price', productValues.price);
  formData.append('seo_meta_title', productValues.seo_meta_title);
  formData.append('seo_meta_description', productValues.seo_meta_description);
  formData.append('images[0]image', prodImage);

  const handleProductChanges = (e) => {
    setProductValues({
      ...productValues,
      [e.target.name]: e.target.value
    });
  };

  const headerFile = {
    headers:{
      'Content-Type': 'multipart/form-data'
      }
    };

  const addProduct = async (e) => {
    await axios
      .post('http://127.0.0.1:8000/api/product', formData, headerFile )
      .then((response) => {
        setProductAdded(true);
        handleOpen();
      })
      .catch((error) => {
        console.log(error);
      });
    console.log(formData);
  };

  const handleImageChange = (e) => {
    setProductImage(e.target.files[0]);
    setDisplayImage(URL.createObjectURL(e.target.files[0]));
  };

  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };

  return (
    <div>
      {
      productAdded?
      <Modal 
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description">
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h4" component="h2">
            Product Added Successfully
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            <Button
              variant="contained"
              component={RouterLink}
              to="/dashboard/products"
              icon={<Icon name="back" size={15} color="white" />}
            >
              Go Back 
            </Button>
          </Typography>
        </Box>
      </Modal>:
          <Container>
          <Typography m={2} variant="h4" gutterBottom>
            Add Product Details
          </Typography>
          <Box m={2}>
            <TextField
              label="Product Name"
              name="name"
              variant="outlined"
              value={productValues.name}
              onChange={handleProductChanges}
              fullWidth
            />
          </Box>
          <Box
            component="form"
            sx={{
              '& > :not(style)': { m: 2, width: '25ch' }
            }}
            noValidate
            autoComplete="off"
          >
            <TextField
              label="Marked Price"
              variant="outlined"
              name="marked_price"
              value={productValues.marked_price}
              onChange={handleProductChanges}
            />
            <TextField
              label="Sale Price"
              variant="outlined"
              name="price"
              value={productValues.price}
              onChange={handleProductChanges}
            />
            <TextField
              label="Weight Info"
              variant="outlined"
              name="weight"
              value={productValues.weight}
              onChange={handleProductChanges}
            />
          </Box>
          <Box m={2}>
            <TextField
              label="Short Description"
              multiline
              rows={2}
              rowsMax={2}
              name="product_detail"
              value={productValues.product_detail}
              onChange={handleProductChanges}
              fullWidth
            />
          </Box>
          <Box m={2}>
            <TextField
              label="Long Description"
              multiline
              rows={6}
              rowsMax={4}
              name="description"
              value={productValues.description}
              onChange={handleProductChanges}
              fullWidth
            />
          </Box>
          <Typography m={2} variant="h5" gutterBottom>
            SEO Section
          </Typography>
          <Box m={2}>
            <TextField
              label="Meta Title"
              variant="outlined"
              name="seo_meta_title"
              value={productValues.seo_meta_title}
              onChange={handleProductChanges}
              fullWidth
            />
          </Box>
          <Box m={2}>
            <TextField
              label="Product Slug"
              variant="outlined"
              name="slug"
              value={productValues.slug}
              onChange={handleProductChanges}
              fullWidth
            />
          </Box>
          <Box m={2}>
            <TextField
              label="Meta Description"
              multiline
              rows={2}
              rowsMax={2}
              name="seo_meta_description"
              value={productValues.seo_meta_description}
              onChange={handleProductChanges}
              fullWidth
            />
          </Box>
          <Typography m={2} variant="h5" gutterBottom>
            Product Images
          </Typography>
          <Box m={2}>
            {prodImage!=null?<img src={ displayImage } alt="img" />:<Container/>}
            <Button variant="outlined" component="label">
              Upload Images*
              <input type="file" name="image" onChange={handleImageChange} hidden />
            </Button>
          </Box>
          <Box m={2}>
            <Button variant="contained" component="label" onClick={addProduct} fullWidth>
              <h3>Add Product</h3>
            </Button>
          </Box>
        </Container>
        }
    </div>
  );
}
