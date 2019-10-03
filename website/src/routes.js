import React from 'react'
import { Switch, Route } from 'react-router-dom'

import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import New from './pages/New'

export default () =>
  <Switch>
    <Route
      path="/"
      exact
      component={Login}
    />

    <Route
      path="/dashboard"
      component={Dashboard}
    />

    <Route
      path="/new"
      component={New}
    />
  </Switch>
