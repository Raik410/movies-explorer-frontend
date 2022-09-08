import React from 'react';
import {Redirect, Route} from "react-router-dom";
const LoginRouter = ({loggedIn, children, ...props}) => {
    return (

    <Route  {...props}>
        {loggedIn ? <Redirect to="/"/> : children}
    </Route>

);
};

export default LoginRouter;
