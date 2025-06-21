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
  const [consfirmPassword, setConfirmPassword] = useState("")
  return (
    <div>Profile</div>
  )
}

export default Profile