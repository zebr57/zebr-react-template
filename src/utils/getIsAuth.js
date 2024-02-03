export const getIsAuth = (str) => {
  const authStr = localStorage.getItem("auth");
  if (!authStr) {
    return false;
  } else {
    return authStr.includes(str);
  }
};
