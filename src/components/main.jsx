import React, { Component } from "react";
import axios from 'axios';
import '../css/main.css';
import { NavLink, Link } from 'react-router-dom';
import Carousel from 'react-bootstrap/Carousel';
import milkpic from '../images/milk.png'
import webapp from '../images/webapp.png'
import grocerys from '../images/grocerys.png'
import gicons from '../images/gicons.png'
import glist from '../images/glist.png'
import inco from '../images/inco.png'

class Main extends Component {
    state = {}
    render() {
        return (
            <div className="all">

                <Carousel >
                    <Carousel.Item interval={3500} className="slides d-block w-100 ">
                        <div className="slide1">
                            <div>
                                <img src={milkpic} alt="milkpic" className="milkpic ml-5" />
                            </div>

                            <div>

                                <p>Honey, <p className="ml-4">Don't Forget The Milk !!!</p> </p>
                            </div>

                        </div>

                    </Carousel.Item>
                    <Carousel.Item interval={3500}>
                        <div className="slides d-block w-100">

                            <div className="slide2">
                                <div className="welcome ml-4">

                                    <h3> welcome to  <span className="brand">MyKolet</span> web app </h3>

                                    <p> sing-in to create your own grocery-list</p>

                                    <div className="row justify-content-center">
                                        <NavLink className="nav-link btn btn-dark" to="/register">sing-in</NavLink>
                                    </div>

                                </div>
                                <div>
                                    <img src={webapp} alt="webapp" className="webapp mr-4" />
                                </div>


                            </div>
                        </div>

                    </Carousel.Item>
                    <Carousel.Item interval={3500}>
                        <div className="slides d-block w-100">
                            <div className="slide3" >
                                <div>
                                    <img src={grocerys} alt="webapp" className="webapp mr-4" />
                                </div>
                                <div>
                                    <img src={grocerys} alt="webapp" className="webapp mr-4" />
                                </div>
                                <div>
                                    <img src={grocerys} alt="grocerys" className="webapp mr-4" />
                                </div>
                                <div>
                                    <img src={grocerys} alt="grocerys" className="webapp mr-4" />
                                </div>

                            </div>
                        </div>

                    </Carousel.Item>
                </Carousel>

                <div className="container">

                    <div className="artical mt-5 ">
                        {/* <div className="strip1">
                            <img src={gicons} alt="gicons" className="gicons " />
                        </div> */}

                        <div className="strip2 mt-5">
                            <div>
                                <h3>grocery-list </h3>

                                <p>Easily create and manage your grocery lists with friends and family.</p>

                                <div className="mb-2">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="currentColor" className="bi bi-share icon" viewBox="0 0 16 16">
                                        <path d="M13.5 1a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3zM11 2.5a2.5 2.5 0 1 1 .603 1.628l-6.718 3.12a2.499 2.499 0 0 1 0 1.504l6.718 3.12a2.5 2.5 0 1 1-.488.876l-6.718-3.12a2.5 2.5 0 1 1 0-3.256l6.718-3.12A2.5 2.5 0 0 1 11 2.5zm-8.5 4a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3zm11 5.5a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3z" />
                                    </svg>

                                    <span className="ml-4">Share Your List</span>
                                </div>

                                <div className="mb-2">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="currentColor" className="bi bi-list-check icon " viewBox="0 0 16 16">
                                        <path fillRule="evenodd" d="M5 11.5a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5zM3.854 2.146a.5.5 0 0 1 0 .708l-1.5 1.5a.5.5 0 0 1-.708 0l-.5-.5a.5.5 0 1 1 .708-.708L2 3.293l1.146-1.147a.5.5 0 0 1 .708 0zm0 4a.5.5 0 0 1 0 .708l-1.5 1.5a.5.5 0 0 1-.708 0l-.5-.5a.5.5 0 1 1 .708-.708L2 7.293l1.146-1.147a.5.5 0 0 1 .708 0zm0 4a.5.5 0 0 1 0 .708l-1.5 1.5a.5.5 0 0 1-.708 0l-.5-.5a.5.5 0 0 1 .708-.708l.146.147 1.146-1.147a.5.5 0 0 1 .708 0z" />
                                    </svg>

                                    <span className="ml-4">Well organized</span>
                                </div>

                                <div>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="currentColor" className="bi bi-broadcast icon" viewBox="0 0 16 16">
                                        <path d="M3.05 3.05a7 7 0 0 0 0 9.9.5.5 0 0 1-.707.707 8 8 0 0 1 0-11.314.5.5 0 0 1 .707.707zm2.122 2.122a4 4 0 0 0 0 5.656.5.5 0 0 1-.708.708 5 5 0 0 1 0-7.072.5.5 0 0 1 .708.708zm5.656-.708a.5.5 0 0 1 .708 0 5 5 0 0 1 0 7.072.5.5 0 1 1-.708-.708 4 4 0 0 0 0-5.656.5.5 0 0 1 0-.708zm2.122-2.12a.5.5 0 0 1 .707 0 8 8 0 0 1 0 11.313.5.5 0 0 1-.707-.707 7 7 0 0 0 0-9.9.5.5 0 0 1 0-.707zM10 8a2 2 0 1 1-4 0 2 2 0 0 1 4 0z" />
                                    </svg>

                                    <span className="ml-4">Require internet</span>
                                </div>                               
                            </div>

                            <div className="center">
                                <img src={glist} alt="glist" className="glist " />
                            </div>


                        </div>
                    </div>
                </div>

                <div className="strip3 mt-5">
                    <div className="container">
                        <div className="quote ">
                           <div className="row align-items-center">
                                <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="currentColor" className="bi bi-chat-quote" viewBox="0 0 16 16">
                                <path d="M2.678 11.894a1 1 0 0 1 .287.801 10.97 10.97 0 0 1-.398 2c1.395-.323 2.247-.697 2.634-.893a1 1 0 0 1 .71-.074A8.06 8.06 0 0 0 8 14c3.996 0 7-2.807 7-6 0-3.192-3.004-6-7-6S1 4.808 1 8c0 1.468.617 2.83 1.678 3.894zm-.493 3.905a21.682 21.682 0 0 1-.713.129c-.2.032-.352-.176-.273-.362a9.68 9.68 0 0 0 .244-.637l.003-.01c.248-.72.45-1.548.524-2.319C.743 11.37 0 9.76 0 8c0-3.866 3.582-7 8-7s8 3.134 8 7-3.582 7-8 7a9.06 9.06 0 0 1-2.347-.306c-.52.263-1.639.742-3.468 1.105z" />
                                <path d="M7.066 6.76A1.665 1.665 0 0 0 4 7.668a1.667 1.667 0 0 0 2.561 1.406c-.131.389-.375.804-.777 1.22a.417.417 0 0 0 .6.58c1.486-1.54 1.293-3.214.682-4.112zm4 0A1.665 1.665 0 0 0 8 7.668a1.667 1.667 0 0 0 2.561 1.406c-.131.389-.375.804-.777 1.22a.417.417 0 0 0 .6.58c1.486-1.54 1.293-3.214.682-4.112z" />
                            </svg>

                          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Distinctio, ab ratione inventore vero possimus quidem veniam dolores iure suscipit ipsam delectus provident, assumenda perspiciatis corrupti, illum officiis minima cupiditate amet. - <span className="Cookie">Morgan Freeman</span></p>
                           </div>
                           
                           
                           
                        </div>


                    </div>
                </div>
                
               

            </div>

        );
    }
}

export default Main;