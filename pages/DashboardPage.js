// @flow
import React from 'react';
import '../images/_misc.css'
import circle from '../images/circle.svg'
 import Library from '../library/Library';
import axios from 'axios'
import Eventdashboard from '../components/dashbord/EventDashboard'
import WalletHistory from '../components/dashbord/Walletdashboard'
import Spinner from "../components/spinner";




var saved = Library.getData('data')

console.log(saved)



export default class Home extends React.Component{

  constructor(props) {
        super(props);
    
        this.state = {
          balance:"",
          verified_invite:"",
          events_created:"",
          links_created:'',
          items:[],
          wallet:[],
          isLoading: true,
        };
      }

    componentDidMount(){ 
      
    if(Library.getData('oauth-token'))
    {
    
    axios.get("http://198.58.110.127/jive-api/api/v1/user/authorize", { headers: {"Authorization" :Library.getData("oauth-token")} })
    .then(res => {
        
        let data = res.data.message.details;
        Library.setData('data',JSON.stringify(res.data.message.details))
        console.log(res);


    this.setState({
        fname:data.fname,
        lname:data.lname,
        username:data.username,
        email:data.email,
        balance:data.balance,
        verified_invite:data.verified_invite,
        events_created:data.events_created,
        links_created:data.links_created,
        items:data.events,
        wallet:data.wallet_history,
        isLoading:false
        
        

    })
    }).catch(error => this.setState({
       error,
       isLoading: false 
      
    }));
   

}

}
tabRow(){
  return this.state.items.map(function(object, i){
      return <Eventdashboard obj={object} key={i} />;
  });
}
walletRow(){
  return this.state.wallet.map(function(object, i){
      return <WalletHistory  obj={object} key={i} />;
  });
}


  


  render(){
    const { isLoading } = this.state;


    return(
      <div className="main-panel">
      <div className="content-wrapper">
    <div className="page-header">
  <h3 className="page-title">
  <span className="page-title-icon bg-gradient-primary text-white mr-2">
    <i className="fa fa-home"></i>                 
  </span>
  Dashboard
</h3>
</div>
<div className="row">
                    <div className="col-md-3 stretch-card grid-margin">
                        <div className="card bg-gradient-info card-img-holder text-white">
                            <div className="card-body">
                                <img src={circle} className="card-img-absolute"
                                     alt=""/>
                                <h4 className="font-weight-normal mb-3">Wallet Balance
                                    <i className="fa fa-google-wallet mdi-18px float-right"></i>
                                </h4>
                                <h2 className="mb-5">{this.state.balance||0}</h2>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-3 stretch-card grid-margin">
                        <div className="card bg-gradient-danger card-img-holder text-white">
                            <div className="card-body">
                            <img src={circle} className="card-img-absolute"
                                     alt=""/>
                                <h4 className="font-weight-normal mb-3">Verified Invite
                                    <i className="fa fa-external-link mdi-18px float-right"></i>
                                </h4>
                                <h2 className="mb-5">{this.state.verified_invite || 0}</h2>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-3 stretch-card grid-margin">
                        <div className="card bg-gradient-success card-img-holder text-white">
                            <div className="card-body">
                                <img src={circle} className="card-img-absolute"
                                     alt=""/>
                                <h4 className="font-weight-normal mb-3">Event Created
                                    <i className="fa fa-calendar mdi-24px float-right"></i>
                                </h4>
                                <h2 className="mb-5"> {this.state.events_created || 0}</h2>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-3 stretch-card grid-margin">
                        <div class="card bg-gradient-primary card-img-holder text-white">
                            <div class="card-body">
                                <img src={circle} class="card-img-absolute"
                                     alt=""/>
                                <h4 class="font-weight-normal mb-3"> Link Created
                                    <i class="fa fa-external-link-square mdi-18px float-right"></i>
                                </h4>
                                <h2 class="mb-5">{this.state.links_created || 0}</h2>
                            </div>
                        </div>
                    </div>
                </div>
           
                
<div class="row">
  <div class="col-12 grid-margin">
    <div class="card">
      <div class="card-body">
        <h4 class="card-title">Recent Event</h4>
        <div class="table-responsive">
        {!isLoading ? (
          <table class="table">
            <thead>
              <tr>
                <th style={{fontSize:"20px",fontFamily:"Ubuntu"}}>
                  Logo
                </th>
                <th style={{fontSize:"20px",fontFamily:"Ubuntu"}}>
                  Event
                </th>
                <th style={{fontSize:"20px", fontFamily:"Ubuntu"}}>
                  Start Date
                </th>
                <th style={{fontSize:"20px" ,fontFamily:"Ubuntu"}}>
                  End Date
                </th>
                <th style={{fontSize:"20px", fontFamily:"Ubuntu"}}>
                Action
              </th>
              </tr>
            </thead>
            
             <tbody> {this.tabRow()}</tbody>

          
          </table>
          ) : (
            <div>
            <Spinner />
            <p style={{textAlign:'center',  fontFamily:'Ubuntu',}}>Please wait...</p>
            </div>
          )}
        </div>

      </div>
    </div>
  </div>
</div>
 <div class="row">
    <div class="col-12 grid-margin stretch-card">
        <div class="card">
            <div class="card-body">
                <h4 class="card-title">Wallet History</h4>
                <div class="table-responsive">
                {!isLoading ? (

                    <table class="table">
                      <thead>
                        <tr>
                          <th style={{fontSize:"20px",fontFamily:"Ubuntu"}}>
                           Reference
                          </th>
                          <th style={{fontSize:"20px", fontFamily:"Ubuntu"}}>
                            Description
                          </th>
                          <th style={{fontSize:"20px",fontFamily:"Ubuntu"}}>
                           Type
                          </th>
                          <th style={{fontSize:"20px",fontFamily:"Ubuntu"}}>
                          Unit worth
                          </th>
                          <th style={{fontSize:"20px",fontFamily:"Ubuntu"}}>
                         Amount Paid
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        
                      {this.walletRow()}
                    </tbody>
                </table>
                ) : (
                  <div>
                  <Spinner />
                  <p style={{textAlign:'center', fontFamily:'Ubuntu'}}>Please wait...</p>
                  </div>
                )}
                </div>
            </div>
            </div>
        </div>
    </div>
 
</div>
</div>


    )
  }
}
