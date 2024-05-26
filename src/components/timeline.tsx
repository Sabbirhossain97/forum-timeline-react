import { useState, useEffect } from 'react'
import axios from 'axios';
import { Post } from '../interfaces/post.interface';
import { User } from '../interfaces/user.interface';
import Pagination from './pagination';

export default function Timeline() {
    const [forumPosts, setForumPosts] = useState<Post[]>([])
    const [currentPage, setCurrentPage] = useState(1);
    const postsPerPage = 10;

    const getForumPosts = async (): Promise<void> => {
        try {
            const [postsResponse, usersResponse] = await Promise.all([
                axios.get('https://jsonplaceholder.typicode.com/posts'),
                axios.get('https://jsonplaceholder.typicode.com/users')
            ]);

            const posts: Post[] = postsResponse.data;
            const users: User[] = usersResponse.data;

            const userMap = new Map();
            users.forEach(user => userMap.set(user.id, user.name));

            const postsWithUserNames = posts.map(post => ({
                ...post,
                userName: userMap.get(post.userId)
            }));

            setForumPosts(postsWithUserNames)

        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    useEffect(() => {
        getForumPosts()
    }, [])

   

    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    const currentPosts = forumPosts.slice(indexOfFirstPost, indexOfLastPost);

    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(forumPosts.length / postsPerPage); i++) {
        pageNumbers.push(i);
    }


    return (
        <section className="bg-white dark:bg-gray-900">
            <div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6">
                <div className="mx-auto max-w-screen-sm text-center lg:mb-16 mb-8">
                    <h2 className="mb-4 text-3xl lg:text-4xl tracking-tight font-extrabold text-gray-900 dark:text-white">Our forum</h2>
                </div>
                <div className="grid gap-8 lg:grid-cols-2">
                    {currentPosts && currentPosts.map((post, index) => (
                        <article className="p-6 bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700">
                            <h2 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white"><a href="#">{post.title}</a></h2>
                            <p className="mb-5 font-light text-gray-500 dark:text-gray-400">{post.body}</p>
                            <div className="flex justify-between items-center">
                                <div className="flex items-center space-x-4">
                                    <img className="w-7 h-7 rounded-full" src="https://upload.wikimedia.org/wikipedia/commons/8/89/Portrait_Placeholder.png" alt="Jese Leos avatar" />
                                    <span className="font-medium dark:text-white">
                                        {post.userName}
                                    </span>
                                </div>
                                <a href="#" className="inline-flex items-center font-medium transition group duration-300 text-teal-400 hover:text-teal-500">
                                    Read more
                                    <svg className="ml-2 w-4 h-4 group-hover:translate-x-1 transition duration-300" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
                                </a>
                            </div>
                        </article>
                    ))}
                </div>
                <Pagination pageNumbers={pageNumbers} setCurrentPage={setCurrentPage} />
            </div>
        </section>
    )
}
