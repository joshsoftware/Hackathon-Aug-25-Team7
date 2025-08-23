import logo from "@/assets/logo.png";
import { useNavigate } from "react-router";
import { clearUserCredentials } from "@/shared/utils/local-storage";
import { SIGNIN_PATH } from "@/root/routes-constants";

const AppHeader = () => {
  const navigate = useNavigate();
  const handleSignOut = () => {
    clearUserCredentials();
    navigate(SIGNIN_PATH);
  };
  return (
    <header className="bg-blue-600 text-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Left side - Logo and title */}
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => navigate("/")}>
            <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center overflow-hidden">
              <img src={logo} alt="Josh Softwares Logo" className="w-6 h-6 object-contain" />
            </div>
            <div>
              <h1 className="text-xl font-bold">Josh Software</h1>
              <p className="text-blue-100 text-sm">AI Based Interviews</p>
            </div>
          </div>

          {/* Right side - Sign Out button */}
          <div className="flex items-center gap-4">
            <button
              onClick={handleSignOut}
              className="text-white hover:underline text-base font-medium bg-transparent border-none cursor-pointer px-2 py-1"
              type="button"
            >
              Sign Out
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default AppHeader;
