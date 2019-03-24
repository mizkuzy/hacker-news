import React from 'react';
import Loading from "../Loading";
import Button from "../Button";

const withLoading = (Component) => ({isLoading, ...rest}) => {
  return isLoading ? <Loading/> : <Component {...rest} />;
}

const ButtonWithLoading = withLoading(Button);

export default ButtonWithLoading