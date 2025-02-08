const ROUTES = {
    HOME: '/',
    AUTH: '/auth'
  };
  
  // Helper functions to get route paths
  export const getHomeRoute = () => ROUTES.HOME;
  export const getAuthRoute = () => ROUTES.AUTH;
  
  // Helper functions to check current route
  export const isHomeRoute = (pathname) => pathname === ROUTES.HOME;
  export const isAuthRoute = (pathname) => pathname === ROUTES.AUTH;
  
  export default ROUTES;