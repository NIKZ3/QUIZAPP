import React, { Component } from 'react'
import Login from "../Containers/Login"

class UserLogin extends Component{

    state= {
        email:"",
        password:""
    }

    emailChangeHandler = (event)=>{
        this.setState({email:event.target.value})
    }


    passwordChangeHandler = (event)=>{
        this.setState({password:event.target.value})
        
    }

    onSubmitHandler = (event)=>{

        if(this.state.email==="" || this.state.password==="")
        {
            alert("ENTER EMAIL AND PASSWORD")

        }

        //TODO:- ELSE: Submmit the details to backend

    }

    render(){
        return(
            <div style={{margin:"75px"}}>
                <Login name="USER LOGIN" 
                        onSubmitHandler={this.onSubmitHandler}
                        emailChangeHandler={(event)=>this.emailChangeHandler(event)}
                        passwordChangeHandler={(event)=>this.passwordChangeHandler(event)} />
            </div>
        )
    }
    
}
export default UserLogin