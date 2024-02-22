module.exports = {
  extends: ["react-app", "react-app/jest", "prettier"],
  plugins: ["prettier"],
  rules: {
    "prettier/prettier": "error",
    "jsx-a11y/anchor-is-valid": "off"
  }
};
