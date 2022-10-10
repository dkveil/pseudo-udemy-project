import { Paper, CardMedia, Box, Typography, Rating } from '@mui/material';
import { useShoppingCartContext } from '../../context/ShopingCartProvider';
import { formatCurrency } from '../../utils/formatCurrency';
import Button from '../Button';

interface IShoppingCartItem {
    id: string;
    title: string;
    price: number;
    img: string;
    authors: string[];
    rate: number;
    opinions: number;
}

const ShoppingCartItem = ({ id, title, price, authors, img, rate, opinions }: IShoppingCartItem) => {
    const { removeProduct } = useShoppingCartContext();

    return (
        <Paper elevation={4} sx={{ width: '100%', height: '160px', display: 'flex', alignItems: 'center', marginY: 2 }}>
            <CardMedia image={img} component="img" sx={{ width: 150, height: '70%' }} />
            <Box sx={{ height: '70%', paddingX: 2, flexGrow: 1 }}>
                <Typography
                    sx={{
                        fontSize: 18,
                        fontWeight: 'bold',
                        overflow: 'hidden',
                        display: '-webkit-box',
                        WebkitBoxOrient: 'vertical',
                        WebkitLineClamp: 1,
                    }}
                >
                    {title}
                </Typography>
                <Typography variant="body2" sx={{ fontSize: 12 }}>
                    Authors: {authors.length > 1 ? `${authors[0]} and ${authors.length - 1} more` : authors[0]}
                </Typography>
                <Box
                    mt={0.5}
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
                        ({opinions})
                    </Typography>
                </Box>
                <Box sx={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 2 }}>
                    <Typography variant="subtitle1">{formatCurrency(price, 'EUR')}</Typography>
                    <Button variant="contained" sx={{ fontSize: 10 }} onClick={() => removeProduct(id)}>
                        Remove
                    </Button>
                </Box>
            </Box>
        </Paper>
    );
};

export default ShoppingCartItem;
