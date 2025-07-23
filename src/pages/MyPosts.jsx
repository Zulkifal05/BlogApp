import React, { useEffect, useState } from 'react'
import Post from '../components/Post'
import PostsService from '../services/Posts';
import { useSelector } from 'react-redux';
import Container from '../components/Container';

const MyPosts = () => {
    let [myPosts,setMyPosts] = useState([]);
    let [isLoading,setIsloading] = useState(true);
    let loggedInUserID = useSelector((state) => state.auth.userData?.$id)

    useEffect(() => {
        async function FetchUserPosts() {
            setIsloading(true);
            let userPosts = await PostsService.GetPosts(loggedInUserID);
            if(userPosts) {
                setMyPosts(userPosts.documents);
                setIsloading(false);
            }
        }

        FetchUserPosts()
    },[loggedInUserID])

    if(isLoading) return <Container>
        <p className='font-bold text-gray-800 text-2xl'>Loading.....</p>
    </Container>

    if(myPosts.length === 0) return <Container>
        <p className='font-bold text-gray-800 text-2xl'>Currently No Posts!</p>
    </Container>

    return (
        <Container>
        {myPosts && myPosts.map((post) => <Post post={post} key={post.$id}/>)}
        </Container>
    )
}

export default MyPosts