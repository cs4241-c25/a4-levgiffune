import { ObjectId } from "mongodb";

export default interface Todo{
    _id: ObjectId,
    name: string,
    date: string,
    complete: boolean,
    timeLeft: number,
}