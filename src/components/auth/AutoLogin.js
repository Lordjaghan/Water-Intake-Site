import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { loadUser } from "../../store/authSlice";

function AutoLogin(props){
    const dispatch = useDispatch();
    useEffect(()=>{dispatch(loadUser())},[dispatch])
    return props.children
}

export default AutoLogin;
