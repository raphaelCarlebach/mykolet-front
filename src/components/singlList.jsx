import React, { Component } from "react";
import axios from 'axios';
import Swal from 'sweetalert2';
import '../css/singlList.css';
import $ from "jquery";


class SinglList extends Component {
    state = { counter: 1, products: [], productinput: "", list: [], lastID: 0, sItems: [], autocompleteOpsions: [] };

    componentDidMount() {
        // todo if
        let urlid = this.props.location.search.split('=').pop()

        // console.log('urlid -', urlid);              
        // console.log(this.props.location.pathname)

        var list = this.props.location.state;
        this.setState({ list });


        if (!urlid) {
            var list_id = list._id
        } else {
            var list_id = urlid
        }

        var self = this;

        axios.get('https://mykolet-server.herokuapp.com/singelLists', { params: { list_id } })
            .then(function (res) {
                console.log(res.data[0].items);
                self.setState({ products: res.data[0].items });

            }).catch(error => {
                console.log(error)
            });


        // var sItems = this.state.sItems; 
        var self = this;

        axios.get('https://mykolet-server.herokuapp.com/search')
            .then(function (res) {
                //   console.log(res.data);  
                self.setState({ sItems: res.data });

            }).catch(error => {
                console.log(error)
            });



    }

    counterP = (product, index) => {
        // alert("item" + index)
        var products = [...this.state.products];
        products[index].quantity++;
        this.setState({ products });
        this.saveQ(product, index);
    }

    counterM = (product, index) => {
        var products = [...this.state.products];
        if (products[index].quantity <= 0) {
            // do nothing
        } else {
            products[index].quantity--;
        };

        this.setState({ products });

        this.saveQ(product, index);

    }


