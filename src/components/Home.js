import React,{ useState,useEffect} from "react";
import list from "../JsonFiles/listApi.json";
import axios from "axios";
import img_0 from '../components/images/img_1.png';
import img_1 from '../components/images/img_2.png';
import img_2 from '../components/images/img_3.png';
import img_3 from '../components/images/img_4.png';
import img_4 from '../components/images/img_5.png';
import "./common.css";

function Home() {
  const img = [img_0,img_1,img_2,img_3,img_4];
  const [listDetails, setListdetails] = useState(list);

    useEffect(() => {

        axios.get('http://34.93.21.66:3000/api/alpaca/list')
            .then(response => {
              setListdetails(response)
            })
            .catch((error) => {
                console.error(error);
              });
            
    }, []);

  return (
    <div className="home">
      <div className="container">
       <div className="row mt-5">
        <h4>Popular Stocks</h4>
       </div>
       <div className="row mt-3 mb-3">
        <div className="col-md-8 col-sm-10 col-10">COMPANY</div>
        <div className="col-md-4 col-sm-2 col-2">MARKET PRICE</div>
        <div className="col-md-12 col-sm-12 col-12 list">
        {listDetails !== undefined &&
          listDetails.assetInfo.map((items,key) => {
              return (
                  <div className={`row  mt-4 p-3 ${ key < listDetails.assetInfo.length-1 ?  "list-ele" : "" }`}>
                     <div className="col-md-8 col-sm-8 col-8">
                     <img src= {img[key]} alt={items.name} width="35px" className="img-cs" />{items.name}
                     </div> 
                     <div className="col-md-4 col-sm-4 col-4 ">
                       <div>{`${items.current} USD`}</div>
                       <div className={ items.per > 0 ? "text-success" : "text-danger" }>{`${items.diffValue}USD  (${items.per})`}</div>
                     </div>
                  </div>
                  );   
          })}
          <div  className="row  mt-5 mb-5"></div>
        </div>
       </div>
      </div>
    </div>
  );
}

export default Home;