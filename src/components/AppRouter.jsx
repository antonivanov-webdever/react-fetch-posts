import React, {useContext} from 'react';
import {Redirect, Route, Switch} from "react-router-dom";
import {publicRoutes, privateRoutes} from "../router";
import {AuthContext} from "../context";
import Loader from "./UI/Loader/Loader";

const AppRouter = () => {
    const {isAuth, isLoading} = useContext(AuthContext)

    if (isLoading) {
        return <Loader/>
    }

    return (
        isAuth
            ? <Switch>
                {privateRoutes.map(route =>
                    <Route
                        key={route.path}
                        path={route.path}
                        component={route.component}
                        exact={route.exact}
                    />
                )}
                <Redirect to="/posts" />
             </Switch>
            : <Switch>
                {publicRoutes.map(route =>
                    <Route
                        key={route.path}
                        path={route.path}
                        component={route.component}
                        exact={route.exact}
                    />
                )}
                <Redirect to="/login" />
            </Switch>
    );
};

export default AppRouter;