import { Navigate } from "react-router-dom";

const Protected = ({ children }) => {
  const token = sessionStorage.getItem("url_token");

  if (token) {
    return children;
  }

  return <Navigate to="/login"/>;
};
export default Protected;
