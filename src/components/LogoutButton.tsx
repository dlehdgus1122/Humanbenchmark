import { useAuth0 } from "@auth0/auth0-react";

const LogoutButton = () => {
  const { logout, isLoading, user} = useAuth0();

  return (
    !isLoading && user && (
      <button onClick={() => logout()}>
        Log Out
      </button>
    )
    
  );
};

export default LogoutButton;