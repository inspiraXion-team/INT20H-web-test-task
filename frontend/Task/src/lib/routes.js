const ROUTES = {
  HOME: '/',
  AUTH: '/auth',
  PROFILE: '/profile',
  LOGOUT: '/logout',
  COMPLETED_QUESTS: '/completed-quests' // Додаємо новий роут
};

// Helper functions to get route paths
export const getHomeRoute = () => ROUTES.HOME;
export const getAuthRoute = () => ROUTES.AUTH;
export const getProfileRoute = () => ROUTES.PROFILE;
export const getLogoutRoute = () => ROUTES.LOGOUT;
export const getCompletedQuestsRoute = () => ROUTES.COMPLETED_QUESTS; // Додаємо функцію для отримання роуту

// Helper functions to check current route
export const isHomeRoute = (pathname) => pathname === ROUTES.HOME;
export const isAuthRoute = (pathname) => pathname === ROUTES.AUTH;
export const isProfileRoute = (pathname) => pathname === ROUTES.PROFILE;
export const isLogoutRoute = (pathname) => pathname === ROUTES.LOGOUT;
export const isCompletedQuestsRoute = (pathname) => pathname === ROUTES.COMPLETED_QUESTS; // Додаємо функцію для перевірки роуту

export default ROUTES;
