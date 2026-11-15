import { useNavigate } from "react-router-dom";
import logoutIcon from "../../assets/icons/logout.svg";
import { useAuth } from "../../Hooks/useAuth";

function LogOut() {
  const navigate = useNavigate();
  const { setAuth } = useAuth();
  const handleLogOut = () => {
    setAuth({});
    navigate("/login");
  };

  return (
    <button type="button" className="icon-btn" onClick={handleLogOut}>
      <img src={logoutIcon} alt="Logout" />
    </button>
  );
}

export default LogOut;
