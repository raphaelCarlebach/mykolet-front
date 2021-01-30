import axios from 'axios';
import qs from 'querystring';
import React, { Component } from 'react';
import Swal from 'sweetalert2';
import '../css/login.css';

class Login extends Component {
    state = { username: '', password: '' }

    handleChange = (event) => {
        this.setState({ [event.target.name]: [event.target.value] });
    }

    handleClick = (event) => {
        const login_data = {
            username: this.state.username,
            password: this.state.password
        }

        axios.post('https://mykolet-server.herokuapp.com/login', qs.stringify(login_data), {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
        }).then(function (res) {
            if (res.data.status == 200) {
                localStorage.setItem('logged', JSON.stringify(res.data.user_info));
                Swal.fire({
                    title: 'Logged In Successfully!',
                    icon: 'success',
                }).then(function (res) {
                    window.location.href = "https://mykolet-front.herokuapp.com";
                });
            } else {
                Swal.fire({
                    title: 'Error!',
                    text: 'Wrong credentials...',
                    icon: 'error'
                });
            }
        });


    }


    onSuccess = (res) => {
        console.log(res);
    }

    onFailure = (res) => {
        console.log(res);
    }

    render() {
        return (
            <React.Fragment>
                <div className="container">

                    <div className="p-4">
                        <div className="sec1 ">
                            <div className="sec2">
                                <h1> Existing user?</h1>
                                <h4 className="ml-4"> Log-in </h4>
                            </div>

                            <div className="sec3 mt-4">
                                <form>

                                    <div >
                                        <label>Username:</label>

                                        <input type="text" onChange={this.handleChange} name="username" id="username" className="w-25 form-control inplog" />
                                    </div>

                                    <div className="mt-3">
                                        <label>Password:</label>
                                        <input type="password" onChange={this.handleChange} name="password" id="password" className="w-25 form-control inplog"/>
                                    </div>

                                    <div className="mt-4">
                                        <button type="button" onClick={this.handleClick} className="btn btnlog ">Login</button>
                                    </div>
                                </form>
                            </div>

                        </div>


                    </div>




                    {/* <div className="col-6 m-auto">
                        <h1>Login</h1>
                        <form>
                            <p>
                                <label>Username:<br />
                                    <input type="text" onChange={this.handleChange} name="username" id="username" />
                                </label>
                            </p>
                            <p>
                                <label>Password:<br />
                                    <input type="password" onChange={this.handleChange} name="password" id="password" />
                                </label>
                            </p>
                            <p>
                                <button type="button" onClick={this.handleClick} className="btn btn-primary">Login</button>
                            </p>
                        </form>
                    </div> */}

                </div>
            </React.Fragment>
        );
    }
}

export default Login;