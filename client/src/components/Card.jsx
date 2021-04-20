import React from "react";
import {Card,Button} from "react-bootstrap"


function CardElement(props){

return(
    <Card style={{ width: '18rem' }}>
    <Card.Img variant="top" src={props.source} />
    <Card.Body>
      <Card.Title>Card Title</Card.Title>
      <Card.Text>
        Some quick example text to build on the card title and make up the bulk of
        the card's content.
      </Card.Text>
      <Button variant="primary">Go to Game</Button>
    </Card.Body>
  </Card>
)

}

export default CardElement;