import { createBrowserRouter, type RouteObject, RouterProvider } from "react-router";
import { type RouteOptions, routes } from "@/root/routes-config";
import WithAuth from "@/shared/hoc/WithAuth";
import { AppLayout } from "@/shared/lib/enum";
import AuthLayout from "@/shared/hoc/AuthLayout";

const getBrowserRouter = (routes: RouteOptions[]) => {
  const routerObjects: RouteObject[] = routes.map((route: RouteOptions) => {
    const routerObject: RouteObject = {
      id: route.key,
      path: route.path,
      element: route.element,
    };

    switch (route.layout) {
      case AppLayout.AUTH:
        routerObject.element = <AuthLayout>{routerObject.element}</AuthLayout>;
    }

    if (route.isProtected) {
      routerObject.element = <WithAuth>{routerObject.element}</WithAuth>;
    }

    return routerObject;
  });

  // Add a catch-all route for 404 errors
  routerObjects.push({
    id: "not-found",
    path: "*",
    element: (
      <div className="p-8 text-center">
        <h1 className="text-2xl font-bold text-red-600">404 - Page Not Found</h1>
        <p className="mt-4 text-gray-600">The page you're looking for doesn't exist.</p>
        <a href="/" className="mt-4 inline-block text-blue-600 hover:underline">
          Go back home
        </a>
      </div>
    ),
  });

  const router = createBrowserRouter(routerObjects);
  return router;
};

const Router = () => {
  const router = getBrowserRouter(routes);
  console.log("Router initialized with routes:", routes);

  return <RouterProvider router={router} />;
};

export default Router;
