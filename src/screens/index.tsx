import React, {ReactElement} from "react";
import {Route, Switch} from "react-router-dom";
import Modules from "./modules";
import NotFoundScreen from "./not-found-screen";
import Home from "./home";
import About from "./about";

function Screens(): ReactElement {
    return (
        <Switch>
            <Route path="/home" exact={true} component={Home}/>
            <Route path="/modules" exact={true} component={Modules}/>
            <Route path="/about" exact={true} component={About}/>
            <Route path="/" exact={true} component={Home}/>
            <Route path="*" component={NotFoundScreen}/>
        </Switch>
    );
}

export default Screens;