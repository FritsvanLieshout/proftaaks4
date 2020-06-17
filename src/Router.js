import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import FileUpload from "./FileUpload";

const Router = () => (
  <BrowserRouter>
    <Switch>
      <Route path="/upload/:id" component={FileUpload} />
    </Switch>
  </BrowserRouter>
);

export default Router;
