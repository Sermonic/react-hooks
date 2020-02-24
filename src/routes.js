import React from "react";
import { Switch, Route } from "react-router-dom";

import GlobalFeed from "./pages/globalFeed";
import Article from "./pages/article";
import Authenticaton from "./pages/authentication";

export default () => {
  return (
    <Switch>
      <Route path="/" component={GlobalFeed} exact />
      <Route path="/login" component={Authenticaton} />
      <Route path="/register" component={Authenticaton} />
      <Route path="/article/:slug" component={Article} />
    </Switch>
  );
};
