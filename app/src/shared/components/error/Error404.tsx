import FullLogo from "@/assets/logo-full.svg";
import { Button } from "@/shared/components/ui/button";

const Error404 = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-background font-inter">
      <div className="max-w-3xl w-full">
        <div className="flex justify-center mb-8">
          <img src={FullLogo} alt="Full Logo" className="w-40 h-auto" />
        </div>

        <div className="text-center space-y-6">
          <h1 className="text-6xl md:text-8xl font-bold text-primary">404</h1>
          <h2 className="text-xl md:text-3xl font-medium text-foreground">
            Page not found
          </h2>
          <p className="text-muted-foreground max-w-md mx-auto">
            The page you're looking for doesn't exist or has been moved to
            another URL.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
            <Button
              onClick={() => (window.location.href = "/")}
              size="lg"
            >
              Back to Home
            </Button>
            <Button
              onClick={() => window.history.back()}
              variant="outline"
              size="lg"
            >
              Go Back
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Error404;
