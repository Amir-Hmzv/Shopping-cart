import { useNavigate } from "react-router-dom";
import { UserAuth } from "../context/AuthContext";
import { ReactNode } from "react";
interface Props {
  children: ReactNode;
}
const Protected: React.FC<Props> = ({ children }) => {
  const { user }: any = UserAuth();
  const navigate = useNavigate();

  return <>{user ? children : navigate("/")}</>;
};

export default Protected;
