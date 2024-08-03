import { useLocation } from "react-router-dom";

const useHideNavBarFooter = () => {
  const location = useLocation();
  const adminPaths = ["/admin",];
  return adminPaths.some(path => location.pathname.startsWith(path));
};

export default useHideNavBarFooter;
