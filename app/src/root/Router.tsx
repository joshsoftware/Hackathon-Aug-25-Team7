import {
  createBrowserRouter,
  type RouteObject,
  RouterProvider,
} from "react-router";
import { type RouteOptions, routes } from "@/root/routes-config";
import WithAuth from "@/shared/hoc/WithAuth";

const getBrowserRouter = (routes: RouteOptions[]) => {
  const routerObjects: RouteObject[] = routes.map((route: RouteOptions) => {
    const routerObject: RouteObject = {
      id: route.key,
      path: route.path,
      element: route.element,
    };

    if (route.isProtected) {
      routerObject.element = <WithAuth>{routerObject.element}</WithAuth>;
    }

    return routerObject;
  });

  const router = createBrowserRouter(routerObjects);
  return router;
};

const Router = () => {
  const router = getBrowserRouter(routes);

  return <RouterProvider router={router} />;
};

export default Router;
