import { Switch, Route } from "react-router-dom";
import { Home } from "../pages/Home";

import { Login } from "../pages/Login";
import { Register } from "../pages/Register";

export const Routes = () => {
    return (
        <Switch>
            <Route path="/login" component={ Login } />
            <Route path="/register" component={ Register } />
            <Route path="/" component={ Home } />
        </Switch>
    );
};
