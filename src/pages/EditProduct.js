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
import { loadSingleProduct, getMedia } from '../_mocks_/repo/data';
// prettier-ignore

export default function EditProduct(props) {
  const [prodImage, setProductImage] = useState();
  const [displayImage, setDisplayImage] = useState();
  const [productAdded, setProductAdded] = useState(false);
  const [mediaImages, setMediaImages] = useState([]);

  const [product, setProduct] = useState([]);
  const [error, setError] = useState(false);
  const [id, setId] = useState([]);

  const ids = useParams();

  const [productValues, setProductValues] = useState({
    name: '',
    description: '',
    product_detail: '',
    weight: 1,
    slug: '',
    marked_price: '',
    price: '',
    seo_meta_title: '',
    seo_meta_description: '',
    images:[
        {
            image:''
        }
    ]
  });

  const getSingleProduct = (id) => {
    loadSingleProduct(id).then((data) => {
      if (data.error) {
        setError(data.error);
      } else {
        setProductValues(data.data);
      }
    });
};
  useEffect(() => {
    getSingleProduct(ids.id);
  }, []);

  const [open, setEditOpen] = React.useState(false);
  const handleEditOpen = () => setEditOpen(true);
  const handleEditClose = () => setEditOpen(false);

  const [openMedia, setMediaOpen] = React.useState(false);
  const handleMediaOpen = () => setMediaOpen(true);
  const handleMediaClose = () => setMediaOpen(false);

  const handleImageChange = (e) => {
    setProductImage(e.target.files[0]);
    setDisplayImage(URL.createObjectURL(e.target.files[0]));
  };

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
  if(prodImage!=null){formData.append('images[0]image', prodImage)};

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

  const editProduct = async () => {
    await axios
      .put(`http://127.0.0.1:8000/api/product/${ids.id}`, formData, headerFile )
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

  const getMediaImages = () => {
    handleMediaOpen();
    getMedia().then((data) => {
      if (data.error) {
        setError(data.error);
      } else {
        setMediaImages(data.data);
      }
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
            Product Edited Successfully
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
            Edit Product
            <Button  sx={{ ml:80 }} variant="outlined" component="label" onClick={deleteProduct} color="error" startIcon={<DeleteIcon />}>
              <h3>Delete Product</h3>
            </Button>
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
            {displayImage==null?<img src={ productValues.images[0].image } alt="img" height="100px"/>:<img src={ prodImage } alt="img" height="100px"/>}
            <Button variant="outlined" component="label">
              Upload Images*
              <input type="file" name="image" onChange={handleImageChange} hidden />
            </Button>
          </Box>
          <Box m={2}>
            <Button variant="contained" component="label" onClick={editProduct} fullWidth>
              <h3>Update Product</h3>
            </Button>
          </Box>
        </Container>
        }
    </div>
  );
}

EditProduct.propTypes = {
  location: PropTypes.object
};
