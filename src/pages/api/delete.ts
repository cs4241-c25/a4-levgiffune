// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { MongoClient, ObjectId } from 'mongodb'

export default async function POST(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const client = new MongoClient(process.env.DB!)
  await client.connect()
  const todos = await client.db('todo').collection('todo')

  const id = ObjectId.createFromHexString(req.body.id)

  try{
    todos.deleteOne({_id: id})
  } catch(err: unknown){
    res.status(500).send(err as Error)
  }
  
  const result = await todos.find({}).toArray()
  client.close()

  for(const task of result){
    task.timeLeft = Math.floor(((new Date(task.date)).valueOf()-(new Date()).valueOf())/86400000)+1
  }
  
  res.json(result)
}