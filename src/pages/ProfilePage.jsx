import { useState, useEffect } from "react"
import  useAuth  from "../Hooks/useAuth.js"
import useAxios from "../Hooks/useAxios.js"
const ProfilePage = () => {
  const [user, setUser] = useState(null)
  const [posts, setPosts] = useState([])
  const { api } = useAxios()
  const { auth } = useAuth()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchProfileData = async () => {
      setLoading(true)
      try {
        const response = await api.get(`${import.meta.env.VITE_SERVER_BASE_URL}/profile/${auth?.user?.id}`)
        setUser(response?.data?.user)
        setPosts(response?.data?.posts)
      } catch (error) {
        console.error(error)
        setError(error)
      } finally {
        setLoading(false)
      }
        
    }
    if (auth?.user?.id) {
      fetchProfileData();
    }
  }, [api, auth?.user?.id]);

 if (loading) {
    return <div>Fetching your Profile data...</div>;
  }
  return (
    <>
      <div>Welcome {user?.firstName} {user?.lastName}</div>
      <div>You have {posts.length} posts</div>
    </>
  )
}
export default ProfilePage;