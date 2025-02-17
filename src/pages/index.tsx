import {Button, Container, Row, Col} from 'react-bootstrap'
import Data from '../components/data';
import React from 'react';
import Todo from '../lib/todo';
import { signIn, signOut, useSession } from 'next-auth/react';
import Head from 'next/head';

export default function Home() {
  const [userData, setUserData] = React.useState<Todo[]>([])
  
  const submit = async () => {
    const task = document.getElementById("task") as HTMLInputElement
    const date = document.getElementById("date") as HTMLInputElement

    const body = JSON.stringify({
      name: task.value,
      date: date.value,
      complete: false
    })

    const response = await fetch('/api/submit', {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        method:'POST',
        body
    })

    if(response.status == 200){
        const items = await response.json()
        setUserData(items)
    }
  }

  const { status, data } = useSession({
    required: true,
    onUnauthenticated() {
      signIn()
    },
  })

  if (status === "loading") {
    return 
  }

  return (
    <>
      <Head>
        <title>Todo List</title>
        <meta name='description' content='A simple todo list app'/>
      </Head>
      <Container>
        <Row as='header'>
            <Col as='h1' xs={9}>To Do List</Col>
            <Col xs={3}>
              <Button onClick={() => signOut()} id="logout">
                Log Out
                <br/>
                <span>{data?.user?.name}</span>
              </Button>
            </Col>
          </Row>
      </Container>
      <Container>
            <Row>
              <Col as='b' xs={3}>Task Name</Col>
              <Col as='b' xs={3}>Due Date</Col>
              <Col as='b' xs={2}>Days Left</Col>
            </Row>
            <Data data={userData} setData={setUserData}/>
            <Row>
              <Col as='input' xs={3} type="text" id="task" aria-label="task" placeholder="Add a new task..."/>
              <Col as='input' xs={3} type="date" id="date" aria-label="date"/>
              <Col xs={4}/>
              <Col xs={1}>
              <Button onClick={() => submit()} type="submit" id="add" aria-label="submit">
                <i className="fa fa-plus"/>
              </Button>
              </Col>
            </Row>
      </Container>
    </>
  )
}
