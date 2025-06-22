import { useEffect, useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import { toast } from "react-toastify"
import Loader from "../../component/Loader"
import { setCredientials } from "../../redux/features/auth/authSlice"
import { Link } from "react-router-dom"
import { useProfileMutation } from "../../redux/Api/apiUserSlice"

const Profile = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [consfirmPassword, setConfirmPassword ] = useState("")

  const userInfo = useSelector(state => state.auth)
  const [updateProfile, {isLoading: loadingUpdateProfile}] = useProfileMutation()

  useEffect(() => {
    setUsername(userInfo.userInfo.data.username)
    setEmail(userInfo.userInfo.data.email)
  },[userInfo.userInfo.data.username, userInfo.userInfo.data.email])

  const dispatch = useDispatch()

  const submitHandler =async() => {
    if (password !== consfirmPassword) {
        toast.error("Password don not match")
    } else {
      try {
        const res = await updateProfile({
          _id: userInfo.userInfo.data._id,
          username,
          email,
          password
        }).unwrap
      } catch (error) {
        toast.error(error?.data?.message || error.message)
        console.log(error.message)
      }
    }
  }

  return (
    <div className="container mx-auto p-4 mt-[4rem]">
      <div className="flex justify-center align-center md:flex md:space-x-4">
        <div className="md:w-1/3">
        <h2 className="text-2xl font-semibold mb-4">Update Profile</h2>

        <form onSubmit={submitHandler} >
          <div className="mb-4">
            <label htmlFor="" className="block mb-2">Username</label>
            <input 
            type="text" 
            placeholder="Enter New Username" 
            className="form-input border-1 p-4 rounded-sm w-full"
            value={username}
            onChange={(e) => setUsername(e.target.value)} />
          </div>
          <div className="mb-4">
            <label htmlFor="" className="block mb-2">Email</label>
            <input 
            type="email" 
            placeholder="Enter New Email" 
            className="form-input border-1 p-4 rounded-sm w-full"
            value={email}
            onChange={(e) => setEmail(e.target.value)} />
          </div>
          <div className="mb-4">
            <label htmlFor="" className="block mb-2">Password</label>
            <input 
            type="password" 
            placeholder="Enter New Password" 
            className="form-input border-1 p-4 rounded-sm w-full"
            value={password}
            onChange={(e) => setPassword(e.target.value)} />
          </div>
          <div className="mb-4">
            <label htmlFor="" className="block mb-2">Confirm Password</label>
            <input 
            type="passsword" 
            placeholder="Enter New Email" 
            className="form-input border-1 p-4 rounded-sm w-full"
            value={consfirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)} />
          </div>

          <div className="flex justify-between">
              <button type="submit" className="bg-pink-500 text-white py-2 px-4 rounded hover:bg-pink-600">
                Update  
              </button>

              <Link to="/user-order" className="bg-pink-500 text-white py-2 px-4 rounded hover:bg-pink-700">
                  My Orders
              </Link>
          </div>
        </form>
        </div>

        {loadingUpdateProfile && <Loader/>}
      </div>
    </div>
  )
}

export default Profile