import { useFormik } from 'formik';
import { Link as RouterLink } from 'react-router-dom';
import { useState, useEffect } from 'react';
// material
import { Container, Stack, Typography, Button, Icon } from '@mui/material';
import Modal from '@mui/material/Modal';
import * as React from 'react';
import Box from '@mui/material/Box';
// components
import plusFill from '@iconify/icons-eva/plus-fill';
import Page from '../components/Page';
import { ProductSort, ProductList, ProductFilterSidebar } from '../components/_dashboard/products';
//
import { getAllProducts } from '../_mocks_/repo/data';
import { UserListHead, UserListToolbar, UserMoreMenu } from '../components/_dashboard/user';

export default function EcommerceShop() {
  const [openFilter, setOpenFilter] = useState(false);
  const [products, setProducts] = useState([]);
  const [filterName, setFilterName] = useState('');
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const formik = useFormik({
    initialValues: {
      gender: '',
      category: '',
      colors: '',
      priceRange: '',
      rating: ''
    },
    onSubmit: () => {
      setOpenFilter(false);
    }
  });

  const PRODUCT_COLOR = [
    '#00AB55',
    '#000000',
    '#FFFFFF',
    '#FFC0CB',
    '#FF4842',
    '#1890FF',
    '#94D82D',
    '#FFC107'
  ];

  const { resetForm, handleSubmit } = formik;

  const handleOpenFilter = () => {
    setOpenFilter(true);
  };

  const handleCloseFilter = () => {
    setOpenFilter(false);
  };

  const handleResetFilter = () => {
    handleSubmit();
    resetForm();
  };

  const init = () => {
    getAllProducts().then((data) => {
      console.log(data.data);
      setProducts(data.data);
    });
  };
  useEffect(() => {
    init();
  }, []);

  const PRODUCTLIST = products.map((_, index) => {
    const setIndex = index + 1;
    return {
      id: products[index].id,
      cover: products[index].images[0].image,
      name: products[index].name,
      price: products[index].marked_price,
      priceSale: products[index].price,
      colors:
        (setIndex === 1 && PRODUCT_COLOR.slice(0, 2)) ||
        (setIndex === 2 && PRODUCT_COLOR.slice(1, 3)) ||
        (setIndex === 3 && PRODUCT_COLOR.slice(2, 4)) ||
        (setIndex === 4 && PRODUCT_COLOR.slice(3, 6)) ||
        (setIndex === 23 && PRODUCT_COLOR.slice(4, 6)) ||
        (setIndex === 24 && PRODUCT_COLOR.slice(5, 6)) ||
        PRODUCT_COLOR
    };
  });

  const handleFilterByName = (event) => {
    setFilterName(event.target.value);
  };

  return (
    <Page title="Dashboard: Products | Minimal-UI">
      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            Products
          </Typography>
          <Button
            variant="contained"
            component={RouterLink}
            to="/dashboard/add-product"
            icon={<Icon name="add" size={15} color="white" />}
          >
            Add Product
          </Button>
        </Stack>
        <UserListToolbar filterName={filterName} onFilterName={handleFilterByName} />
        <Stack
          direction="row"
          flexWrap="wrap-reverse"
          alignItems="center"
          justifyContent="flex-end"
          sx={{ mb: 5 }}
        >
          <Stack direction="row" spacing={1} flexShrink={0} sx={{ my: 1 }}>
            <ProductFilterSidebar
              formik={formik}
              isOpenFilter={openFilter}
              onResetFilter={handleResetFilter}
              onOpenFilter={handleOpenFilter}
              onCloseFilter={handleCloseFilter}
            />
            <ProductSort />
          </Stack>
        </Stack>
        <ProductList products={PRODUCTLIST} />
      </Container>
    </Page>
  );
}
