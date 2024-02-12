import { useSelector } from 'react-redux'
import { Navigate,Outlet } from 'react-router-dom'
import { RootState } from '../store/store'

const PrivateRoute = () => {
  const isSignedIn= useSelector((state:RootState)=>state.user.isSignedIn)
  return isSignedIn ? <Outlet/> :<Navigate to='login' />
}

export default PrivateRoute