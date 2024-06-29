import { useEffect, useState } from "react";
import { getAllPermissions } from "../helpers/getAllPermissions";
import { useContext } from "react";
import { AuthContext } from "../../login/context/AuthContext";
import { PermissionWrapper } from "../interfaces/PermissionWrapper";
export const usePermissions = () => {
  const [permissions, setPermissions] = useState<null | PermissionWrapper>(null);
  const {user}= useContext(AuthContext)
  useEffect(() => {
    if(permissions){
      return
    }
    if(!user){
      return
    }
      getAllPermissions(user?.token).then((permissions)=>{
        setPermissions(permissions)
      }).catch((error)=>console.log(error))
  }, [permissions,user]);
  console.log(user);
  return permissions;
};
