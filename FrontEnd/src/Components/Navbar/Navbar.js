import React from 'react'
import { useLocation } from 'react-router-dom'

const Navbar = () => {
    const location = useLocation();
    // console.log(location);

    const doLogout = () => {
        localStorage.removeItem("getEmail");
        localStorage.removeItem("getName");
    }


    return (
        <div>
            {location.pathname === '/' || location.pathname === '/Signup' ?
                <nav className="navbar navbar-expand-lg navbar-dark bg-dark mb-5">
                    <div className="container-fluid mx-lg-5">
                        <a className="navbar-brand" href='/#'>PlacementArena</a>
                    </div>
                </nav>
                :
                <nav className="navbar navbar-expand-lg navbar-dark bg-dark mb-5">
                    <div className="container-fluid mx-lg-5">
                        <a className="navbar-brand" href='/#'>PlacementArena</a>
                    </div>
                    <div className="container-fluid  mx-lg-5 justify-content-end">
                        <a className="navbar-brand" style={{ cursor: "pointer" }} href='/' onClick={doLogout}>Logout 👋</a>
                    </div>
                </nav>
            }

        </div>
    )
}

export default Navbar