    saveQ = (product, index) => {
        // alert(product.title +" " + index)
        var list = this.state.list;

        
        if (!list) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                html: '<P><b>is not your list to edit...</b></P> <P><b>You Can Look But Cant Touch</b></P>',
            })
        } else{
           let data = {
            list_id: list._id,
            title: product.title,
            quantity: product.quantity

        };
        // console.log(data)

        axios.post('https://mykolet-server.herokuapp.com/updateQuantity', data)
            .then(function (res) {
                console.log(res);
            }).catch(error => {
                console.log(error)
            }); 
        }

        
    }

    ChangeInputValue = ({ target: { value } }) => {
        this.setState({ productinput: value });

        let inputVal = this.state.productinput;
        let sItems = this.state.sItems;
        let result = sItems.filter(item => item.ItemName.toLowerCase().toUpperCase().startsWith(inputVal));
        let autocompleteOpsions = result.slice(0, 15);
        this.setState({ autocompleteOpsions: autocompleteOpsions });

        $(".autocomplete").css("display", "block");

    }

    // generateId = () =>{
    //    var pid = this.state.lastID;
    //    pid++;
    //    this.setState({pid});
    //    console.log({pid})
    // }

    addToinput = (opsion) => {
        this.setState({ productinput: opsion.ItemName });
        document.getElementById("mainInput").value = opsion.ItemName;

        $(".autocomplete").css("display", "none");

    }

    closeauto = () => {
        $(".autocomplete").css("display", "none");
    }

    onSubmitForm = (e) => {
        var lastID = this.state.lastID;
        lastID++;
        this.setState({ lastID });
        // console.log({lastID})

        e.preventDefault();
        const { productinput } = this.state;
        // console.log({productinput});
        var products = [...this.state.products];
        // todo id: last id+1
        products.push({ pid: lastID, title: productinput, quantity: 1, isChecked: false });
        this.setState({ productinput: "" });
        document.getElementById("mainInput").value = "";
        // console.log(products);
        this.setState({ products: products });
        console.log(products);

        var list = this.state.list;

        
        if (!list) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                html: '<P><b>is not your list to edit...</b></P> <P><b>You Can Look But Cant Touch</b></P>',
            })
        } else{
            let data =
        {
            list_id: list._id,
            pid: lastID,
            isChecked: false,
            title: productinput,
            quantity: 1
        };

        console.log(data)

        axios.post('https://mykolet-server.herokuapp.com/addProdToLlist', data)
            .then(function (res) {
                console.log(res);
            }).catch(error => {
                console.log(error)
            }); 
        }

       

    };

    toogleCheck = (product, index) => {
        var products = [...this.state.products];
        products[index].isChecked = !products[index].isChecked;
        this.setState({ products });
        var list = this.state.list;
        var status = product.isChecked

        if (!list) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                html: '<P><b>is not your list to edit...</b></P> <P><b>You Can Look But Cant Touch</b></P>',
            })
        } else {

            let data = {
                list_id: list._id,
                title: product.title,
                isChecked: status
            };
            console.log(data)

            axios.post('https://mykolet-server.herokuapp.com/updateToogleCheck', data)
                .then(function (res) {
                    console.log(res);
                }).catch(error => {
                    console.log(error)
                });
        }



    }

    itemDel = (product, index) => {
        var products = [...this.state.products];

        var self = this;

        var list = this.state.list;

        if (!list) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                html: '<P><b>is not your list to edit...</b></P> <P><b>You Can Look But Cant Touch</b></P>',
            })
        } else {
            let data =
            {
                list_id: list._id,
                title: product.title,

            };

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
                    axios.post('https://mykolet-server.herokuapp.com/delete_prod', data)
                        .then(function (res) {
                            Swal.fire({
                                title: 'item Deleted Successfully!',
                                icon: 'success',
                            });


                            products.splice(index, 1);
                            self.setState({ products });

                        });
                }
            })
        }


    }

    //  כללי מידי עושה באגים של שכפולים - הפרד ומשול  
    // saveList = () => {
    //     var products = this.state.products
    //     var list = this.state.list;
    //     console.log(list._id)


    //     products.forEach(product => {

    //         let data =
    //         {
    //             list_id: list._id,
    //             pid: product.pid,
    //             isChecked: product.isChecked,
    //             title: product.title,
    //             quantity: product.quantity
    //         };

    //         console.log(data)

    //         axios.post('https://mykolet-server.herokuapp.com/updateList', data)
    //             .then(function (res) {
    //                 console.log(res);
    //             }).catch(error => {
    //                 console.log(error)
    //             });
    //     });

    // }





    render() {
        var products = this.state.products
        var list = this.props.location.state;
        var items = this.state.sItems;

        var inputLen = this.state.productinput.length;

        if (inputLen == 0) {
            $(".autocomplete").css("display", "none");
        };



        var opsions = this.state.autocompleteOpsions;
        console.log(opsions)


        return (
            <React.Fragment>
                <div className="wrapper" onClick={() => this.closeauto()}>

                    <div className="lname mt-4 center p-4">
                        <div className="container">

                            <div>

                                <form className="my-2 form-inline d-flex justify-content-center md-form form-sm mt-0" onSubmit={this.onSubmitForm} >

                                    <input className=" w-50"
                                        id="mainInput" placeholder="tell me what you wish for..." onChange={this.ChangeInputValue} />


                                    <button className="btn" type="submit"><svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="black" className="bi bi-clipboard-plus" viewBox="0 0 16 16">
                                        <path fillRule="evenodd" d="M8 7a.5.5 0 0 1 .5.5V9H10a.5.5 0 0 1 0 1H8.5v1.5a.5.5 0 0 1-1 0V10H6a.5.5 0 0 1 0-1h1.5V7.5A.5.5 0 0 1 8 7z" />
                                        <path d="M4 1.5H3a2 2 0 0 0-2 2V14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V3.5a2 2 0 0 0-2-2h-1v1h1a1 1 0 0 1 1 1V14a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V3.5a1 1 0 0 1 1-1h1v-1z" />
                                        <path d="M9.5 1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1-.5-.5v-1a.5.5 0 0 1 .5-.5h3zm-3-1A1.5 1.5 0 0 0 5 1.5v1A1.5 1.5 0 0 0 6.5 4h3A1.5 1.5 0 0 0 11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3z" />
                                    </svg> </button>
                                </form>
                            </div>

                        </div>

                    </div>





                    <div className="col-9 mx-auto ">
                        <div className="d-flex justify-content-center">
                            <div className="autocomplete ">


                                {opsions.length > 0 ? (<span></span>)
                                    : (<div className="autocomplete-item"> no results... </div>)}

                                {opsions.map((opsion, index) => (
                                    <div className="">
                                        <div key={opsion._id} onClick={() => this.addToinput(opsion)} className="autocomplete-item"><a >{opsion.ItemName}</a> </div>

                                        <hr className="ophr" />
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="card my-4">

                            <div className="card-body">
                                <table className="table">
                                    <thead>
                                        <tr>
                                            <th scope="col">#</th>
                                            <th scope="col">title</th>
                                            <th scope="col">quantity</th>
                                            <th scope="col">check / del</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {products.map((product, index) =>
                                            <tr key={product.title}>
                                                <th scope="row">{index + 1}</th>

                                                {product.isChecked ? (
                                                    <td className="title"><del>{product.title}</del></td>
                                                ) : (
                                                        <td className="title"> {product.title} </td>
                                                    )}

                                                <td className="d-flex justify-content-center">
                                                    <button className="btn" onClick={() => this.counterM(product, index)}><svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" fill="currentColor" className="bi bi-dash title" viewBox="0 0 16 16">
                                                        <path d="M4 8a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7A.5.5 0 0 1 4 8z" />
                                                    </svg></button>

                                                    <span className="mx-4 my-auto quantity title" onChange={this.saveQ}> {product.quantity} </span>

                                                    <button className="btn " onClick={() => this.counterP(product, index)}><svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" fill="currentColor" className="bi bi-plus title" viewBox="0 0 16 16">
                                                        <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z" />
                                                    </svg></button>
                                                </td>
                                                <td>
                                                    <button className="btn" onClick={() => this.toogleCheck(product, index)}>
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" fill="currentColor" className="bi bi-check2 title" viewBox="0 0 16 16">
                                                            <path d="M13.854 3.646a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L6.5 10.293l6.646-6.647a.5.5 0 0 1 .708 0z" />
                                                        </svg>
                                                    </button>
                                                    <span className="my-auto">
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" fill="currentColor" className="bi bi-slash" viewBox="0 0 16 16">
                                                            <path d="M11.354 4.646a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708l6-6a.5.5 0 0 1 .708 0z" />
                                                        </svg>
                                                    </span>
                                                    <button className="btn" onClick={() => this.itemDel(product, index)}>
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" fill="currentColor" className="bi bi-x title" viewBox="0 0 16 16">
                                                            <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" />
                                                        </svg>
                                                    </button>

                                                </td>
                                            </tr>
                                        )}


                                    </tbody>
                                </table>

                                {/* <div>
                                <button className="btn btn-success" onClick={this.saveList}> save list </button>                                
                            </div> */}

                            </div>
                        </div>
                    </div>
                </div>


            </React.Fragment>
        );
    }
}

export default SinglList;