import React, { Component } from 'react';
import {
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Col,
  Form,
  FormGroup,
  Input,
  Label,
  Row,
} from 'reactstrap';
import axios from 'axios';
import Library from '../library/Library'
import Button from '@material-ui/core/Button';
import Spinner from "../components/spinner";



class Forms extends Component {
  constructor(props) {
    super(props);
    console.log(props)
    this.toggle = this.toggle.bind(this);
    this.toggleFade = this.toggleFade.bind(this);
    this.state = {
      collapse: true,
      fadeIn: true,
      timeout: 300,
      isLoading: true,
      name : '' ,
      description : '',
      start_date:'',
      end_date:'',
      logo:'',
      max_usage:'',
      redirectToReferrer:false,
      token:'',
       active:null,
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  toggle() {
    this.setState({ collapse: !this.state.collapse });
  }
  fileChangedHandler = event => {
    this.setState({ logo: event.target.files[0] })
  }
  handleChange(event){
    this.setState({
        [event.target.name] : event.target.value
        
  });
  }

  componentDidMount(){ 
    if(Library.getData('oauth-token'))
    {
    // let user = JSON.parse(sessionStorage.getItem('data'));
    // console.log(user);
    // const token = user;
    // console.log(token);
    let url = 'http://198.58.110.127/jive-api/api/v1/events/'+this.props.match.params.eventID+'/details'
    axios.get( url, { headers: {"Authorization" :Library.getData("oauth-token")} })
    .then(res => {
        console.log(res);
    let data = res.data.message.details;
    this.setState({
        name:data.name,
        description: data.description,
        start_date: data.start_date,
        end_date: data.end_date,
        max_usage:data.max_usage,
        isLoading: false,
        redirectToReferrer: false
    })
    }).catch(error => {
      console.log(error);
    });
  }

}

  

  handleSubmit =()=>{
    document.getElementById("buttonShipper").innerHTML = "Updating Event...";


    const user = {
    name : this.state.name,
    description : this.state.description,
    start_date:this.state.start_date,
    end_date:this.state.end_date,
    logo:this.state.logo,
    max_usage:this.state.max_usage
  };
    console.log(user);


    let  bodyFormData = new FormData();
    bodyFormData.set('name', user.name);
    bodyFormData.set('description',user.description);
    bodyFormData.set('start_date', user.start_date);
    bodyFormData.set('end_date', user.end_date);
    bodyFormData.append('logo',this.state.logo,
      this.state.logo.name)
    bodyFormData.set('max_usage', user.max_usage);
    axios({
      method: 'POST',
      url: 'http://jive-core.herokuapp.com/api/v1/events/'+this.props.match.params.eventID+'/update',
      data: bodyFormData,
      headers:{
          'Content-Type': 'multipart/form-data',
          'Authorization': Library.getData('oauth-token')
        
        }
      })
      .then(function (response) {
          //handle success
          console.log(response);
          document.getElementById("buttonShipper").innerHTML ="success";

          alert(response)
      })
      .catch(function (response) {
        document.getElementById("buttonShipper").innerHTML = "failed try again...";

          //handle error
          console.log(response);
      });

    }


  toggleFade() {
    this.setState((prevState) => { return { fadeIn: !prevState }});
  }

  render() {

    const { isLoading } = this.state;

      
    return (
      <div className="animated fadeIn">
      <div className="page-header">
        <h3 className="page-title">
        <span className="page-title-icon bg-gradient-primary text-white mr-2">
          <i className="fa fa-edit"></i>                 
        </span>
       Edit Event
      </h3>
      </div>
      {!isLoading ? (
  
      <Row>
        <Col xs="12" md="6">
          <Card>
            <CardHeader>
              <strong class="btn btn-light">Edit Event</strong>
            </CardHeader>
            <CardBody>
              <Form>
                <FormGroup row>
                  <Col md="3">
                    <Label   style={{fontFamily:'Ubuntu'}}>Name of Event</Label>
                  </Col>
                  <Col xs="12" md="9">
                  <Input   style={{fontFamily:'Ubuntu', fontSize:16}}
                    type="text" 
                    id="text-input" 
                   onChange={this.handleChange}
                   value ={this.state.name}
                   name="name"
                   placeholder="Event Name"/>
                   
                  </Col>
                </FormGroup>
                
                <FormGroup row>
                  <Col md="3">
                    <Label  style={{fontFamily:'Ubuntu'}} htmlFor="date-input"> Start Date </Label>
                  </Col>
                  <Col xs="12" md="9">
                    <Input  style={{fontFamily:'Ubuntu', fontSize:16}}
                    type="text" 
                    id="date-input" 
                    name="start_date"
                    value={this.state.start_date}
                     onChange={this.handleChange} 
                     placeholder="Start date"
                      />
                  </Col>
                </FormGroup>
                <FormGroup row>
                  <Col md="3">
                    <Label   style={{fontFamily:'Ubuntu'}} htmlFor="date-input"> End Date</Label>
                  </Col>
                  <Col xs="12" md="9">
                    <Input  style={{fontSize:16}} type="text"
                      name="end_date"
                      value={this.state.end_date}
                       onChange={this.handleChange}
                       placeholder="End Date" 
                        />
                  </Col>
                </FormGroup>
                
                <FormGroup row>
                  <Col md="3">
                    <Label   style={{fontFamily:'Ubuntu'}} htmlFor="textarea-input">Description</Label>
                  </Col>
                  <Col xs="12" md="9">
                    <Input  type="textarea"
                      style={{fontFamily:'Montserrat', fontSize:16}}
                    value={this.state.description}
                     onChange={this.handleChange}
                      id="description" rows="9"
                      name="description"
                       placeholder="Description..."
                       />
                  </Col>
                </FormGroup>
                <FormGroup row>
                  <Col md="3">
                    <Label   style={{fontFamily:'Ubuntu'}} htmlFor="file-input">File input</Label>
                  </Col>
                  <Col xs="12" md="9">
                    <Input  type="file" name="logo" value={this.state.logo} onChange={this.fileChangedHandler}  />
                  </Col>
                </FormGroup>
               
              
              </Form>
            </CardBody>
            <CardFooter>
              <Button class="btn btn-gradient-primary mr-2" style={{fontFamily:'Ubuntu', color:"#FFF", width:150, height:50}} type="submit" id="buttonShipper" onClick={this.handleSubmit} size="sm"><i style={{marginRight:"7px"}}className="fa fa-dot-circle-o"></i>Edit</Button>
              
            </CardFooter>
          </Card>
              </Col>
      </Row>
      ) : (
        <div>
        <Spinner />
        <p style={{textAlign:'center', fontFamily:'Ubuntu', fontSize:'15'}}>Please wait...</p>
        </div>
      )}
     
        
    </div>
     
    );
  }
}


export default Forms;




