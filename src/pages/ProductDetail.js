import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import productsApi from '../http/products'
import { Box, Typography } from '@mui/material'

const ProductDetail = () => {

    const [data, setData] = useState({})
    const { id } = useParams()

    const fetchProductData = () => {
        productsApi().singleProduct(id)
            .then((res) => {
                setData(res?.data)
            })
            .catch((err) => console.error(err))
    }

    useEffect(() => {
        fetchProductData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])


    return (
        <Box sx={{ width: '100%', display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
            <Box sx={{ width: '95%', display: 'flex', flexDirection: 'row', justifyContent: 'center', gap: '30px' }}>
                <Box sx={{ display: 'flex', flex: 2, justifyContent: 'center', alignItems: 'center', minHeight: '500px' }}>
                    <img
                        src={`http://localhost:8080/${data?.image}`}
                        alt={data?.name}
                        style={{width: '90%', height: '90%'}}
                    />
                </Box>
                <Box sx={{ display: 'flex', flex: 1, justifyContent: 'center', gap: '20px', alignItems: 'center', flexDirection: 'column' }}>
                    <Typography variant='p'>{`Početna/proizvod/${data?.name}`}</Typography>
                    <Typography variant='h4'>{data?.name}</Typography>
                    {data?.priceHistoryList?.map((price) => (
                    <Typography variant='h5' sx={{  textDecoration: 'line-through'
                    }}>{price?.price} KM</Typography>    
                    ))}
                    <Typography variant='h5'>{data?.price} KM</Typography>
                    <Typography variant='h5'>Kategorija: {data?.category?.name}</Typography>
                    <Typography variant='h6'>Broj pregleda: {data?.views}</Typography>
                    
                </Box>


            </Box>
            <Box sx={{textAlign: 'center', width: '95%', marginBottom: '20px'}}>
                <Typography variant='p'>{data?.description}</Typography>
            </Box>

         
        </Box>
    )
}

export default ProductDetail
