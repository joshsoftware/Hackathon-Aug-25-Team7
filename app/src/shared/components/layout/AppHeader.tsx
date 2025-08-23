import logo from "@/assets/logo.png";

const AppHeader = () => {
  return (
    <header className="bg-blue-600 text-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Left side - Logo and title */}
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center overflow-hidden">
              <img 
                src={logo} 
                alt="Josh Softwares Logo" 
                className="w-6 h-6 object-contain"
              />
            </div>
            <div>
              <h1 className="text-xl font-bold">Josh Softwares</h1>
              <p className="text-blue-100 text-sm">Interview Management System</p>
            </div>
          </div>

          {/* Right side - Empty for now, can be used for future features */}
          <div className="flex items-center gap-4">
            {/* Future content can go here */}
          </div>
        </div>
      </div>
    </header>
  );
};

export default AppHeader;
