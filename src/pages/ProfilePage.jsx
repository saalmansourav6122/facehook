import { useEffect } from "react";
import useAuth from "../Hooks/useAuth.js";
import useAxios from "../Hooks/useAxios.js";
import { useProfile } from "../Hooks/useProfile.js";
import { actions } from "../actions";

const ProfilePage = () => {
  const { state, dispatch } = useProfile();
  const { api } = useAxios();
  const { auth } = useAuth();

  useEffect(() => {
    dispatch({ type: actions.profile.DATA_FETCHING });

    const fetchProfileData = async () => {
      try {
        const response = await api.get(
          `${import.meta.env.VITE_SERVER_BASE_URL}/profile/${auth?.user?.id}`,
        );
        if (response.status == 200) {
          dispatch({ type: actions.profile.DATA_FETCHED, data: response.data });
        }
      } catch (error) {
        console.error(error);
        dispatch({
          type: actions.profile.DATA_FETCH_ERROR,
          error: error.message,
        });
      }
    };
    if (auth?.user?.id) {
      fetchProfileData();
    }
  }, []);

  if (state?.loading) {
    return <div>Fetching your Profile data...</div>;
  }
  return (
    <>
      <div>
        Welcome {state?.user?.firstName} {state?.user?.lastName}
      </div>
      <div>You have {state?.posts?.length || 0} posts</div>
    </>
  );
};
export default ProfilePage;
