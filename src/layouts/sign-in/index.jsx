import React, {useEffect} from 'react'
import { Navigate, useLocation, Outlet } from "react-router-dom";
import '../../asset/css/sign-in.css'
import SignInImage from '../../asset/images/cloud_computing.jpg'
import {Button, Row, Col} from 'reactstrap'

import {loginRequest} from '../../common/authConfig';
import {loginAzure} from '../../slices/authSlice';
import { useIsAuthenticated } from "@azure/msal-react";
import { useMsal } from "@azure/msal-react";

import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import {SetAuthHeader} from '../../api/axios-header'

export function RequireAuth() {
    const auth = useSelector((state) => state.auth)
    let location = useLocation();

    if (!auth.id) {
        // Redirect them to the /login page, but save the current location they were
        // trying to go to when they were redirected. This allows us to send them
        // along to that page after they login, which is a nicer user experience
        // than dropping them off on the home page.
        return <Navigate to="/sign-in" state={{ from: location }} replace />;
      }
      
      SetAuthHeader(auth.token);
      return <Outlet />;
}

export default function SignIn() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const auth = useSelector((state) => state.auth);
    const { instance } = useMsal();
    const isAuthenticated = useIsAuthenticated();

    useEffect(() => {
        if (auth.id) {
          navigate("/portal")
        } else {
          navigate("/sign-in")
        }
      }, [auth?._id, navigate]);

      const handleLogin = () => {
        instance.loginPopup(loginRequest)
                    .then(res => {
                            console.log(res);
                            var responseModel = {
                                token: res.accessToken,
                                name: res.account.name,
                                email : res.account.username,
                                id : res.account.idTokenClaims.oid,
                                expires: res.expiresOn
                            };
                            dispatch(loginAzure(responseModel))
                            navigate("/portal");
                        })
                        .catch(e => {
                            console.error(e);
                        })
      }

  return (
    <div className="Auth-form-container">
        <div className="Auth-form">
            <Row xs="2" style={{height: '500px', paddingTop: '100px', paddingBottom: '100px'}}>
                <Col>
                    <div className="Auth-form-content">
                    <h3 className="Auth-form-title">Amazing Energy Management System</h3>
                    <div className="d-grid gap-2 mt-3">
                        <Button color="dark" style={{paddingLeft: '0px', paddingRight: '0px'}} onClick={handleLogin} >
                            <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width={48} height={48} viewBox="0 0 172 172" style={{fill: '#000000'}}><g fill="none" fillRule="nonzero" stroke="none" strokeWidth={1} strokeLinecap="butt" strokeLinejoin="miter" strokeMiterlimit={10} strokeDasharray="true" strokeDashoffset={0} fontFamily="none" fontWeight="none" fontSize="none" textAnchor="none" style={{mixBlendMode: 'normal'}}><path d="M0,172v-172h172v172z" fill="none" /><g><path d="M78.83333,78.83333l-57.33333,0l0,-57.33333l57.33333,0z" fill="#ff5722" /><path d="M150.5,78.83333h-57.33333v-57.33333h57.33333z" fill="#4caf50" /><path d="M150.5,150.5h-57.33333l0,-57.33333l57.33333,0z" fill="#ffc107" /><path d="M78.83333,150.5h-57.33333v-57.33333h57.33333z" fill="#03a9f4" /></g><g fill="#cccccc"><path d="M99.195,68.94v3.7h-10.97v30.42h-4.48v-30.42h-10.94v-3.7z" /></g></g></svg>
                            Sign in with your organization
                        </Button>
                    </div>
                </div>
                </Col>
                <Col>
                    <div className="bg-image" style={{backgroundImage: `url(${SignInImage})`, height: '100%', width: '100%'}}> </div>
                </Col>
            </Row>
        </div>
    </div>
  )
}
