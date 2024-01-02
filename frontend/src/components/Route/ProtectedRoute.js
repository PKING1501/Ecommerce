import React, { Fragment } from 'react'
import { useSelector } from 'react-redux'
import { Routes,Route, useNavigate } from 'react-router-dom';

const ProtectedRoute = ({component: Component, ...rest}) => {

    const {loading, isAuthenticated, user} = useSelector((state)=> state.user);
    const navigate = useNavigate();
  return (
    <Fragment>
        {!loading && 
        (
            <Routes>
                <Route
                    {...rest} 
                    render = {(props)=>{ 
                        if(!isAuthenticated){
                            return navigate("/login");
                        }

                        return <Component {...props}/>;
                    }}
                />
            </Routes>
        )}
    </Fragment>
  )
}

export default ProtectedRoute;