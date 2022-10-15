import React from 'react';
import { CardMedia, Box, Typography, Rating, Paper, Button, Tooltip, IconButton } from '@mui/material';
import { ICourse } from '../../context/StoreProvider';
import { formatCurrency } from '../../utils/formatCurrency';
import { useShoppingCartContext } from '../../context/ShopingCartProvider';
import { useStoreContext } from '../../context/StoreProvider';
import { convertISODate } from '../../utils/convertISODate';
import CheckIcon from '@mui/icons-material/Check';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import request from '../../helpers/request';
import Modal from '../Modal';
import useWindowDimensions from './../../hooks/useWindowDimensions.hook';
import { size } from '../../utils/media';

const CourseCard = ({
    id,
    authors,
    description,
    img,
    duration,
    price,
    title,
    opinions,
    rate,
    usePromotionPrice,
    promotionPrice,
    dateAdded,
    benefits,
    lastChildInRow = false,
    withPopover = true,
    mostPopularSection = false,
}: ICourse & { lastChildInRow?: boolean; withPopover?: boolean; mostPopularSection?: boolean }) => {
    const { products, addProduct, removeProduct } = useShoppingCartContext();
    const { user, setUser } = useStoreContext();
    const [popoverIsOpen, setPopoverIsOpen] = React.useState(false);
    const { width: windowWidth } = useWindowDimensions();

    const userHasAlreadyThisCourse = Boolean(user?.courses.find((course) => course === id));
    const isAdded = products.find((product) => product === id) ? true : false;
    const isAlreadyOnWishlist = Boolean(user?.wishlist.find((course) => course === id));

    const handleAddingToWishlist = async () => {
        if (!userHasAlreadyThisCourse) {
            await request
                .patch('/users', {
                    login: user?.login,
                    action: isAlreadyOnWishlist ? 'remove from wishlist' : 'adding to wishlist',
                    courseId: id,
                })
                .then(({ data, status }) => {
                    if (status === 202) {
                        setUser(data.user);
                        console.log(data.action);
                    }
                })
                .catch((error) => {
                    console.log(error);
                });
        }
    };

    const handleOpenPopoverOnHover = () => {
        if (windowWidth > size.DESKTOP && !mostPopularSection) {
            setPopoverIsOpen(true);
        }
    };

    const handleClosePopoverOnMouseLeave = () => {
        if (windowWidth > size.DESKTOP && !mostPopularSection) {
            setPopoverIsOpen(false);
        }
    };

    const handleOpenPopoverOnClick = () => {
        if (!(windowWidth > size.DESKTOP) || mostPopularSection) {
            setPopoverIsOpen(true);
        }
    };

    const subcardContent = (
        <>
            <Typography sx={{ fontSize: 20, fontWeight: 'bold', lineHeight: 1.25, mb: 0.5 }}>{title}</Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 0.6 }}>
                {opinions > 1200 && (
                    <Box
                        sx={{
                            width: 66,
                            height: 20,
                            backgroundColor: '#eceb98',
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            mr: 0.8,
                        }}
                    >
                        <Typography sx={{ fontSize: 11, fontWeight: 'bold' }}>Bestseller</Typography>
                    </Box>
                )}
                <Typography sx={{ fontSize: 12, b: { fontWeight: 'bold' }, color: 'green' }}>
                    Date added: <b>{convertISODate(dateAdded, 'full date')}</b>
                </Typography>
            </Box>
            <Typography sx={{ fontSize: 12, color: 'gray', mb: 0.6 }}>{duration.toString().replace('.', ',')} total hours</Typography>
            <Typography sx={{ fontSize: 14, lineHeight: 1.4 }}>{description}</Typography>
            {benefits && (
                <Box sx={{ dislpay: 'flex', paddingY: 2 }}>
                    {benefits.map((benefit, index) => (
                        <Box sx={{ display: 'flex' }} key={index}>
                            <CheckIcon sx={{ fontSize: 16, mt: 0.3, mr: 2 }} />
                            <Typography sx={{ fontSize: 14 }}>{benefit}</Typography>
                        </Box>
                    ))}
                </Box>
            )}
            <Box sx={{ mt: 1, display: 'flex', alignItems: 'center', gap: 2 }}>
                <Button
                    variant="contained"
                    onClick={isAdded ? () => removeProduct(id) : () => addProduct(id)}
                    disabled={userHasAlreadyThisCourse}
                    color="secondary"
                    sx={{ borderRadius: 0, width: '80%' }}
                >
                    {userHasAlreadyThisCourse ? 'Bought' : isAdded ? 'Remove from cart' : 'Add to cart'}
                </Button>
                {!userHasAlreadyThisCourse && (
                    <Tooltip title={isAlreadyOnWishlist ? 'Remove from wishlist' : 'Add to wishlist'}>
                        <IconButton onClick={handleAddingToWishlist}>
                            {isAlreadyOnWishlist ? <FavoriteIcon sx={{ fontSize: 40 }} /> : <FavoriteBorderIcon sx={{ fontSize: 40 }} />}
                        </IconButton>
                    </Tooltip>
                )}
            </Box>
        </>
    );

    return (
        <>
            <Box
                aria-haspopup="true"
                onClick={handleOpenPopoverOnClick}
                onMouseEnter={handleOpenPopoverOnHover}
                onMouseLeave={handleClosePopoverOnMouseLeave}
                sx={{
                    display: mostPopularSection && windowWidth > size.DESKTOP ? 'flex' : 'block',
                    flexDirection: mostPopularSection && windowWidth > size.DESKTOP ? 'row' : 'column',
                    position: 'relative',
                    cursor: 'pointer',
                    padding: mostPopularSection && windowWidth > size.DESKTOP ? 4 : null,
                    border: mostPopularSection && windowWidth > size.DESKTOP ? '1px solid black' : null,
                }}
            >
                <CardMedia
                    component="img"
                    sx={{
                        height: mostPopularSection ? { xs: 200, md: 280 } : { xs: 200, md: 140 },
                        width: mostPopularSection && windowWidth > size.DESKTOP ? '45%' : '100%',
                        maxWidth: '100%',
                        marginRight: mostPopularSection && windowWidth > size.DESKTOP ? 4 : null,
                    }}
                    src={img}
                    alt={title}
                />
                <Box paddingX={0} paddingY={1}>
                    <Typography
                        component="h3"
                        sx={{
                            fontWeight: 'bold',
                            fontSize: mostPopularSection && windowWidth > size.DESKTOP ? { xs: 18, md: 32 } : { xs: 18, md: 15 },
                            lineHeight: 1.2,
                            mb: 0.2,
                            display: '-webkit-box',
                            WebkitLineClamp: 2,
                            WebkitBoxOrient: 'vertical',
                            overflow: 'hidden',
                        }}
                    >
                        {title}
                    </Typography>
                    {mostPopularSection && (
                        <Typography sx={{ fontSize: 16, lineHeight: 1.4, width: windowWidth > size.DESKTOP ? 400 : null, marginY: 0.8 }}>
                            {description}
                        </Typography>
                    )}
                    <Typography
                        variant="caption"
                        sx={{
                            fontSize: mostPopularSection ? 12 : 11,
                            color: '#6a6f73',
                            display: '-webkit-box',
                            WebkitLineClamp: 1,
                            WebkitBoxOrient: 'vertical',
                            overflow: 'hidden',
                        }}
                    >
                        {mostPopularSection && 'Authors: '}
                        {authors.join(', ')}
                    </Typography>
                    {mostPopularSection && (
                        <Box sx={{ display: 'flex', gap: 1, marginY: 0.2 }}>
                            <Typography sx={{ fontSize: 12, b: { fontWeight: 'bold' }, color: 'gray' }}>
                                Date added: <b>{convertISODate(dateAdded, 'full date')}</b>
                            </Typography>
                            <Typography sx={{ fontSize: 12, color: 'gray', mb: 0.6 }}>
                                {duration.toString().replace('.', ',')} total hours
                            </Typography>
                        </Box>
                    )}
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                        <Typography sx={{ fontSize: 14, fontWeight: 'bold', color: '#B4690E' }}>
                            {rate.toString().replace('.', ',')}
                        </Typography>
                        <Rating readOnly value={Number(rate)} precision={0.1} sx={{ fontSize: 14, color: '#E59819' }} />
                        <Typography component="span" sx={{ fontSize: 10, color: '#6a6f73' }}>
                            ({opinions})
                        </Typography>
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, mt: mostPopularSection ? 1 : null }}>
                        {usePromotionPrice && promotionPrice && (
                            <Typography sx={{ fontSize: mostPopularSection ? 22 : null, fontWeight: 'bold', letterSpacing: -0.5 }}>
                                {formatCurrency(promotionPrice, 'EUR')}
                            </Typography>
                        )}
                        <Typography
                            sx={{
                                fontSize: mostPopularSection ? 22 : null,
                                fontWeight: promotionPrice ? 'regular' : 'bold',
                                textDecoration: promotionPrice ? 'line-through' : 'none',
                                color: promotionPrice ? '#6a6f73' : 'black',
                                letterSpacing: -0.5,
                            }}
                        >
                            {formatCurrency(price, 'EUR')}
                        </Typography>
                    </Box>
                    {opinions > 1200 && (
                        <Box
                            sx={{
                                width: 70,
                                height: 20,
                                backgroundColor: '#eceb98',
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                mt: 0.8,
                            }}
                        >
                            <Typography sx={{ fontSize: 11, fontWeight: 'bold' }}>Bestseller</Typography>
                        </Box>
                    )}
                </Box>
                {withPopover && popoverIsOpen && windowWidth > size.DESKTOP && (
                    <Paper
                        elevation={8}
                        sx={{
                            position: 'absolute',
                            top: '-30%',
                            left: lastChildInRow ? null : '100%',
                            right: lastChildInRow ? '100%' : null,
                            width: 340,
                            backgroundColor: 'white',
                            padding: 3,
                            pointerEvents: 'fill',
                            zIndex: 99,
                        }}
                    >
                        {subcardContent}
                    </Paper>
                )}
            </Box>
            {mostPopularSection || (withPopover && !(windowWidth > size.DESKTOP)) ? (
                <Modal open={popoverIsOpen} handleClose={() => setPopoverIsOpen(false)}>
                    {subcardContent}
                </Modal>
            ) : null}
        </>
    );
};

export default CourseCard;
