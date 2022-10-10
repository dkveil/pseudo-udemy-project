import React from 'react';
import { Paper, CardMedia, Box, Typography, Rating } from '@mui/material';
import { ICourse } from '../../context/StoreProvider';
import { formatCurrency } from '../../utils/formatCurrency';
import Button from '../Button';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { useShoppingCartContext } from '../../context/ShopingCartProvider';

const CourseCard = ({ id, authors, description, img, price, title, opinions, rate }: ICourse) => {
    const { products, addProduct, removeProduct } = useShoppingCartContext();

    const isAdded = products.find((product) => product === id) ? true : false;

    return (
        <>
            <Paper elevation={4} sx={{ overflow: 'hidden', position: 'relative', paddingBottom: 2 }}>
                <CardMedia component="img" height="205" src={img} alt={title} />
                <Box paddingX={1} paddingY={0.5}>
                    <Typography variant="h6" component="h2" sx={{ fontWeight: 'bold' }}>
                        {title}
                    </Typography>
                    <Box
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'center',
                            gap: '4px',
                        }}
                    >
                        <Typography variant="body1">{description}</Typography>
                        <Typography variant="body2"> Authors: {authors.join(', ')}</Typography>
                    </Box>
                    <Box></Box>
                    <Box
                        mt={1}
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                        }}
                    >
                        <Rating size="small" value={rate} readOnly precision={0.5} />
                        <Typography variant="body2" component="p" ml={0.5}>
                            {rate}
                        </Typography>
                        <Typography variant="caption" component="p" ml={2}>
                            ({opinions} opinions)
                        </Typography>
                    </Box>
                    <Box>
                        <Typography variant="h6" component="h3" mt={0}>
                            {formatCurrency(price, 'EUR')}
                        </Typography>
                    </Box>
                    <Button
                        variant="contained"
                        sx={{ position: 'absolute', bottom: 0, right: 0 }}
                        endIcon={<ShoppingCartIcon />}
                        onClick={isAdded ? () => removeProduct(id) : () => addProduct(id)}
                    >
                        {isAdded ? 'Remove from cart' : 'Add to cart'}
                    </Button>
                </Box>
            </Paper>
        </>
    );
};

export default CourseCard;
