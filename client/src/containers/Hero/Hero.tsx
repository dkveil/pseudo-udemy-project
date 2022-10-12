import React from 'react';
import { Container } from '@mui/system';
import { Wrapper, ContentWrapper } from './Hero.styles';
import { Typography } from '@mui/material';
import { useStoreContext } from '../../context/StoreProvider';
import SchoolIcon from '@mui/icons-material/School';
import Hero1 from '../../assets/images/hero1.jpg';
import Hero2 from '../../assets/images/hero2.jpg';
import Hero3 from '../../assets/images/hero3.jpg';
import Hero4 from '../../assets/images/hero4.jpg';

const Hero = () => {
    const backgroundHeros = [Hero1, Hero2, Hero3, Hero4];
    const [hero] = React.useState<string>(backgroundHeros[Math.floor(Math.random() * backgroundHeros.length)]);
    const [headingContent, setHeadingContent] = React.useState<string>('Hello, user!');

    console.log(hero);

    const { user } = useStoreContext();

    React.useEffect(() => {
        if (user) {
            setHeadingContent(`Hello, ${user.login.charAt(0).toUpperCase() + user.login.slice(1)}! `);
        } else {
            setHeadingContent(`Hello, user! `);
        }
    }, [user]);

    return (
        <Wrapper background={hero} maxWidth={{ xs: '100%', lg: 'lg' }}>
            <Container sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', height: '100%', width: '100%' }}>
                <ContentWrapper>
                    <Typography component="h1" variant="h4" sx={{ fontWeight: 'bold' }}>
                        {headingContent}
                    </Typography>
                    <Typography component="p" variant="subtitle1">
                        Good time to learn something! Check our course offer quickly!
                    </Typography>
                </ContentWrapper>
                <SchoolIcon
                    sx={{
                        position: { xs: 'absolute', sm: 'static' },
                        fontSize: 380,
                        color: 'rgba(255,255,255,0.6)',
                        pointerEvents: 'none',
                        zIndex: 0,
                    }}
                />
            </Container>
        </Wrapper>
    );
};

export default Hero;
