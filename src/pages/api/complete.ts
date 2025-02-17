// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { MongoClient, ObjectId } from 'mongodb'
import { getServerSession } from "next-auth";
import { options } from "./auth/[...nextauth]";


export default async function POST(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await getServerSession(req, res, options)
  if(!session || !session.user){
    res.status(403)
  }
  
  const client = new MongoClient(process.env.DB!)
  await client.connect()
  const todos = await client.db('todo').collection('todo')

  const id = ObjectId.createFromHexString(req.body.id)

  try{
    todos.updateOne(
      {_id: id}, 
      {$set: {complete: true}})
  } catch(err: unknown){
    res.status(500).send(err as Error)
  }

  
  const result = await todos.find({user: session?.user?.name}).toArray()
  client.close()

  for(const task of result){
    task.timeLeft = Math.floor(((new Date(task.date)).valueOf()-(new Date()).valueOf())/86400000)+1
  }
  
  res.json(result)
  console.log(result)
}