import { useMemo } from "react";
import { Routes, Route } from "react-router-dom";
import routes from "routing";

function RoutesWrapper() {
  const routeComponents = useMemo(
    () =>
      Object.values(routes).map((route) => {
        const Component = route.element;

        /* if (route.sidebar) {
          Component = withSidebar(Component, route.contained);
        } */

        return (
          <Route key={route.path} path={route.path} element={<Component />} />
        );
      }),
    []
  );

  return <Routes>{routeComponents}</Routes>;
}

export default RoutesWrapper;
