import React from 'react';
import { ApolloError } from 'apollo-boost';

interface IErrorMessageProps{
  error: ApolloError;
}
const ErrorMessage = (props: IErrorMessageProps) => {
  const [isAuth, setIsAuth] = React.useState(true);
  const [errorMessage, setErrorMessage] = React.useState('');
  React.useEffect(()=>{
    props.error.networkError ? setErrorMessage('Network error, please try again later.') : '';
    if(!props.error.networkError){
      props.error.graphQLErrors.forEach(({message}) => {
        if(message.indexOf('Not Authenticated') >= 0){
          setErrorMessage(message);
          setIsAuth(false);
          const timer = setTimeout(()=>{
            window.location.href = '/';
            clearTimeout(timer);
          }, 3000);
        }else{
          setErrorMessage(message);
        }
      });
    }
  },[]);

  return (
    <div style={{color: "red", textAlign:"center"}}>{errorMessage}{!isAuth ? ` Redirect to login page after 3s` : ''}</div>
  )
}

export default ErrorMessage;