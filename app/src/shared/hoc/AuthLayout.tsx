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
    <div className="grid min-h-svh lg:grid-cols-2">
      <div className="flex flex-col gap-4 p-6 md:p-10 relative">
        <div className="absolute top-6 left-6 md:top-10 md:left-10 cursor-pointer">
          <Link to={HOME_PATH}>
            {/* <img src={TextLogo} alt="Logo" className="w-48" /> */}
            HOME
          </Link>
        </div>
        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-xs">{children}</div>
        </div>
      </div>
      <div className="relative hidden bg-muted lg:block">
        <img
          src={Banner}
          alt="Image"
          className="absolute h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
        />
      </div>
    </div>
  );
};

export default AuthLayout;
