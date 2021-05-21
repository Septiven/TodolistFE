import React from 'react';
import axios from 'axios';
import {connect} from 'react-redux'
import swal from 'sweetalert'
import { Modal, ModalHeader, ModalBody} from 'reactstrap'

// Import Action
import {checkUserVerify} from './../Redux/Actions/UserAction'

// Import Component
import CreateModal from './../Components/CreateTodoModal'

// Import Action
import {onGetTodo,deleteData,updateData} from './../Redux/Actions/TodoAction'

class Todolist extends React.Component{

    state = {
        showUpdateModal: false,
        IDtodolist: null
    }

    componentDidMount(){
        this.userVerify()
        this.getTodoLists()
    }

    userVerify = () => {
        let token = localStorage.getItem('my-tkn')
        
        this.props.checkUserVerify(token)
    }

    getTodoLists = () => {
        let token = localStorage.getItem('my-tkn')

        let data = {
            token
        }

        this.props.onGetTodo(data)
    }

    onDelete = (id) => {
        console.log(id)
        this.props.deleteData(id)
        swal({
            title: "Delete Successfull!",
            text: "You have deleted the task!",
            icon: "success",
          })
          //get data lagi
          let token = localStorage.getItem('my-tkn')

          let data = {
              token
          }
  
          this.props.onGetTodo(data)
    }

    onUpdateModal = (id) => {
        this.setState({showUpdateModal: true})
        const idTodoList = id
        this.setState({IDtodolist: idTodoList})      
    }

    onUpdate = () => {
        
        let token = localStorage.getItem('my-tkn')
        let title = this.title.value
        let description = this.description.value
        let date = this.date.value
        let id = this.state.IDtodolist
        let dataToSend = {
            title,
            description,
            date,
            id,
            token
        }

        this.props.updateData(dataToSend)
        this.setState({showUpdateModal: false})
    }

    onUserLogout = () => {
        localStorage.removeItem('my-tkn')
        window.location = '/login'
    }

    render(){
        if(this.props.todo.data === null){
            return(
                <div>
                    loading...
                </div>
            )
        }

        return(
            <>
            <div className="container.fluid" style={{backgroundColor: 'silver',height:'100vh'}}>
                <div className="row justify-content-center py-5">
                    <div className="col-8">
                        {
                            this.props.user.is_email_confirmed === 0?
                                <div class="alert alert-danger" role="alert">
                                    Activate Your Account!
                                </div>
                            :
                                null
                        }
                        <div>
                            <button className="btn btn-danger my-2" value="Logout" onClick={()=>this.onUserLogout()}>Logout</button>
                        </div>
                    </div>
                    <div className="col-8 shadow-md py-3" style={{backgroundColor: 'white',borderRadius:'10px'}}>
                        {/* Button Section */}
                        <div className="col-12 mb-3">
                            <CreateModal />
                            <hr />
                        </div>
                        <div className="row px-3" >
                            {
                                this.props.todo.data.map((value, index) => {
                                    return(
                                        <>
                                            <div className="col-12 mb-2">
                                                <h4 style={{fontWeight: 'bold'}}>
                                                    {value.date}
                                                </h4>
                                            </div>
                                            {
                                                value.todolists.map((val, idx) => {
                                                    return(
                                                        <>
                                                            <div className="col-6">
                                                                <p style={{fontSize: '18px'}}>
                                                                    {val.title}
                                                                </p>
                                                            </div>
                                                            <div className="col-6 text-right">
                                                                <input type="button" value="Delete" className="btn btn-danger" onClick={()=>this.onDelete(val.id)} style={{fontSize: '10px',marginRight:'5px'}} />
                                                                <input type="button" value="Update" className="btn btn-outline-success" onClick={()=>this.onUpdateModal(val.id)} style={{fontSize: '10px'}} />
                                                            </div>
                                                        </>
                                                    )
                                                })
                                            }
                                        </>
                                    )
                                })
                            }
                        </div>
                    </div>
                </div>

            </div>
            {/* modal update */}
            <Modal isOpen={this.state.showUpdateModal} toggle={() => this.setState({showUpdateModal: false})}>
                <ModalHeader>Update Data </ModalHeader>
                    <ModalBody>
                        <input type="text" placeholder="update title" className="form-control my-2 mx-2" ref={e => this.title = e}/>
                        <input type="text" placeholder="update description" className="form-control my-2 mx-2" ref={e => this.description = e}/>
                        <input type="datetime-local" placeholder="update date" className="form-control my-2 mx-2" ref={e => this.date = e}/>
                        <input type="button" value="update data" className="btn btn-primary my-2 mx-2" onClick={()=>this.onUpdate()}/>
                     </ModalBody>
            </Modal>
        </>
        )
    }
}

const mapDispatchToProps = {
    checkUserVerify, onGetTodo,deleteData,updateData
}

const mapStateToProps = (state) => {
    return{
        user: state.user,
        todo: state.todo
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Todolist)