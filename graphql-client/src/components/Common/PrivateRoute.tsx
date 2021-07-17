import React, { Fragment, ReactNode } from 'react'
import { Redirect } from 'react-router-dom'

interface IPrivateRouteProps {
  children: ReactNode
}

const PrivateRoute = (props: IPrivateRouteProps) => (
  <Fragment>
    {localStorage.getItem('@CloudProject:token') ? props.children : <Redirect to='/' />}
  </Fragment>
)

export default PrivateRoute;