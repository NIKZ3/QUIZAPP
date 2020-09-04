import React,{Component} from 'react'
import { Card, CardHeader, CardBody, CardTitle} from 'reactstrap';
import {
    FormGroup,
    Label,
    Input,
  } from "reactstrap";
import {Button} from "reactstrap";

class QuestionSubmissionHub extends Component {

    render(){


    return(
    <Card style={{margin:'20px'}}>
    <CardHeader>Problem Setters</CardHeader>
    <CardBody>
        <CardTitle>Enter A Question</CardTitle>
        <form>
      <FormGroup>
        <Label for="exampleEmail">Enter Question Here</Label>
        <Input
          type="textArea"
          name="Question"
          id="Question"
          placeholder="Enter Question"
        />
      </FormGroup>
      <FormGroup>
        <Label for="option1">OPTION 1</Label>
        <Input
          type="text"
          name="option1"
          id="option1"
          placeholder="option1"
        />
      </FormGroup>
      <FormGroup>
        <Label for="option2">OPTION 2</Label>
        <Input
          type="text"
          name="option2"
          id="option2"
          placeholder="option2"
        />
      </FormGroup>
      <FormGroup>
        <Label for="option3">OPTION 3</Label>
        <Input
          type="text"
          name="option3"
          id="option3"
          placeholder="option3"
        />
      </FormGroup>
      <FormGroup>
        <Label for="option4">OPTION 4</Label>
        <Input
          type="text"
          name="option4"
          id="option4"
          placeholder="option4"
        />
      </FormGroup>
     
      <Button color="primary" type="submit">
        Submit
      </Button>
    </form>
    </CardBody>
</Card>
    )

    }

}

export default QuestionSubmissionHub