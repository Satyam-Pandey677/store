import { useState, useEffect } from "react"
import { Link, useLocation, useNavigate } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux"
import Loader from "../../component/Loader"
import { setCredientials } from "../../redux/features/auth/authSlice"
import { toast } from "react-toastify"
import { useRegisterMutation } from "../../redux/Api/apiUserSlice"

const Register = () => {
  const [username, setUsername] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [consfirmPassword, setConfirmPassword] = useState("")

  const dispatch = useDispatch()
  const navigate = useNavigate()


  const [register, {isLoading}] = useRegisterMutation()
  const {userInfo }= useSelector(state => state.auth)

  const {search} = useLocation()
  const sp = new URLSearchParams(search)
  const redirect = sp.get('redirect') || '/';


  useEffect(() => {
    if(userInfo){
      navigate(redirect)
    }
  }, [navigate,userInfo, redirect])

  const submitHandler = async(e) => {
    e.preventDefault()

    if(password !== consfirmPassword){
      toast.error("Password Does not match")
    }else{
      try {
        const res = await register({username, email, password}).unwrap()
        dispatch(setCredientials({...res}))
        navigate(redirect)
        toast.success("User Successfully Registerd")
      } catch (error) {
        console.log(error.message)
        toast.error(error.data.message)
      }
    }
  }


  return (
    <section className="ps-[10rem] flex flex-wrap">
      <div className="mr-[4rem] mt-[5rem]">
        <h1 className="text-2xl font-semibold mb-4">Register</h1>
        <form onSubmit={submitHandler} className="container w-[40rem]">
            <div className="my-[2rem]">
              <label 
              htmlFor="name"
              className="block text-sm font-medium">Username</label>
              <input type="text" id="name" className="mt-1 p-2 border rounded w-full"  placeholder="Enter a Username" value={username} onChange={(e) => setUsername(e.target.value)}/>
            </div>
            <div className="my-[2rem]">
              <label 
              htmlFor="email"
              className="block text-sm font-medium">Email</label>
              <input type="email" id="email" className="mt-1 p-2 border rounded w-full"  placeholder="Enter a Email" value={email} onChange={(e) => setEmail(e.target.value)}/>
            </div>
            <div className="my-[2rem]">
              <label 
              htmlFor="password"
              className="block text-sm font-medium">Password</label>
              <input type="password" id="password" className="mt-1 p-2 border rounded w-full"  placeholder="Enter a Password" value={password} onChange={(e) => setPassword(e.target.value)}/>
            </div>
            <div className="my-[2rem]">
              <label 
              htmlFor="confirmPass"
              className="block text-sm font-medium">Confirm Password</label>
              <input type="password" id="confirmPass" className="mt-1 p-2 border rounded w-full"  placeholder="Enter a Confirm Password" value={consfirmPassword} onChange={(e) => setConfirmPassword(e.target.value)}/>
            </div>

            <button disabled={isLoading} type="submit" className="bg-pink-500 text-white cursor-pointer px-4 py-2 rounded my-[1rem]">
              {isLoading? "Registering...": "Register"}
            </button>

            {isLoading && <Loader/>}
        </form>

        <div className="mt-4">
          <p>
            Already have an account ? {" "}
            <Link to={redirect? `/login?redirect= ${redirect}`:"/login"} className="text-pink-500 hover:underline">Login</Link>
          </p>
        </div>
      </div>
      <img src="https://images.unsplash.com/photo-1449247666642-264389f5f5b1?q=80&w=1169&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="" className="h-[52rem] w-[59%] xl:block md:hidden sm:hidden rounded-lg" />
    </section>
  )
}

export default Register