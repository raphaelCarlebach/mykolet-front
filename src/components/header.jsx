import React, { Component } from 'react';
import { NavLink, Link } from 'react-router-dom';
import '../css/header.css';
import Swal from 'sweetalert2';


class Header extends Component {
    state = {}

    logoutFunc = () => {

        Swal.fire({
            title: 'Are you sure?',           
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes',
            cancelButtonText: 'No',
          }).then((result) => {
            if (result.isConfirmed) {
                localStorage.clear();
                window.location.href = "https://mykolet-front.herokuapp.com/login";
            }
          })
        
        // localStorage.clear();
        // back to login
    };

    render() {
        var { user } = this.props;
        var token = '';
        if (user) {
            token = user.token;
            var username = user.user_info.username;
        }

        return (
            <React.Fragment>
                <nav id="up" className="navbar navbar-expand-lg navbar-light ">
                    <Link className="nav-link logo" to="/">
                        MyKolet
                    </Link>

                    <button className="navbar-toggler  " type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon ">

                      

                        </span>
                    </button>

                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav mr-auto">
                            <li className="nav-item ">
                                <NavLink className="nav-link " to="/">
                                    Home <span className="sr-only">(current)</span>
                                </NavLink>
                            </li>

                            {token && (
                                <li className="nav-item">
                                    <NavLink className="nav-link " to="/profile">
                                        My Profile
                                </NavLink>
                                </li>

                            )}
                        </ul>
                        {token
                            ? <ul className="my-2 my-lg-0 navbar-nav">
                                <li>
                                    <NavLink className="nav-link hellouser " to="/profile">Hello {username}</NavLink>
                                </li>
                                <li>
                                    <a href="#" className="nav-link" onClick={() => this.logoutFunc()}> <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="rgb(12, 177, 177)" className="bi bi-door-open-fill" viewBox="0 0 16 16">
                                        <path d="M1.5 15a.5.5 0 0 0 0 1h13a.5.5 0 0 0 0-1H13V2.5A1.5 1.5 0 0 0 11.5 1H11V.5a.5.5 0 0 0-.57-.495l-7 1A.5.5 0 0 0 3 1.5V15H1.5zM11 2h.5a.5.5 0 0 1 .5.5V15h-1V2zm-2.5 8c-.276 0-.5-.448-.5-1s.224-1 .5-1 .5.448.5 1-.224 1-.5 1z" />
                                    </svg> </a>
                                </li>
                            </ul>
                            : <ul className="my-2 my-lg-0 navbar-nav">
                                <li className="nav-item">
                                    <NavLink className="nav-link" to="/login">Login</NavLink>
                                </li>
                                <li className="nav-item">
                                    <NavLink className="nav-link" to="/register">sing-in</NavLink>
                                </li>
                            </ul>
                        }
                    </div>
                </nav>
            </React.Fragment>
        );
    }
}

export default Header;