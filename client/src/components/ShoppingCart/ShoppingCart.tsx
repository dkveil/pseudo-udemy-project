import * as React from 'react';
import { Drawer, Box, Typography, IconButton, Alert, AlertTitle, Slide } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { useShoppingCartContext } from '../../context/ShopingCartProvider';
import { useStoreContext } from '../../context/StoreProvider';
import ShoppingCartItem from './ShoppingCartItem';
import LoadingButton from '../LoadingButton';
import { formatCurrency } from '../../utils/formatCurrency';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import request from '../../helpers/request';

const ShoppingCart = () => {
    const [transactionLoading, setTransactionLoading] = React.useState(false);
    const [openedAlert, setOpenedAlert] = React.useState(false);
    const [alertStatus, setAlertStatus] = React.useState<'success' | 'error' | undefined>(undefined);
    const [alertMessage, setAlertMessage] = React.useState<string>();
    const { products, isOpen, closeCart, clearShoppingCart } = useShoppingCartContext();
    const { user, courses, setUser } = useStoreContext();

    const handleClick = () => {
        if (products.length > 0) {
            setTransactionLoading(true);

            const handleTransaction = async () => {
                if (user && totalPrice && user.budget < totalPrice) {
                    setTransactionLoading(false);
                    setOpenedAlert(true);
                    closeCart();
                    setAlertStatus('error');
                    setAlertMessage('You have not enough funds to pay!');
                    setTimeout(() => {
                        setOpenedAlert(false);
                    }, 3000);

                    return;
                }
                try {
                    const { data, status } = await request.patch('/users', {
                        login: user?.login,
                        boughtCourses: products,
                        totalPrice,
                        action: 'buying a course',
                    });

                    if (status === 202) {
                        setUser(data.user);
                        clearShoppingCart();
                        closeCart();
                        setTransactionLoading(false);
                        setAlertStatus('success');
                        setAlertMessage('The payment was successful. Thank you!');
                        setOpenedAlert(true);
                        setTimeout(() => {
                            setOpenedAlert(false);
                        }, 3000);
                    }
                } catch (error) {
                    setTransactionLoading(false);
                    setOpenedAlert(true);
                    setAlertStatus('error');
                    setAlertMessage('Something went wrong!');
                }
            };

            setTimeout(handleTransaction, 1000);
        }
    };

    const totalPrice = products
        .map((product) => {
            const promotionPrice = courses?.find((currentCourse) => currentCourse.id === product)?.promotionPrice;
            const usePromotionPrice = courses?.find((currentCourse) => currentCourse.id === product)?.usePromotionPrice;
            const price = courses?.find((currentCourse) => currentCourse.id === product)?.price;

            return usePromotionPrice && promotionPrice ? promotionPrice : price;
        })
        ?.reduce((price, sum) => {
            if (price && sum) {
                return price + sum;
            }
            return sum;
        }, 0);

    return (
        <>
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
                                const course = courses?.find((currentCourse) => currentCourse.id === product);

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
                        {user ? (
                            <LoadingButton
                                loading={transactionLoading}
                                variant="contained"
                                sx={{ mt: 1 }}
                                endIcon={<ShoppingCartIcon />}
                                onClick={handleClick}
                            >
                                PAY FOR IT
                            </LoadingButton>
                        ) : (
                            <Typography>You must be logged in</Typography>
                        )}
                    </Box>
                </Box>
            </Drawer>
            <Slide direction="up" in={openedAlert}>
                <Alert
                    severity={alertStatus}
                    sx={{
                        position: 'fixed',
                        bottom: 42,
                        width: '80%',
                        left: '10%',
                        zIndex: 5,
                        margin: 'auto',
                        borderRadius: '20px',
                        boxShadow: '0 2px 2px 2px rgba(0,0,0,0.2)',
                        border: '1px solid green',
                    }}
                >
                    <AlertTitle>{alertStatus && alertStatus.charAt(0).toUpperCase() + alertStatus.slice(1)}</AlertTitle>
                    {alertMessage}
                </Alert>
            </Slide>
        </>
    );
};

export default ShoppingCart;
