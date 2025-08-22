import { type FC, type ReactNode, useEffect } from "react";
import { useLocation, useNavigate } from "react-router";
import { SIGNIN_PATH } from "@/root/routes-constants";
import {
  clearUserCredentials,
  getAccessToken,
  getUserData,
} from "@/shared/utils/local-storage";

interface WithAuthProps {
  children: ReactNode;
}

const WithAuth: FC<WithAuthProps> = ({ children }) => {
  const location = useLocation();
  const navigate = useNavigate();

  const userAccessToken = getAccessToken();
  const userData = getUserData();

  useEffect(() => {
    const userAccessToken = getAccessToken();
    const userData = getUserData();

    if (!userAccessToken || !userData) {
      clearUserCredentials();
      navigate(`${SIGNIN_PATH}?callback=${location.pathname}`);
    }
  }, [navigate]);

  if (!userAccessToken || !userData) {
    return null;
  }

  return <>{children}</>;
};

export default WithAuth;
