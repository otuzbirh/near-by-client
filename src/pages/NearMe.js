import React, {useState, useEffect} from 'react'
import { Box, Typography, FormControl, FilledInput, InputAdornment, FormHelperText } from '@mui/material'
import ProductCard from '../components/ProductCard'
import productsApi from '../http/products'
import { useNavigate } from 'react-router-dom'

const NearMe = () => {

    const [products, setProducts] = useState(null)
    const [latitude, setLatitude] = useState("43.5")
    const [longitude, setLongitude] = useState("17.4")
    const [maxDistanceInKm, setMaxDistanceInKm] = useState(100)

    const navigate = useNavigate()

    const getGeolocation = () => {
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(
            (position) => {
              const { latitude, longitude } = position.coords;
              setLatitude(latitude.toString());
              setLongitude(longitude.toString());
            },
            (error) => {
              console.error(error);
            }
          );
        } else {
          alert("Geolocation nije podržana na ovom pregledniku");
        }
      };

      
      

    const getNearMeProoducts = () => {
        productsApi().listNearMe(latitude, longitude, maxDistanceInKm)
        .then((res) => {
            setProducts(res?.data)
        })
        .catch((err) => console.error(err))
    }

    useEffect(() => {
        getGeolocation()
    }, [])

    useEffect(() => {
        getNearMeProoducts()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [maxDistanceInKm, latitude, longitude])

  return (
    <Box style={{minHeight: '500px', display: 'flex', flexDirection: 'column', width: '100%', alignItems: 'center'}}>
        <Box sx={{display: 'flex', marginTop: '20px', flexDirection: 'row', width: '90%', justifyContent: 'center', alignItems: 'center', gap: '20px'}}>
        <FormControl sx={{ m: 1, width: '25ch' }} variant="filled">
          <FilledInput
            id="filled-adornment-weight"
            endAdornment={<InputAdornment position="end">km</InputAdornment>}
            aria-describedby="filled-weight-helper-text"
            value={maxDistanceInKm}
            onChange={(e) => setMaxDistanceInKm(e.target.value)}
            inputProps={{
              'aria-label': 'weight',
            }}
          />
          <FormHelperText id="filled-weight-helper-text">Udaljenost</FormHelperText>
        </FormControl>

        <FormControl sx={{ m: 1, width: '25ch' }} variant="filled">

        <FilledInput
            id="filled-adornment-lat"
            endAdornment={<InputAdornment position="end">lat</InputAdornment>}
            aria-describedby="filled-lat-helper-text"
            value={latitude}
            onChange={(e) => setLatitude(e.target.value)}
            inputProps={{
              'aria-label': 'latitude',
            }}
          />
          <FormHelperText id="filled-lat-helper-text">Latituda</FormHelperText>
        </FormControl>

        <FormControl sx={{ m: 1, width: '25ch' }} variant="filled">
                    <FilledInput
            id="filled-adornment-long"
            endAdornment={<InputAdornment position="end">long</InputAdornment>}
            aria-describedby="filled-long-helper-text"
            value={longitude}
            onChange={(e) => setLatitude(e.target.value)}
            inputProps={{
              'aria-label': 'long',
            }}
          />
          <FormHelperText id="filled-long-helper-text">Longituda</FormHelperText>
        </FormControl>
        </Box>
    
    
    {products?.length > 0 ?
              <Box sx={{
                display: 'grid', gap: '30px', marginTop: '20px',
                width: '90%',
                gridTemplateColumns: {
                  xl: "repeat(5, 1fr)",
                  lg: "repeat(4, 1fr)",
                  md: "repeat(2, 1fr)",
                  sm: "repeat(2, 1fr)",
                  xs: "repeat(1, 1fr)"
                },
              }}>

                {
                  products?.map((product) => (
                    <ProductCard key={product?.id} imageSrc={product?.image} handleNavigate={() => navigate(`/product/${product?.id}`)} price={product?.price} name={product?.name} category={product?.category?.name} views={product?.views} />
                  ))
                }
              </Box> :
              <Box sx={{ width: '100%', textAlign: 'center', height: '300px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Typography>Nema rezultata</Typography>
              </Box>
            }
    </Box>
  )
}

export default NearMe
