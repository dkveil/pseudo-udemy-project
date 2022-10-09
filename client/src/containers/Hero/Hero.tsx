import React from 'react';
import { Container } from '@mui/system';
import { Wrapper, ContentWrapper } from './Hero.styles';
import { Typography } from '@mui/material';
import { useStoreContext } from '../../context/StoreProvider';
import SchoolIcon from '@mui/icons-material/School';

const Hero = () => {
    const backgroundColors = ['#a5e2d0', '#CFE8FC', '#d498fe'];
    const [heroBgColor] = React.useState<string>(backgroundColors[Math.floor(Math.random() * backgroundColors.length)]);
    const [headingContent, setHeadingContent] = React.useState<string>('Hello, user!');

    const { user } = useStoreContext();

    React.useEffect(() => {
        if (user) {
            setHeadingContent(`Hello, ${user.login.charAt(0).toUpperCase() + user.login.slice(1)}! `);
        } else {
            setHeadingContent(`Hello, user! `);
        }
    }, [user]);

    return (
        <Wrapper backgroundColor={heroBgColor} maxWidth={{ lg: 'lg' }}>
            <Container maxWidth="xl" sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', height: '100%' }}>
                <ContentWrapper>
                    <Typography component="h1" variant="h4" sx={{ fontWeight: 'bold' }}>
                        {headingContent}
                    </Typography>
                    <Typography component="p" variant="subtitle1">
                        Good time to learn something! Check our course offer quickly!
                    </Typography>
                </ContentWrapper>
                <SchoolIcon
                    sx={{ position: { xs: 'absolute', sm: 'static' }, fontSize: 380, color: 'white', pointerEvents: 'none', zIndex: 0 }}
                />
            </Container>
        </Wrapper>
    );
};

export default Hero;
