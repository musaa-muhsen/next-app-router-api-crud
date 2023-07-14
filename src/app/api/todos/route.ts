const DATA_SOURCE_URL = "https://jsonplaceholder.typicode.com/todos";
import { NextRequest,NextResponse } from "next/server";
const API_KEY: string = process.env.DATA_API_KEY as string;

// export async function GET(request: Request, response: Response) {
//     //const dataTest = await fetch(DATA_SOURCE_URL)
//     console.log('dataTest,dataTest')
//     NextResponse.json({message: "Hello World"}, {status: 200})
    
// }


export async function  GET(req: Request, res: Response) {

     console.log('res', res)
     try {
        const response = await fetch(DATA_SOURCE_URL);
        const todos: Todo[] = await response.json()
        //console.log()
        //const posts = getPosts();
        return NextResponse.json({todos: todos}, {status: 200})
     } catch (err) {
         return NextResponse.json(
             {message: 'Error', err},
             {status: 500}
         )
     }
 
 }

 export async function DELETE(req: Request){
    const {id}: Partial<Todo> = await req.json();
    if (!id) return NextResponse.json({"message": "Todo ID required"});

    await fetch(`${DATA_SOURCE_URL}/${id}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'API-Key': API_KEY

        }

    })

    return NextResponse.json({"message": `Todo ${id} deleted`});
 }


 export async function POST(req: Request){
    const {userId,title}: Partial<Todo> = await req.json();
    console.log(userId,title)
    if (!userId || !title) return NextResponse.json({"message": "Missing required data."});

    const res = await fetch(`${DATA_SOURCE_URL}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'API-Key': API_KEY

        }, 
        body: JSON.stringify({
            userId, title, completed: false
        })

    })

    const newTodo: Todo = await res.json();

    return NextResponse.json(newTodo);
 }


 export async function PUT(req: Request){
    const {userId,id,title,completed}: Todo = await req.json();
  // console.log(userId,id,title,typeof(completed) !== 'boolean')
    if (!userId || !title || !id || typeof(completed) !== 'boolean') return NextResponse.json({"message": "Missing required data."});

    const res = await fetch(`${DATA_SOURCE_URL}/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'API-Key': API_KEY

        }, 
        body: JSON.stringify({
            userId, title, completed
        })

    })

    const updatedTodo: Todo = await res.json();

    return NextResponse.json(updatedTodo);
 }
