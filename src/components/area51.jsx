import React, { Component } from "react";
import { ReactSearchAutocomplete } from 'react-search-autocomplete';
import axios from 'axios';
import {Autocomplete} from 'react-autocomplete';
import '../css/bla.css';


class Tests extends Component {
    state = {sItems: []  }

    componentDidMount() {

      var sItems = this.state.sItems; 
      var self = this;     
     
      axios.get('https://mykolet-server.herokuapp.com/search')
          .then(function (res) {
            console.log(res.data);  
            self.setState({ sItems: res.data});              
                      
          }).catch(error => {
              console.log(error)
          });    
          
          
  }

     handleOnSearch = (string, cached) => {
        // onSearch returns the string searched and if
        // the values are cached. If the values are cached
        // "cached" contains the cached values, if not, returns false
        console.log(string, cached)
      }
    
       handleOnSelect = (item) => {
        // the item selected
        console.log(item)
      }
    
       handleOnFocus = () => {
        console.log('Focused')
      }

    render() { 

      
        // arr = [
        //     {id: 0, name: 'Cobol' },
        //     {id: 1, name: 'JavaScript'},
        //     {id: 2,name: 'Basic'},
        //     { id: 3,name: 'PHP'},
        //     { id: 4, name: 'Java'}
        // ];
        
        var arr = this.state.sItems
        var items = arr
        console.log(items)
        
       
         return ( 
            <div className="App">
         
              <div style={{ width: 400 }}>
                <ReactSearchAutocomplete                
                  items={items}
                  onSearch={this.handleOnSearch}
                  onSelect={this.handleOnSelect}
                  onFocus={this.handleOnFocus}
                  fuseOptions={{ keys: ["_id","ItemName"] }}
                  resultStringKeyName={"ItemName"}
                  autoFocus
                  
                />
              </div>
              
              {/* <div>
              {items.map((item) =>
                  <div> {item.ItemName}</div>
               )}
              </div> */}
              
              <input className="form-control" list="datalistOptions" id="exampleDataList" placeholder="Type to search..."/>
              <datalist id="datalistOptions">
              {items.map((item) =>
                   <option value={item.ItemName}/>
               )}
                
            </datalist>

              <p className="bla"> blablalba</p>

             
            

          
          </div>
         );
    }
}
 
export default Tests;