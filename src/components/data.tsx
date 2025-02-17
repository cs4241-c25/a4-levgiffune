import { Button, Col, Row } from "react-bootstrap"
import React from "react"
import { ObjectId } from "mongodb"
import Todo from "../lib/todo"

const DataTable = (props: { 
    data: Todo[]; 
    setData: React.Dispatch<React.SetStateAction<Todo[]>> }) => {
    const data = props.data
    const setData = props.setData
    const postData = async (route: string, body?: string | undefined) => {
        const response = await fetch( route, {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            method:'POST',
            body
        })

        if(response.status == 200){
            const items = await response.json()
            setData(items)
        }
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
    React.useEffect(() => {postData('/api/submit')}, [])

    const del = async (id: ObjectId) => {
        postData('/api/delete', JSON.stringify({id: id}))
    }

    const comp = async (id: ObjectId) => {
        postData('/api/complete', JSON.stringify({id: id}))
    }

    return(
        <div id='data'>
                {data.map(({name, date, complete, timeLeft, _id}) => (
                    <Row key={_id.toString()}>
                        <Col xs={3}>{name}</Col>
                        <Col xs={3}>
                            {(new Date(date)).toLocaleDateString('en', {
                                year: 'numeric', 
                                month: '2-digit', 
                                day: '2-digit'
                            })}</Col>
                        <Col xs={2}>{timeLeft}</Col>
                        <Col xs={2}>
                            {complete ? <span className="text-success">Complete</span>
                            : <Button 
                                id="complete"
                                aria-label="complete item" 
                                onClick={() => comp(_id)}>
                                <i className="fa fa-check"/>
                            </Button>}
                        </Col>
                        <Col xs={1}>
                            <Button 
                                id="delete" 
                                aria-label="delete item" 
                                onClick={() => del(_id)}>
                                <i className="fa fa-trash"/>
                            </Button>
                        </Col>
                    </Row>)
            )}
        </div>
    )
}

export default DataTable