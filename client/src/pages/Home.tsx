import React from 'react';
import Hero from '../containers/Homepage/Hero/Hero';
import Courses from '../containers/Homepage/Courses/Courses';
import MostPopular from '../containers/Homepage/MostPopular/MostPopular';

const Homepage = () => {
    return (
        <>
            <Hero />
            <MostPopular />
            <Courses />
        </>
    );
};

export default Homepage;
