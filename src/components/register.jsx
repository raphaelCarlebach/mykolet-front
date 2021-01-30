import React, { Component } from 'react';
import Joi from 'joi-browser';
import axios from 'axios';
import qs from 'querystring';
//import { toast } from 'react-toastify';
import Swal from 'sweetalert2';

class Register extends Component {
    state = { username: '', email: '', phone: '', password: '' }

    joiSchema = {
        username: Joi.string().required(),
        email: Joi.string().email().required(),
        phone: Joi.string().min(9).max(10),
        password: Joi.string().min(1).required(),
    }

    handleChange = (event) => {
        this.setState({ [event.target.name]: event.target.value });
    }

    handleClick = (event) => {
        event.preventDefault();

        const our_data = {
            username: this.state.username,
            email: this.state.email,
            password: this.state.password,
        }

        const valid = Joi.validate(our_data, this.joiSchema, {
            abortEarly: false
        });

        if (valid.error) {
            console.log(valid.error);

            valid.error.details.forEach(err => {
                console.log(err.message);
            })
            return;
        } else {
            axios.post('https://mykolet-server.herokuapp.com/register', qs.stringify(our_data), {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
            }).then(function (res) {
                //toast.success('Registered Successfully');
                Swal.fire({
                    title: 'Registered Successfully!',
                    icon: 'success',
                }).then(function (res) {
                    window.location.href = "https://mykolet-front.herokuapp.com/login";
                });
            }).catch(error => {
                //toast.error('Email already in use');
                Swal.fire({
                    title: 'Error!',
                    text: 'Email already in use',
                    icon: 'error'
                });
            });
        }
    }

    render() {
        return (
            <React.Fragment>
                <div className="container">


                    <div className="p-4">
                        <div className="sec1 ">
                            <div className="sec2">
                            <h1>Register</h1>
                                <h4 className="ml-4"> sing-in </h4>
                            </div>

                            <div className="sec3 mt-4">
                                <form>

                                    <div >
                                        <label>Username:</label>

                                        <input type="text" onChange={this.handleChange} name="username" id="username" className="w-25 form-control inplog" />
                                    </div>

                                    <div className="mt-3">
                                        <label>Email:</label>
                                        <input type="email" onChange={this.handleChange} name="email" id="email" className="w-25 form-control inplog" />
                                    </div>

                                    <div className="mt-3">
                                        <label>Password:</label>
                                        <input type="password" onChange={this.handleChange} name="password" id="password" className="w-25 form-control inplog" />
                                    </div>

                                    <div className="mt-4">
                                        <button type="button" onClick={this.handleClick} className="btn btnlog ">Register</button>
                                    </div>
                                </form>
                            </div>

                        </div>
                    </div>





                    {/* <div className="col-6 m-auto">
                        <h1>Register</h1>
                        <form>
                            <p>
                                <label>Username:<br />
                                    <input type="text" onChange={this.handleChange} name="username" id="username" />
                                </label>
                            </p>
                            <p>
                                <label>Email:<br />
                                    <input type="email" onChange={this.handleChange} name="email" id="email" />
                                </label>
                            </p>

                            <p>
                                <label>Password:<br />
                                    <input type="password" onChange={this.handleChange} name="password" id="password" />
                                </label>
                            </p>
                            <p>
                                <button onClick={this.handleClick} className="btn btn-primary">Register</button>
                            </p>
                        </form>
                    </div> */}

                    
                </div>
            </React.Fragment>
        );
    }
}

export default Register;