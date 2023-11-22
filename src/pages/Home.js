import React, { useState, useEffect } from 'react'
import { Box, Typography, Select, MenuItem, CircularProgress, InputLabel, FormControl } from '@mui/material'
import categoriesApi from '../http/categories'
import productsApi from '../http/products'
import ProductCard from '../components/ProductCard'
import { useNavigate } from 'react-router-dom'
import { LoadingButton } from "@mui/lab";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";





const Home = () => {

  const [categories, setCategories] = useState([])
  const [products, setProducts] = useState([])
  const [page, setPage] = useState(1)
  const [size, setSize] = useState(6)
  const [sortBy, setSortBy] = useState("categoryId")
  const [sortDirection, setSortDirection] = useState('asc')
  const [categoryId, setCategoryId] = useState('')

  const [loading, setLoading] = useState(false)

  const [displayedProducts, setDisplayedProducts] = useState(0);
  const [totalProducts, setTotalProducts] = useState(0)





  const navigate = useNavigate()

  const getAllCategories = () => {
    categoriesApi().listCategories()
      .then((res) => {
        setCategories(res?.data)
      })
      .catch((err) => console.error(err))
  }


  const getInitProducts = () => {
    productsApi().listProducts(0, 6, categoryId, sortBy, sortDirection)
      .then((res) => {
        setProducts(res?.data?.content);
        setTotalProducts(res?.data?.totalElements)
      })
      .catch((err) => console.error(err))
  }
  const getAllProducts = () => {
    productsApi().listProducts(page, size, categoryId, sortBy, sortDirection)
      .then((res) => {
        const newData = res?.data?.content
        setProducts((prevProducts) => [...prevProducts, ...newData]);
        setTotalProducts(res?.data?.totalElements)
      })
      .catch((err) => console.error(err))
      .finally(() => setLoading(false))
  }

  useEffect(() => {
    getAllCategories()
  }, [])

  useEffect(() => {
    getInitProducts()

  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [categoryId, sortBy, sortDirection])

  // useUpdateEffect(() => {
  //   getAllProducts()
  // }, [page])

  const showMoreProducts = () => {
    setLoading(true)
    getAllProducts()
  };

  useEffect(() => {
    setDisplayedProducts(products?.length)
  }, [products])


  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', width: '100%', minHeight: '700px' }}>
      <Box sx={{ width: '100%', textAlign: 'center', marginTop: '30px' }}>


        <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', gap: '20px', width: '100%' }}>
          <Box sx={{ display: 'flex', flexDirection: 'column', flex: 1, height: '300ox', gap: '10px', textAlign: 'left', padding: '0px 10px' }}>
            <Typography variant='h5'>Kategorije</Typography>
            <Typography variant='p' sx={{ cursor: 'pointer', color: categoryId === "" ? 'blue' : 'black' }} onClick={() => {
              setCategoryId("")
              setPage(0)
            }} >Sve{`(${categories?.length})`}</Typography>
            {
              categories?.map((category) => (
                <Typography variant='p' sx={{ cursor: 'pointer', color: categoryId == category?.id ? 'blue' : 'black' }} key={category?.id} onClick={() => {
                  setCategoryId(category?.id)
                  setPage(0)
                }}>{category?.name}</Typography>
              ))
            }
          </Box>
          <Box sx={{ display: 'flex', flexDirection: 'column', flex: 5, padding: '0px 10px' }}>
            <Box sx={{ width: '100%', display: 'flex', justifyContent: 'space-between' }}>

              <Typography variant="h4"> Svi proizvodi</Typography>

              <Box sx={{ display: 'flex', flex: 4, flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'center', gap: '20px' }}>

                <FormControl sx={{ width: '200px' }}>
                  <InputLabel id="demo-simple-select-label">Sortiraj po</InputLabel>
                  <Select labelId="demo-simple-select-label"
                    variant='filled'
                    id="demo-simple-select" label="Sortiraj" value={sortBy} onChange={(event) => {
                      setSortBy(event.target.value)
                    }} >
                    <MenuItem value="categoryId">Kategorija</MenuItem>
                    <MenuItem value="price">Cijena</MenuItem>
                    <MenuItem value="name">Naziv</MenuItem>
                  </Select>
                </FormControl>

                <FormControl sx={{ width: '200px' }}>
                  <InputLabel id="demo-simple-select-label">Sortir Direction</InputLabel>
                  <Select labelId="demo-simple-select-label"
                    variant='filled'
                    id="demo-simple-select" label="Sortiraj" value={sortDirection} onChange={(event) => {
                      setSortDirection(event.target.value)
                    }} >
                    <MenuItem value="asc">Ascending</MenuItem>
                    <MenuItem value="desc">Descending</MenuItem>
                  </Select>
                </FormControl>
                {/* <SearchComponent /> */}

              </Box>
            </Box>
            {products?.length > 0 ?
              <Box sx={{
                display: 'grid', gap: '30px', marginTop: '20px',
                gridTemplateColumns: {
                  xl: "repeat(5, 1fr)",
                  lg: "repeat(3, 1fr)",
                  md: "repeat(2, 1fr)",
                  sm: "repeat(2, 1fr)",
                  xs: "repeat(1, 1fr)"
                },
              }}>

                {
                  products?.map((product, index) => (
                    <ProductCard key={index} imageSrc={product?.image} handleNavigate={() => navigate(`/product/${product?.id}`)} price={product?.price} name={product?.name} category={product?.category?.name} views={product?.views} />
                  ))
                }
              </Box> :
              <Box sx={{ width: '100%', textAlign: 'center', height: '300px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Typography>Nema rezultata</Typography>
              </Box>
            }
            <Box sx={{ display: 'flex', width: '100%', justifyContent: 'center', marginBottom: '20px' }}>

              {displayedProducts < totalProducts && (
                <LoadingButton
                  loading={loading}
                  onClick={() => {
                    setPage((prevPage) => prevPage + 1)
                    showMoreProducts()
                  }
                  }
                  loadingIndicator={<CircularProgress color="primary" size={22} />}
                  endIcon={<KeyboardArrowDownIcon />}
                  sx={{
                    padding: '15px 25px',
                    textTransform: 'none',
                    marginTop: '20px',
                    color: '#ffffff',
                    backgroundColor: '#002f76',
                    borderRadius: '4px',
                    fontWeight: '600',
                    fontSize: '16px',
                    width: '300px',
                    lineHeight: '24px',
                    '&:hover': {
                      opacity: '0.8',
                      backgroundColor: '#002f76',
                    }
                  }}
                >
                  <span>Učitaj više</span>
                </LoadingButton>
              )}
            </Box>

          </Box>

        </Box>




      </Box>

    </Box>
  )
}

export default Home
