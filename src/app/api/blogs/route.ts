import { NextResponse } from "next/server"
import { getPosts, addPost} from "@/app/lib/data"
import fs from 'fs';
import path from 'path';

// const writeUsersToJson: () => void = () => {
//     fs.writeFileSync(path.join(__dirname, '../../../../posts.json'), JSON.stringify(users))
// } 

export const GET = async (req: Request, res: Response) => {
   // console.log(typeof NextResponse)
    try {
       const posts = getPosts();
       return NextResponse.json({message: 'OK', posts}, {status: 200})
    } catch (err) {
        return NextResponse.json(
            {message: 'Error', err},
            {status: 500}
        )
    }

}

export const POST = async (req: Request, res: Response) => {
    const {title,desc} = await req.json();
    console.log('POST REQUEST') 
    try {
        const post = {
            title,
            desc,
            date: new Date().toString(),
            id: Date.now().toString()
        }
        addPost(post);
        return NextResponse.json(
          {message: "OK", post},{status: 201}
        )

        

    } catch (err) {
        return NextResponse.json(
            {message: 'Error', err},
            {status: 500}
        )
    }

    
}