import { useAuth0 } from "@auth0/auth0-react";
import Button from "@mui/material/Button";

const LoginButton = () => {
  const { loginWithRedirect, isLoading, user} = useAuth0();

  return (
    !isLoading && !user && (
      <Button variant="contained" onClick={() => loginWithRedirect()}>
        Log In
      </Button>
    )
    
  );
};

export default LoginButton;
