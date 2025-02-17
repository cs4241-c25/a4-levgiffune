import {Button, Container, Row, Col, Form} from 'react-bootstrap'
export default function Home() {
  return (
    <div>
        <Container>
            <header>
                <h1>Log in</h1>
            </header>
        </Container>
        <Container>
            <Row>
                <Col xs={6}>
                    <Form action="/login" method="post">
                        <Form.Group>
                            <Form.Label>Username</Form.Label>
                            <Form.Control id="username" name="username" type="text" required />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Password</Form.Label>
                            <Form.Control id="current-password" name="password" type="password" required />
                        </Form.Group>
                        <Button type="submit">Sign in</Button>
                    </Form>
                    <Form action="/auth/github" method="get">
                        <Button type="submit">Sign in with GitHub</Button>
                    </Form>
                </Col>
            </Row>
            <span className="text-danger">message</span>
        </Container>
    </div>
  );
}
