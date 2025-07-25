import React, { useEffect, useState } from 'react'
import Container from "../components/Container"
import Post from "../components/Post"
import PostsService from "../services/Posts"
import { addPosts } from "../store/PostsSlice"
import { useDispatch , useSelector } from "react-redux"

const Home = () => {
  let [posts,setPosts] = useState([]);
  let [isLoading,setIsLoading] = useState(true);
  let dispatch = useDispatch();
  let postsReduxData = useSelector((state) => state.posts);

  useEffect(() => {    
    async function FetchAllPosts() {
      setIsLoading(true);
      if(postsReduxData.postsFetchedStatus) {
        setIsLoading(false);
        setPosts(postsReduxData.postsFetched);
      }
      else {
        let resp = await PostsService.GetPosts();
        if(resp) {
          setPosts(resp.documents);
          setIsLoading(false);
          dispatch(addPosts(resp.documents));
        }
      }
    }

    FetchAllPosts();
  },[])

  if(isLoading) return <Container>
    <p className='font-bold text-gray-800 text-2xl'>Loading Posts.....</p>
  </Container>

  if(posts.length === 0) return <Container>
    <p className='font-bold text-gray-800 text-2xl'>Currently No Posts!</p>
  </Container>

  return (
    <Container>
      {posts && posts.map((post) => <Post post={post} key={post.$id}/>)}
    </Container>
  )
}

export default Home