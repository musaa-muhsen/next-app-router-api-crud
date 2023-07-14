const DATA_SOURCE_URL = "https://jsonplaceholder.typicode.com/todos";
import { NextResponse,NextRequest } from "next/server";

type Props = {
    params: {
        id: string
    }
}
export async function  GET(req: Request,{params: {id}}: Props) {
   // console.log('id',res) when added im
    //{ params: { id: '4' } }
     try {
      const idx: string = req.url.slice(req.url.lastIndexOf('/') + 1)
        const response = await fetch(`${DATA_SOURCE_URL}/${idx}`);
        const todo: Todo = await response.json()
        console.log(todo)
        if (!todo.id) return NextResponse.json({'message': "Todo not found."})
        return NextResponse.json({todo}, {status: 200})
     } catch (err) {
         return NextResponse.json(
             {message: 'Error', err},
             {status: 500}
         )
     }
 
 }