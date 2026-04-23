import { useLocation } from "react-router-dom";
import { useEffect } from "react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#080808] px-6 text-[#FAFAFA]">
      <div className="text-center">
        <h1 className="mb-4 text-5xl font-bold">404</h1>
        <p className="mb-4 text-lg text-[#555]">Page not found</p>
        <a href="/" className="text-[#00D4FF] underline underline-offset-4 hover:text-[#FAFAFA]">
          Return to Home
        </a>
      </div>
    </div>
  );
};

export default NotFound;
