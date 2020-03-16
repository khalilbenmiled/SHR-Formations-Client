import React from "react"
import { Route , Redirect} from "react-router-dom";

export default function PrivateRoute ({component: Component,  ...rest}) {
    return (
      <Route
        {...rest}
        render={(props) =>
           localStorage.getItem("user")
          ? <Redirect to={{pathname: '/dashboard', state: {from: props.location}}} />
          : <Component {...props} /> }
      />
    )
  }