import React from 'react'
import Axios from 'axios'
import {connect} from 'react-redux'
import reactDom from 'react-dom'

class ForgottenPass extends React.Component{
    render(){
        return(
            <div style={{backgroundColor:'#5aa897'}}>
                 <div className="container">
                    <div className="row justify-content-center align-items-center" style={{height: '100vh'}}>
                        <div className="col-5 border border-primary rounded" style={{backgroundColor:'white'}}>
                            <h1 className="text-center my-3">
                                Forgot Password?
                            </h1>
                            
                            <div className="form-group">
                                <label for="exampleInputEmail1">Input your E-mail</label>
                                <input type="text" className="form-control" aria-describedby="emailHelp" />
                            </div>
                            <button type="button" className="btn btn-primary w-100 mb-3">
                                Search Password
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default ForgottenPass