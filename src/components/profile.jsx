import React, { Component } from 'react';
import { NavLink, Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import qs from 'querystring';
import axios from 'axios';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import '../css/profile.css';


class Profile extends Component {
    state = { user_info: '', lists: [] }

    componentWillMount() {
        var logged = localStorage.getItem('logged');
        this.setState({ user_info: logged });
    }

    addNewList = (event) => {
        var info = this.state.user_info;
        var jsoned = JSON.parse(info);
        var user_id = jsoned.user_info._id;

        var self = this;

        Swal.fire({
            title: 'New list Title',
            input: 'text',
            showCancelButton: true,
            inputValidator: (value) => {
                if (!value) {
                    return 'Please type in list title!'
                }
            }
        }).then(function (res) { // Result from SweetAlert2
            if (res.isConfirmed) {
                var list_title = res.value;

                const our_data = {
                    title: list_title,
                    user_id: user_id
                }

                axios.post('https://mykolet-server.herokuapp.com/new_list', qs.stringify(our_data), {
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded'
                    },
                }).then(function (res) { // Result from NodeJS
                    var new_list_id = res.data._id;
                    Swal.fire({
                        title: 'list Created Successfully!',
                        icon: 'success',
                    }).then(function (result) {  // Result from SweetAlert2
                        var new_lists = self.state.lists;
                        new_lists.push({
                            _id: new_list_id,
                            title: list_title
                        });
                        self.setState({
                            lists: new_lists
                        });
                    });
                }).catch(error => {
                    Swal.fire({
                        title: 'Error!',
                        text: 'list already exists',
                        icon: 'error'
                    });
                });

            }
        });
        // console.log(this.state.lists);


    };

    componentDidMount() {
        var info = this.state.user_info;
        var jsoned = JSON.parse(info);
        var user_id = jsoned.user_info._id;

        var self = this;

        axios.get('https://mykolet-server.herokuapp.com/userLists', { params: { user_id: user_id } })
            .then(function (res) {
                // console.log(res.data.lists);
                self.setState({ lists: res.data.lists });
                // console.log(res.data.lists.length)
              
            }).catch(error => {
                console.log(error)
            });

           
    }

    listDel(listId, listIndex) {
        const our_data = {
            list_id: listId
        }

        var self = this;

        Swal.fire({
            title: 'Are you sure?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes'
        }).then((result) => {
            console.log(result);
            if (result.isConfirmed) {
                axios.post('https://mykolet-server.herokuapp.com/delete_list', qs.stringify(our_data), {
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded'
                    },
                }).then(function (res) {
                    Swal.fire({
                        title: 'list Deleted Successfully!',
                        icon: 'success',
                    });

                    var new_lists = self.state.lists;

                    new_lists.splice(listIndex, 1);

                    /* new_playlists = new_playlists.filter(function(obj) {
                        return obj._id !== playlistId;
                    }); */

                    self.setState({
                        lists: new_lists
                    });

                });
            }
        })
    }

    shareBtn = (list) => {

        console.log(list)

        var link = "https://mykolet-front.herokuapp.com/singlList/?id=" + list._id

        Swal.fire({
            title: list.title,
            html: '<p><b> link successfully copied to clipboard </b></p>' + '<p><a href=' + link + '>' + link + ' </a></p>',
            focusConfirm: false,
            confirmButtonText:
                ' Great!',

        })
    }



    render() {
        var lists = this.state.lists;
        console.log(lists.length);
      

        return (
            <React.Fragment>
                <div className="profile" >
                    <div className="mt-4 coteret center">
                        <h2 className="center ">- my lists -</h2>
                    </div>

                    <div className="plus">
                        <div className="btn blue center" onClick={this.addNewList}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" fill="currentColor" className="blue bi bi-plus" viewBox="0 0 16 16">
                                <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z" />
                            </svg></div>
                    </div>

                    <div className="container-fluid">
                        <div className="container">
                            <div id="content" className="lists w-100">                               

                                { lists.length > 0 ? (<span></span>)                                
                                : (<div> no list record has been found please prees the + button to begin </div>)}

                                { lists.map((list, index) => ( 

                                    <div className="box " key={list._id}>

                                      <div className="row inner-box justify-content-between">
                                          <div className="row">
                                              <Link className="nav-link list-title" to={{ pathname: "/singlList/?id=" + list._id, state: list }}
                                              >
                                                  <h3>{list.title}</h3>
                                              </Link>
                                              <div className=" row align-items-end date">
                                                  <h6 >{list.date}</h6>
                                              </div>
                                          </div>
     
                                          <div className=" row align-items-end more">
                                              <div className="btn-group dropright">
                                                  <button type="button" className="btn  " data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
     
                                                      <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="currentColor" className="bi bi-three-dots-vertical" viewBox="0 0 16 16">
                                                          <path d="M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z" />
                                                      </svg>
                                                  </button>
                                                  <div className="dropdown-menu">
     
                                                      <div className="btn dropdown-item"  >
                                                          <CopyToClipboard text={"https://mykolet-front.herokuapp.com/singlList/?id=" + list._id}
                                                              onCopy={() => this.shareBtn(list)}>
     
                                                              <button className="dropdown-item btn" >
                                                                  <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="currentColor" className="bi bi-person-plus-fill mr-1" viewBox="0 0 16 16">
                                                                      <path d="M1 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H1zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" />
                                                                      <path fillRule="evenodd" d="M13.5 5a.5.5 0 0 1 .5.5V7h1.5a.5.5 0 0 1 0 1H14v1.5a.5.5 0 0 1-1 0V8h-1.5a.5.5 0 0 1 0-1H13V5.5a.5.5 0 0 1 .5-.5z" />
                                                                  </svg>
                                                                 Share
                                                        </button>
     
                                                          </CopyToClipboard>
                                                      </div>
     
                                                      <div className="dropdown-divider "></div>
     
                                                      <div className="btn dropdown-item"  >
                                                          <button className=" btn " onClick={() => this.listDel(list._id, index)}> <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-file-earmark-x-fill mr-1" viewBox="0 0 16 16">
                                                              <path d="M9.293 0H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V4.707A1 1 0 0 0 13.707 4L10 .293A1 1 0 0 0 9.293 0zM9.5 3.5v-2l3 3h-2a1 1 0 0 1-1-1zM6.854 7.146L8 8.293l1.146-1.147a.5.5 0 1 1 .708.708L8.707 9l1.147 1.146a.5.5 0 0 1-.708.708L8 9.707l-1.146 1.147a.5.5 0 0 1-.708-.708L7.293 9 6.146 7.854a.5.5 0 1 1 .708-.708z" />
                                                          </svg> Delete</button>
                                                      </div>
                                                  </div>
                                              </div>
                                          </div>
     
                                      </div>
                                  </div>

                                                            
                                 
                                  
                             ))}

                    </div>
                        </div>


                    </div>
                </div>
            </React.Fragment>
        );
    }


}

export default Profile;