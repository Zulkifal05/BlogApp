import React, { useEffect, useState } from 'react'
import Container from "../components/Container"
import Post from "../components/Post"
import PostsService from "../services/Posts"
import { addPosts } from "../store/PostsSlice"
import { useDispatch , useSelector } from "react-redux"

const Home = () => {
  let [posts,setPosts] = useState([]);
  let dispatch = useDispatch();
  let postsReduxData = useSelector((state) => state.posts);

  useEffect(() => {
    if(postsReduxData.postsFetchedStatus) {
      setPosts(postsReduxData.postsFetched);
    }
    else {
      PostsService.GetPosts().then((resp) => {
        if(resp) {
          setPosts(resp.documents);
          dispatch(addPosts(resp.documents));
        }
      });
    }
  },[])

  if(posts.length === 0) return <Container>
    <p className='font-bold text-gray-800 text-2xl'>Currently No Posts!</p>
  </Container>

  return (
    <Container>
      {posts && posts.map((post) => <Post post={post} key={post}/>)}
    </Container>
  )
}

export default Home