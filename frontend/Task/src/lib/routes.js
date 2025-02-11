const ROUTES = {
  HOME: '/',
  AUTH: '/auth',
  PROFILE: '/profile',
  LOGOUT: '/logout',
  COMPLETED_QUESTS: '/completed-quests', // Додаємо новий роут
  QUEST_PREVIEW: '/quest-preview',
  QUEST: '/quest',
  MY_QUESTS: "/my-quests",
  CONSTRUCTOR_OF_QUEST: '/constructor-of-quest',
};

// Helper functions to get route paths
export const getHomeRoute = () => ROUTES.HOME;
export const getAuthRoute = () => ROUTES.AUTH;
export const getProfileRoute = () => ROUTES.PROFILE;
export const getLogoutRoute = () => ROUTES.LOGOUT;
export const getCompletedQuestsRoute = () => ROUTES.COMPLETED_QUESTS; // Додаємо функцію для отримання роуту
export const getQuestPreviewRoute = () => ROUTES.QUEST_PREVIEW;
export const getQuestRoute = () => ROUTES.QUEST;
export const getMyQuestsRoute = () => ROUTES.QUEST;
export const getConstructorOfQuestRoute = () => ROUTES.CONSTRUCTOR_OF_QUEST;


// Helper functions to check current route
export const isHomeRoute = (pathname) => pathname === ROUTES.HOME;
export const isAuthRoute = (pathname) => pathname === ROUTES.AUTH;
export const isProfileRoute = (pathname) => pathname === ROUTES.PROFILE;
export const isLogoutRoute = (pathname) => pathname === ROUTES.LOGOUT;
export const isCompletedQuestsRoute = (pathname) => pathname === ROUTES.COMPLETED_QUESTS; // Додаємо функцію для перевірки роуту
export const isQuestPreviewRoute = (pathname) => pathname === ROUTES.QUEST_PREVIEW;
export const isQuestRoute = (pathname) => pathname === ROUTES.QUEST;
export const isMyQuestsRoute = (pathname) => pathname === ROUTES.QUEST;
export const isConstructorOfQuestRoute = (pathname) => pathname === ROUTES.CONSTRUCTOR_OF_QUEST;

export default ROUTES;
