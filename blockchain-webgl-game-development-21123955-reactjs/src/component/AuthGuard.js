import { UserContext } from "src/context/User";
import React, { useContext } from "react";
import { Redirect } from "react-router-dom";

export default function AuthGuard(props) {
  const { children } = props;
  const user = useContext(UserContext);
  if (!user.userLoggedIn) {
    return <Redirect to="/" />;
  }

  return <>{children}</>;
}
