import { Outlet } from "react-router-dom";
import GlobalTemplate from "../../components/Template";

const PublicRoutes = () => {
  return (
    <GlobalTemplate>
      <Outlet />
    </GlobalTemplate>
  );
};

export default PublicRoutes;
