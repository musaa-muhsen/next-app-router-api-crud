import fs from 'fs';
import path from 'path';
import jsonPostsData from '../../../public/posts.json';
type Post = {
    id: string;
    title: string;
    desc: string;
    date: string;
}

let posts: Post[] = jsonPostsData as Post[];
//let posts: Post[]
const filePath = path.join(process.cwd(), 'public', './posts.json');

const writeUsersToJson: () => void = () => {
   // path.join(process.cwd(), './posts.json');

   // fs.writeFileSync(path.join(__dirname, './posts.json'), JSON.stringify(posts))
} 
// handlers
export const getPosts = () => posts;

export const addPost = (post: Post) => {
    // console.log(posts)
     posts.push(post)
     fs.writeFileSync(filePath, JSON.stringify(posts))
    // console.log(posts)
   // console.log(fs.existsSync(filePath))

     

//   if (fs.existsSync(filePath)) {
//     const fileData = fs.readFileSync(filePath, 'utf8');
//     const data = JSON.parse(fileData);
//     console.log(data)
//   } 
    
}

export const deletePost = (id: string) => {
    posts = posts.filter((post) => post.id !== id)
    fs.writeFileSync(filePath, JSON.stringify(posts))
}

export const updatePost = (
    id: string, 
    title: string, 
    desc: string 
    ) => {
   const post = posts.find((post) => post.id === id);
   if (post) {
     post.title = title;
     post.desc = desc;
      
   } else {
      throw new Error("NO POST FOUND")
   }
}

export const getById = (id: string) => {
    return posts.find((post) => post.id === id)
}