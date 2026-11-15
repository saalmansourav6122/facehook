import { useAuth } from "../Hooks/useAuth";
import { Link } from "react-router-dom";

const HomePage = () => {
  const { auth } = useAuth();
  console.log(auth);

  return (
    <>
      <p>Home page</p>
      <Link to="/me">View Profile</Link>
    </>
  );
};

export default HomePage;
