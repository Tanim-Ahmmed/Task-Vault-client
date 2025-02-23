import { Navigate, useLocation } from "react-router-dom";
import Loading from "../pages/Loading";
import { useContext } from "react";
import { AuthContext } from "../provider/AuthProvider";

const PrivateRoutes = ({children}) => {
    const {user, loading} = useContext(AuthContext);
    const location = useLocation();
    if(loading){
        return <Loading></Loading>
    }
    if(user){
        return children;
    }
    return  <Navigate to="/login" state={location?.pathname}> </Navigate>
};

export default PrivateRoutes;