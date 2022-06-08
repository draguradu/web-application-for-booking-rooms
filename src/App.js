import React from "react";
import "./App.scss";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Switch, Redirect } from "react-router-dom";
import LayoutContainer from "layout/LayoutContainer";
import routes from './global.routes';
import { GlobalStateProvider } from "contexts";

function App() {
    return (
        <GlobalStateProvider>
            <BrowserRouter>
                <Switch>
                    <Redirect exact from='/' to='/login' />
                    {routes}
                    <LayoutContainer />
                </Switch>
            </BrowserRouter>
        </GlobalStateProvider>
    )
}

export default App;
