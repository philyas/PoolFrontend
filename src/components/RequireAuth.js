import { Navigate, Outlet, useLocation} from "react-router-dom"
import axios from "axios"
import { useSelector } from "react-redux"

const RequireAuth = ()=> {
    const location = useLocation()
    const tokenSelector = useSelector((state)=> state.token.value.logged)

    return(
      tokenSelector ?
     <Outlet /> :
     <Navigate to='/' state={{from:location}} replace />
    )
}

export default RequireAuth