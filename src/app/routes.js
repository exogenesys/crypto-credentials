const Routes = {
  home: { path: "/", isProtected: false },
  login: { path: "/login", isProtected: false },
  viewUniversity: { path: "/view-university", isProtected: false },
  viewCredential: { path: "/view-credential", isProtected: true },
  init: { path: "/init", isProtected: true },
  dashboard: { path: "/university", isProtected: true },
  createUniversity: { path: "/create-university", isProtected: true },
  editUniversity: { path: "/edit-university", isProtected: true },
  editCredential: { path: "/edit-credential", isProtected: true },
};
export default Routes;
