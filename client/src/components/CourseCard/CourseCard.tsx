import React from 'react';
import { Paper, CardMedia, Box, Typography, Rating } from '@mui/material';
import { ICourse } from '../../context/StoreProvider';
import { formatCurrency } from '../../utils/formatCurrency';
import Button from '../Button';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

const CourseCard = ({ id, authors, description, img, price, title, opinions, rate }: ICourse) => {
    return (
        <>
            <Paper elevation={8} variant="outlined" sx={{ overflow: 'hidden', position: 'relative' }}>
                <CardMedia component="img" height="215" src={img} alt={title} />
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
                        <Typography variant="body2"> Authors: {authors.map((author) => author)}</Typography>
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
                    <Button variant="contained" sx={{ position: 'absolute', bottom: 0, right: 0 }} endIcon={<ShoppingCartIcon />}>
                        Buy
                    </Button>
                </Box>
            </Paper>
        </>
    );
};

export default CourseCard;
