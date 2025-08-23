import Banner from "@/assets/banner.png";
import { Link } from "react-router";
import { HOME_PATH } from "@/root/routes-constants";
import { type FC, type ReactNode, useEffect } from "react";
import { useLocation, useNavigate } from "react-router";
import { SIGNIN_PATH } from "@/root/routes-constants";
import { getAccessToken, getUserData } from "@/shared/utils/local-storage";

interface AuthLayoutProps {
  children: ReactNode;
}

const AuthLayout: FC<AuthLayoutProps> = ({ children }) => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const userAccessToken = getAccessToken();
    const userData = getUserData();

    const shouldRedirect = [SIGNIN_PATH].includes(location.pathname);

    if (userAccessToken && userData && shouldRedirect) {
      //TODO redirect some
    }
  }, [navigate]);

  return (
    <div >
        <div >
          <div >{children}</div>
        </div>      
    </div>
  );
};

export default AuthLayout;
