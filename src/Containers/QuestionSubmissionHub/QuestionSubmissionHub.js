import React,{Component} from 'react'
import { Card, CardHeader, CardBody, CardTitle} from 'reactstrap';
import {
    FormGroup,
    Label,
    Input,
  } from "reactstrap";
import {Button} from "reactstrap";

class QuestionSubmissionHub extends Component {

    state={

        options:[],
        optioncnt:0,
        optionForm:[]
    }

    optionOnChangeHandler = (i,event)=>{

        let optionTemp = Object.assign({},this.state)

        console.log(i,event)
        console.log(optionTemp)
        optionTemp.options[i]=optionTemp.options[i] + event.target.value
  

        this.setState({state:optionTemp})

    }

    addOptionHandler = ()=>{
        
        let data=[]
        let TempOptions = []
        for(let i=0;i<this.state.optioncnt+1;i++)
        {
          let op = "option" + (i+1)
          let val=""
          if(this.state.options[i]!=null)
          {
            val=this.state.options[i]
          }
          console.log(i)
          data.push( 
            <FormGroup key={i}>
            <Label for={op}>OPTION+{i+1}</Label>
            <Input
              type="text"
              name="option"
              id={op}
              placeholder={op}
              value = {this.state.options[i]}
              onChange ={(event)=>this.optionOnChangeHandler(i,event)}
            />
            </FormGroup>
            )
          TempOptions.push("")
        }
        
        this.setState({optioncnt:this.state.optioncnt+1,optionForm:data,options:TempOptions},()=>{console.log(this.state.optioncnt,this.state.optionForm)})
          
        
    }

  

    render(){

      let op = []
      op.push(<FormGroup>
        <Label for="question">Question</Label>
        <Input
          type="text"
          name="question"
          id="question"
          placeholder="Enter Question"
        />
        </FormGroup>)

    return(
    <Card style={{margin:'20px'}}>
    <CardHeader>Problem Setters</CardHeader>
    <CardBody>
        <CardTitle>Enter A Question</CardTitle>
        <form>
        <FormGroup>
            <Label for="question">Question</Label>
            <Input
              type="text"
              name="question"
              id="question"
              placeholder="Enter Question"
            />
            </FormGroup>
          {this.state.optionForm}
          
      <Button color="primary" onClick={this.addOptionHandler}>
        Add Options
      </Button>
    </form>
    </CardBody>
</Card>
    )

    }

}

export default QuestionSubmissionHub