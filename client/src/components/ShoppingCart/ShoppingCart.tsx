import { Drawer, Box, Typography, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { useShoppingCartContext } from '../../context/ShopingCartProvider';
import { useStoreContext } from '../../context/StoreProvider';
import ShoppingCartItem from './ShoppingCartItem';
import Button from '../Button';
import { formatCurrency } from '../../utils/formatCurrency';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

const ShoppingCart = () => {
    const { products, isOpen, closeCart } = useShoppingCartContext();
    const { courses } = useStoreContext();

    const totalPrice = products
        .map((product) => {
            const price = courses?.find((currentCourse) => currentCourse.id === product)?.price;

            return price;
        })
        ?.reduce((a, sum) => {
            if (a && sum) {
                return a + sum;
            }
            return sum;
        }, 0);

    return (
        <Drawer anchor="right" open={isOpen}>
            <Box sx={{ width: 500, maxWidth: '100vw', backgroundColor: 'white', paddingX: { xs: 2, md: 4 } }}>
                <Box sx={{ height: '80px', width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}>
                    <IconButton onClick={closeCart}>
                        <CloseIcon fontSize="large" />
                    </IconButton>
                </Box>
                <Box paddingY={4}>
                    <Typography variant="h4" sx={{ fontWeight: 'bold' }}>
                        Your products {products.length > 0 && `(${products.length})`}
                    </Typography>
                    <Box sx={{ overflowY: 'scroll', height: '420px', overflowX: 'hidden', direction: 'ltr' }}>
                        {products.map((product) => {
                            const course = courses.find((currentCourse) => currentCourse.id === product);

                            if (course) {
                                return (
                                    <ShoppingCartItem
                                        key={course.id}
                                        id={course.id}
                                        title={course.title}
                                        price={course.price}
                                        img={course.img}
                                        authors={course.authors}
                                        rate={course.rate}
                                        opinions={course.opinions}
                                    />
                                );
                            }
                            return null;
                        })}
                    </Box>
                </Box>
                <Box sx={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Typography variant="subtitle2" sx={{ fontSize: 18 }}>
                        Total price: {formatCurrency(totalPrice ? totalPrice : 0, 'EUR')}
                    </Typography>
                    <Button variant="contained" sx={{ mt: 1 }} endIcon={<ShoppingCartIcon />}>
                        PAY FOR IT
                    </Button>
                </Box>
            </Box>
        </Drawer>
    );
};

export default ShoppingCart;
