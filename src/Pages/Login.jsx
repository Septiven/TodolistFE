import react from 'react'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faUser,faLock} from '@fortawesome/free-solid-svg-icons'

// Action
import {onUserLogin} from './../Redux/Actions/UserAction'

//redux
import {connect} from 'react-redux'
import { Link } from 'react-router-dom'
import {Redirect} from 'react-router-dom'

class Login extends react.Component{

  onLogin = () => {
    let data = {
        email: this.email.value,
        password: this.password.value
    }

    this.props.onUserLogin(data)
}

    render(){
      if(this.props.user.isRedirect){
        return(
            <div>
                <Redirect to="/todolist" />
            </div>
        )
    }

      return(
        <div className="container-fluid d-flex p-5" style={{backgroundColor:"#5aa897",height:"100vh"}}>
          {/* kiri */}
          <div style={{height:"500px"}} className="col-3">
            <img src="https://www.kibrispdr.org/data/pop-art-wallpaper-hd-34.jpg" style={{height:"100%",width:"100%",borderRadius:"20px"}}/>
          </div>
          
          {/* tengah */}
          <div style={{height:"500px",backgroundColor:"white",borderRadius:"30px"}} className="col-6">
            <div className="pt-5" style={{textAlign:'center'}}>
                <img src="https://freedesignfile.com/upload/2017/08/alien-icon-vector.png" style={{height:"100px",width:"100px"}}/>
            </div>
            <div className="px-3" style={{textAlign:'center'}}>
                <h1>Log in</h1><br/>
                <div className="d-flex">
                    <span className="col-1 ">
                        <FontAwesomeIcon icon={faUser}/>
                    </span>
                    <span style={{width:"600px"}}>
                        <input type="email" ref={(e) => this.email = e} class="form-control"  placeholder="Enter email"></input><br/>
                    </span>
                </div>
                <div className="d-flex">
                    <span className="col-1">
                        <FontAwesomeIcon icon={faLock}/>
                    </span>
                    <span style={{width:"600px"}}>
                        <input type="password" ref={(e) => this.password = e} class="form-control"  placeholder="Enter password"></input><br/>
                    </span>
                </div>
                <div className="d-flex justify-content-end" style={{marginTop:"-20px"}}>
                    <Link to='/forgottenPass'>
                    Forgot Password?
                    </Link>
                </div>

                {/* error */}
                <h6 className="text-center text-danger font-italic">
                  {this.props.user.message}
                </h6>
                {/* button login */}
                <div className="d-flex justify-content-center" style={{marginTop:"20px"}}>
                    <input type="button" value="Login" onClick={() => this.onLogin()} className="btn btn-info btn-lg active w-100"/>
                </div>
            </div>
          </div>

            {/* kanan */}
          <div style={{height:"500px"}} className="col-3">
            <img src="https://www.kibrispdr.org/data/pop-art-wallpaper-hd-34.jpg" style={{height:"100%",width:"100%",borderRadius:"20px"}}/>
          </div>

        </div>
      )
    }
  }
  
const mapDispatchToProps = {
    onUserLogin
}

const mapStateToProps = (state) => {
    return {
        user: state.user
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login)