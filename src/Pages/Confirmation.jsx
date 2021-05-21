import React from 'react'
import Axios from 'axios'
import {connect} from 'react-redux'

class Confirmation extends React.Component{

    state = {
        error: false,
        message: null,
        showForm: false
    }

    componentDidMount(){
        this.onConfirmation()
    }

    onConfirmation = () => {
        let category = this.props.match.params.cat
        console.log(category)

        if(category === 'true'){
            this.setState({showForm: true})
            // let dataToSendCode = {
            //     code: this.activationCode.value
            // }

            // Axios.patch('http://localhost:4000/authentic-system/confirmation', {dataToSendCode})
            // .then((res) => {
            //     this.setState({error: res.data.error, message: res.data.message})
            // })
            // .catch((err) => {
            //     console.log(err)
            // })

        }else{
            let dataToSend = {
                id: this.props.match.params.id,
                password: this.props.match.params.pass
            }
    
            Axios.patch('http://localhost:4000/authentic-system/confirmation', {dataToSend})
            .then((res) => {
                this.setState({error: res.data.error, message: res.data.message})
            })
            .catch((err) => {
                console.log(err)
            })
        }

    }


    render(){
        return(
            this.state.showForm?
                <div className="container-fluid" style={{backgroundColor:'#5aa897'}}>
                    <div className="row justify-content-center align-items-center" style={{height: '100vh'}}>
                        <div className="col-5 border border-primary rounded" style={{backgroundColor:'white'}}>
                            <h1 className="text-center my-3">
                                Input Your Code!
                            </h1>
                            
                            <div className="form-group">
                                <label for="exampleInputEmail1">Activation Code</label>
                                <input type="text" ref={(e) => this.activationCode = e} className="form-control" aria-describedby="emailHelp" />
                            </div>
                            <button type="button" className="btn btn-primary w-100 mb-3">
                                Submit
                            </button>
                        </div>
                    </div>
                </div>
            :
                <div className="container">
                    <div className="row justify-content-center align-items-center" style={{height: '100vh'}}>
                        <div className="col-5 text-center border border-primary px-3 py-5 rounded">
                            {
                                this.state.error?
                                    <p>
                                        {this.state.message}
                                    </p>
                                :  
                                    <>
                                        <h1>Welcome With Us!</h1>
                                        <p>
                                            {this.state.message}
                                        </p>
                                    </> 
                            }
                            <button className='btn btn-primary'>Continue Login</button>
                        </div>
                    </div>
                </div>
        )
    }
}

export default Confirmation