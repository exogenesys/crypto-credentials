const Routes = {
  home: { path: "/", isProtected: false },
  login: { path: "/login", isProtected: false },
  viewUniversity: { path: "/view-university", isProtected: false },
  viewCredential: { path: "/view-credential", isProtected: false },
  init: { path: "/init", isProtected: true },
  dashboard: { path: "/dashboard", isProtected: true },
  publishUniversity: { path: "/publish-university", isProtected: true },
  publishCredential: { path: "/publish-credential", isProtected: true },
  editUniversity: { path: "/edit-university", isProtected: true },
  editCredential: { path: "/edit-credential", isProtected: true },
};
export default Routes;
