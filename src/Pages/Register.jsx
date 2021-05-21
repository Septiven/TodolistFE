import react from 'react'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faUser,faLock,faSignature} from '@fortawesome/free-solid-svg-icons'
import validator from 'validator'

// Redux
import {connect} from 'react-redux'
import{onUserRegister} from './../Redux/Actions/UserAction'

class Register extends react.Component{

    state = {
        error: null
    }

    onRegister = () => {
        let username = this.username.value
        let email = this.email.value
        let password = this.password.value
        
        if(!username || !email || !password) throw this.setState({error: 'All Data Must Be Filled', loading: false})
        if(!(validator.isEmail(email))) throw this.setState({error: 'Email Not Valid', loading: false})
        if(password.length < 6) throw this.setState({error: 'Password Have Minimum 6 Character', loading: false})

        this.props.onUserRegister(email, password)
    }

    render(){
      return(
        <div className="container-fluid d-flex p-5 d-flex" style={{backgroundColor:"#5aa897",height:"100vh"}}>       
              {/* kiri */}
              <div className="col-6 p-0">
                  <img src="https://i.ytimg.com/vi/GWE7sm7PvoY/maxresdefault.jpg" style={{height:"100%",width:"100%",borderRadius:'30px 0 0 30px'}}/>
              </div>
              
              {/* kanan */}             
                <div style={{height:"100%",backgroundColor:"white",borderRadius:"0 30px 30px 0"}} className="col-6">
                    <div className="pt-5" style={{textAlign:'center'}}>
                        <img src="https://freedesignfile.com/upload/2017/08/alien-icon-vector.png" style={{height:"100px",width:"100px"}}/>
                    </div>
                    <div className="px-3" style={{textAlign:'center'}}>
                        <h1>Register</h1><br/>
                        <div className="d-flex">
                            <span className="col-1 ">
                                <FontAwesomeIcon icon={faSignature}/>
                            </span>
                            <span style={{width:"600px"}}>
                                <input type="username" class="form-control"  placeholder="Enter Username" ref={(e) => this.username = e}></input><br/>
                            </span>
                        </div>
                        <div className="d-flex">
                            <span className="col-1 ">
                                <FontAwesomeIcon icon={faUser}/>
                            </span>
                            <span style={{width:"600px"}}>
                                <input type="email" class="form-control"  placeholder="Enter email" ref={(e) => this.email = e}></input><br/>
                            </span>
                        </div>
                        <div className="d-flex">
                            <span className="col-1">
                                <FontAwesomeIcon icon={faLock}/>
                            </span>
                            <span style={{width:"600px"}}>
                                <input type="password" class="form-control"  placeholder="Enter password" ref={(e) => this.password = e}></input><br/>
                            </span>
                        </div>

                        {/* error */}
                        <h6 className="text-center text-danger font-italic">
                            {this.state.error}
                            {
                                this.props.user.message
                            }
                        </h6>
                        {/* button register */}
                        <div className="d-flex justify-content-center" style={{marginTop:"20px"}}>
                            <input type="button" value="Register" className="btn btn-info btn-lg active w-100" onClick={()=>this.onRegister()} disabled={this.state.loading}/>
                        </div>
                    </div>
                </div>
        </div>
      )
    }
  }
  
  const mapDispatchToProps = {
    onUserRegister
}

const mapStateToProps = (state) => {
    return{
        user: state.user
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Register)