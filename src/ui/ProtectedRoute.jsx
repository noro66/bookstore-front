import styled from "styled-components";
import { useUser } from "../features/authentication/useUser";
import Spinner from "./Spinner";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
const FullPage = styled.div`
  height: 100vh;
  background-color: var(--color-grey-50);
  display: flex;
  justify-content: center;
  align-items: center;
`;
function ProtectedRoute({ children }) {
  const { isPending, user, isAuthonticated } = useUser();
  const navigagte = useNavigate();
  
  useEffect(() => {
    if (!user && !isAuthonticated && !isPending) navigagte("/login");
  }, [navigagte, isAuthonticated, isPending, user]);

  if (isPending)
    return (
      <FullPage>
        <Spinner />
      </FullPage>
    );

  return children;
}

export default ProtectedRoute;
