import React from 'react';
import Introduction from "../Introduction/Introduction";
import Promo from "../Promo/Promo";
import Techs from "../Techs/Techs";
import AboutMe from "../AboutMe/AboutMe";
import Portfolio from "../Portfolio/Portfolio";

const Main = () => {
    return (
        <>
            <Introduction />
            <Promo />
            <Techs />
            <AboutMe />
            <Portfolio />
        </>
    );
};

export default Main;