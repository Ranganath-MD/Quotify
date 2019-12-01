import React, { Component } from 'react'
import axios from "axios"
import "../App.css"
import { Container, Row, Col, Card, Button, Spinner, Alert} from "react-bootstrap"


export default class GetQuotes extends Component {

    state = {
        id : "",
        title : "",
        author : "",
        show : false,
        disabled : false,
        showtxt : false,
        msg : ""
    }

    handleGetQuote = () => {
        this.setState({ show : true })
        const id = Math.round(Math.random()*100)
        axios.get(`https://jsonplaceholder.typicode.com/posts/${id}`)
        .then(response => {
            this.setState({
                title : response.data.title,
                id : response.data.id,
                showtxt : false,
                disabled : false
            })
            const authorId = response.data.userId
            axios.get(`https://jsonplaceholder.typicode.com/users/${authorId}`)
            .then(response => this.setState({ author : response.data.username, show : false }))
            .catch(err => console.log("something went"))
        })
        .catch(err => console.log("something went wrong"))
    }
    componentDidMount(){
        this.handleGetQuote()
    }

    handleSave = (id) => {
        const quotes = {
            id ,
            title : this.state.title,
            author : this.state.author
        }
        axios.get(`http://localhost:8080/quotes`)
        .then(response => {
            const data = response.data.some(quote => quote.id === id)
            if(data) {
                this.setState({ msg : "This quote is present in your saved list", variant:"danger", showtxt : true})
            }else {
                axios.post("http://localhost:8080/quotes", quotes)
                .then(() => this.setState({ msg : "Successfully saved", showtxt : true, variant: "success", disabled : true }))
                .catch(() => console.log("something went wrong with json-server"))
            }
        })
    }

    render() {
        return (
            <Container>
                <Alert show={this.state.showtxt} variant={this.state.variant}>
                    {this.state.msg}
                </Alert>
                <Row>
                    <Col xs></Col>
                    <Col xs={12} sm={10} md={10} lg={10}>
                        <Card className="text-center card-layout">
                            <Card.Header>Quotes</Card.Header>
                            <Card.Body>
                                {
                                    this.state.show ?
                                    <>
                                        <Spinner size="sm" animation="grow" />
                                        <Spinner size="sm" animation="grow" />
                                        <Spinner size="sm" animation="grow" />
                                        <Spinner size="sm" animation="grow" />
                                        <Spinner size="sm" animation="grow" />
                                        <br/><br/><br/><br/>
                                    </> :
                                    <>
                                    <Card.Text className="quote-title">{this.state.title}</Card.Text>
                                    <footer className="blockquote-footer">
                                        <cite title="Source Title">{this.state.author}</cite>
                                    </footer>
                                    </>
                                }
                                <Button
                                    variant="primary"
                                    onClick={this.handleGetQuote}
                                >
                                Get another quote
                                </Button>
                            </Card.Body>
                            <Card.Footer className="text-muted">
                                posts as quotes from jsonplaceholder
                                <Button
                                    disabled={this.state.disabled}
                                    variant="primary"
                                    className="save-btn"
                                    onClick={() => this.handleSave(this.state.id)}
                                >
                                    { this.state.showtxt ? "Saved" : "save" }
                                </Button>
                            </Card.Footer>
                        </Card>
                    </Col>
                    <Col xs></Col>
                </Row>
            </Container>
        )
    }
}
