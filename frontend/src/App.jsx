import { Navigate, Route, Routes } from "react-router-dom"
import HomePage from './pages/home/HomePage';
import LoginPage from './pages/auth/login/LoginPage';
import SignUpPage from './pages/auth/signup/SignUpPage';
import NotificationPage from "./pages/notification/NotificationPage";
import ProfilePage from "./pages/profile/ProfilePage";


import Sidebar from "./components/commons/Sidebar";
import RightPanel from "./components/commons/RightPanel";
import { Toaster } from "react-hot-toast";
import { useQuery } from "@tanstack/react-query";
import LoadingSpinner from "./components/commons/LoadingSpinner";



function App() {
  //use query key to give unique name to our query and refer to it later
  const {data:authUser,isLoading,} = useQuery({
    queryKey : ['authUser'],
    queryFn : async () => {
      try {
        const res = await fetch("/api/auth/me",{

        })
        const data = await res.json()

        if(!res.ok ){
          throw new Error(data.error || "something went wrong")
        }
        console.log("auth user is here : ",data)
        return data
      } catch (error) {
        throw new Error(error);
        
      }
    },
    retry : false,
  });
  if(isLoading) {
    return (
      <div className="h-screen flex justify-center items-center">
        <LoadingSpinner size="lg"/>
      </div>
    ) 
  } 
  // console.log("auth user is here",data)
  return (
    <div className="flex max-w-6xl mx-auto">
     {authUser && <Sidebar/> }
      <Routes>
        <Route path="/" element={authUser ? <HomePage/> : <Navigate to="/login"/>} />
        <Route path="/login" element={!authUser ?<LoginPage/> : <Navigate to="/"/>}/>
        <Route path="/signup" element={!authUser ? <SignUpPage/> : <Navigate to="/"/> }/>
        <Route path="/notifications" element={authUser ? <NotificationPage/> :  <Navigate to="/login"/>}/>
        <Route path="/profile/:username" element={authUser ? <ProfilePage/> :   <Navigate to="/login"/>}/>
      </Routes>
       {authUser &&<RightPanel/>}
      <Toaster/>
    </div>
  )
}

export default App
