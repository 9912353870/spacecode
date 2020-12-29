import React, { useEffect, useState } from "react";
import list from "../JsonFiles/listApi.json";
import img_0 from "../components/images/img_1.png";
import img_1 from "../components/images/img_2.png";
import img_2 from "../components/images/img_3.png";
import img_3 from "../components/images/img_4.png";
import img_4 from "../components/images/img_5.png";
import CancelIcon from '@material-ui/icons/Cancel';
import AddCircleIcon from '@material-ui/icons/AddCircle';

import axios from "axios";

function Watchlist() {
  const img = [img_0, img_1, img_2, img_3, img_4];
  const [Intialobject, setInitial] = useState([
    {
          "name": "Alphabet Inc. Class A Common Stock",
          "current": 1821.89,
          "diffValue": "+$1.67",
          "diff": "1.67",
          "per": "0.09"
    },
    {
          "name": "Apple Inc. Common Stock",
          "current": 122.06,
          "diffValue": "-$0.54",
          "diff": "-0.54",
          "per": "-0.44"
    }]);
  const [searchlist, setSearchList] = useState([]);

  const data = list.assetInfo;

  const [pkmn] = useState(data);

  
  const searchData = (e) => {
    var queryData = [];
    if (e.target.value !== "") {
      pkmn.forEach(function (person) {
        if (person.name.toLowerCase().includes(e.target.value)) {
          if (queryData.length < 10) {
            queryData.push(person);
          }
        }
      });
    }
    setSearchList(queryData);
  };
  const addToWatchlist = ((val) =>{
    let arr = val;
    let sts = true;
     Intialobject.forEach(function (item) {
      if(item.name === arr.name){
        sts = false;
      }
    })
   sts && setInitial([...Intialobject,arr]);
  })

  const removeToWatchlist = (id) =>{
    let arr = [];
    Intialobject.forEach(function (item,key) {
      if(id !== key){
        arr.push(item);
      }
    })
    
     setInitial(arr);
  }

  const handleApi = () =>{
    axios.get('http://34.93.21.66:3000/api/alpaca/list')
    .then(response => {
      setInitial(response)
    })
    .catch((error) => {
        console.error(error);
      });
  }

  return (
    <div className="about">
      <div className="container">
        <div className="row mt-5" style={{ position: "relative" }}>
          <div className="col-md-10 col-sm-10 col-10">
            <div className="input-group md-form form-sm form-2 pl-0">
              <input
                className="form-control my-0 py-1 red-border"
                type="text"
                placeholder="Search"
                aria-label="Search"
                onChange={(e) => {
                  searchData(e);
                }}
              />
              <div className="input-group-append">
                <span className="input-group-text red lighten-3" id="basic-text1" onClick={() =>{ setSearchList([]); handleApi(); }}>
                  <i className="fa fa-search text-grey" aria-hidden="true"></i>
                </span>
              </div>
            </div>
            <div> <small>Hint:Try searching alpha..!</small></div>
          </div>
          <div
            className={`col-md-10  ${
              searchlist.length ? "card search-popup" : ""
            }`}
          >
            {searchlist.map((items, key) => {
              return (
                <div className={`d-flex p-4 ${ key < searchlist.length-1 ?  "list-ele" : "" }`}>
                  <div className="col-md-7 col-sm-8 col-8">
                    <img src={img[key]} alt={items.name} width="35px" className="img-cs" />
                    {items.name}
                  </div>
                  <div className="col-md-3 col-sm-2 col-2">
                    <div>{`${items.current} USD`}</div>
                    <div
                      className={items.per > 0 ? "text-success" : "text-danger"}
                    >{`${items.diffValue}USD  (${items.per})`}</div>
                  </div>
                  <div className="col-md-2 col-sm-2 col-2">
                    <div onClick={(items)=>{ addToWatchlist(searchlist[key]); }}><AddCircleIcon /></div>
                  </div>
                </div>
              );
            })} 
          </div>
        </div>
        <div className="container pt-4">
        {Intialobject.length > 0 &&
          Intialobject.map((items,key) => {
              return (
                  <div className={`row  mt-3 p-4 ${ key < Intialobject.length-1 ?  "list-ele" : "" }`} >
                     <div className="col-md-7 col-sm-8 col-8">
                     <img src= {img[key]} alt={items.name} width="35px" className="img-cs"/>{items.name}
                     </div>
                     <div className="col-md-3 col-sm-2 col-2">
                       <div>{`${items.current} USD`}</div>
                       <div className={ items.per > 0 ? "text-success" : "text-danger" }>{`${items.diffValue}USD  (${items.per})`}</div>
                     </div>
                     <div className="col-md-2 col-sm-2 col-2">
                     <div onClick={()=>{ removeToWatchlist(key); }}><CancelIcon /></div>
                   </div>
                  </div>
                  );   
          })}
        </div>
        
      </div>
    </div>
  );
}

export default Watchlist;
