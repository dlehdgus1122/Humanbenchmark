import { useAuth0 } from "@auth0/auth0-react";


const LoginButton = () => {
  const { loginWithRedirect, isLoading, user} = useAuth0();

  return (
    !isLoading && !user && (
      <button onClick={() => loginWithRedirect()}>
        Log In
      </button>
    )
    
  );
};

export default LoginButton;
