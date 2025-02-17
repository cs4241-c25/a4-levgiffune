// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { MongoClient } from 'mongodb'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const client = new MongoClient(process.env.DB!)
  await client.connect()
  const todos = await client.db('todo').collection('todo')

  if(req.body.name){
      const workingCopy = req.body
      workingCopy.user = 'TEST'

      try{
        todos.insertOne(workingCopy)
      }catch(err: unknown){
        res.status(500).send(err as Error)
      }
  }
  
  const result = await todos.find({}).toArray()
  client.close()

  for(const task of result){
    task.timeLeft = Math.floor(((new Date(task.date)).valueOf()-(new Date()).valueOf())/86400000)+1
  }

  res.status(200).json(result)
  console.log(result)
}