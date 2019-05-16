import React, { Component } from 'react';
import axios from 'axios';
import Subscriptiontable from '../components/dashbord/Subscription'
import Spinner from "../components/spinner";




class PaymentPlan extends Component {

  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      items:[],

      tooltipOpen: [false, false],
      tooltips: [
        {
          placement: 'top',
          text: 'Top',
        },
        {
          placement: 'bottom',
          text: 'Bottom',
        },
        {
          placement: 'left',
          text: 'Left',
        },
        {
          placement: 'right',
          text: 'Right',
        },
      ],
    };
    this.toggle = this.toggle.bind(this);
  }
  componentDidMount(){ 
   
    // let user = JSON.parse(sessionStorage.getItem('data'));
    // console.log(user);
    // const token = user;
    // console.log(token);
    let url='http://198.58.110.127/jive-api/api/v1/plans';
    axios.get( url)
    .then(res => {
        console.log(res.data.data);
       this.setState({
        items:res.data.data,
        isLoading: false,
        redirectToReferrer:false
    })
    }).catch(function (response) {
    

          //handle error
          console.log(response.message);
      });
  }
  subscriptionRow(){
    return this.state.items.map(function(object, i){
        return <Subscriptiontable obj={object} key={i} />;
    });
  }
  

  toggle(i) {
    const newArray = this.state.tooltipOpen.map((element, index) => {
      return (index === i ? !element : false);
    });
    this.setState({
      tooltipOpen: newArray,
    });
  }

  render() {
    const { isLoading } = this.state;
return (
    <div>
      <div>
      <h3 className="page-title">
      <span className="page-title-icon bg-gradient-primary text-white mr-2">
        <i className="fa fa-credit-card"></i>                 
      </span>
     Payment
    </h3>
    </div>
      <div style={{textAlign:'center', justifyContent:'center',alignItems:"center"}} className="animated fadeIn">
      

      <h2 className="choose-plan">Choose Your Payment Plan</h2>
       
        {!isLoading ? (
        <div className="animated fadeIn">
        <div className="container">
          <div className="row">
        

           {this.subscriptionRow()} 

         
       
          </div>
        </div>
      </div>
      ) : (
        <div>
        <Spinner />
        <p style={{textAlign:'center', fontFamily:'Ubuntu', fontSize:'15'}}>Please wait...</p>
        </div>
      )}

       
        
      </div>
      </div>
    );
  }
}

export default PaymentPlan;
