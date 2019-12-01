import React, { Component } from 'react'
import axios from "axios"
import { Icon } from 'react-icons-kit'
import {ic_delete_forever} from 'react-icons-kit/md/ic_delete_forever'
import { Container, Row, Col, Card, Modal, Button} from "react-bootstrap"


export default class SavedQuotes extends Component {

    state = {
        savedQuotes : [],
        show : false,
        id : ""
    }

    componentDidMount(){
        axios.get("http://localhost:8080/quotes")
        .then(response => this.setState(() => ({ savedQuotes : response.data })))
        .catch(err => console.log(err.response))
    }

    openModal = (id) => {
        this.setState({ show : true, id })
    }

    handleDelete = () => {
        axios.delete(`http://localhost:8080/quotes/${this.state.id}`)
        .then(() =>
            this.setState({ show : false }),
        )
        .catch(err => console.log("error"))
        window.location.reload()
    }

    handleClose = () => {
        this.setState({ show : false})
    }

    render() {
        return (
            <Container>
                <Modal show={this.state.show} onHide={this.handleClose} animation={true} centered>
                    <Modal.Body>Are you sure ?</Modal.Body>
                    <Modal.Footer>
                    <Button variant="secondary" onClick={this.handleDelete}>
                        Yes
                    </Button>

                    </Modal.Footer>
                </Modal>
                <Row>
                <Col sm={2}></Col>
                <Col xs={12} sm={10} md={8} lg={8}>
                    {
                        this.state.savedQuotes.map(quote => {
                            return(
                                <div key={quote.id}>
                                    <Card border="primary" className="quote-cards">
                                        <Card.Body className="card-body-quote">
                                            <blockquote className="blockquote mb-0">
                                            <Icon
                                                className="delete-icon"
                                                icon={ic_delete_forever}
                                                size={36}
                                                onClick={() => this.openModal(quote.id)}
                                            />
                                            <p>
                                                {' '}{quote.title}{' '}
                                            </p>

                                            <footer className="blockquote-footer">
                                                <cite title="Source Title">{quote.author}</cite>
                                            </footer>

                                            </blockquote>
                                        </Card.Body>
                                        {/* <Card.Footer className="text-muted">


                                        </Card.Footer> */}
                                    </Card>
                                </div>
                            )
                        })
                    }
                </Col>
                <Col sm={2}></Col>
                </Row>
            </Container>
        )
    }
}
