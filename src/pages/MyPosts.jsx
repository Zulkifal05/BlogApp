import React, { useEffect, useState } from 'react'
import Post from '../components/Post'
import PostsService from '../services/Posts'
import { useDispatch, useSelector } from 'react-redux'
import Container from '../components/Container'
import { addUserPosts } from "../store/PostsSlice"

const MyPosts = () => {
    let [myPosts,setMyPosts] = useState([]);
    let [isLoading,setIsloading] = useState(true);
    let dispatch = useDispatch();
    let loggedInUserID = useSelector((state) => state.auth.userData?.$id);
    let userPostsReduxData = useSelector((state) => state.posts);


    useEffect(() => {
        async function FetchUserPosts() {
            setIsloading(true);
            if(userPostsReduxData.userPostsFetchedStatus) {
                setMyPosts(userPostsReduxData.userPostsFetched);
                setIsloading(false);
            }
            else {
                let userPosts = await PostsService.GetPosts(loggedInUserID);
                if(userPosts) {
                    dispatch(addUserPosts(userPosts.documents));
                    setMyPosts(userPosts.documents);
                    setIsloading(false);
                }
            }
        }

        FetchUserPosts()
    },[loggedInUserID , userPostsReduxData])

    if(isLoading) return <Container>
        <p className='font-bold text-gray-800 text-2xl'>Loading Posts.....</p>
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