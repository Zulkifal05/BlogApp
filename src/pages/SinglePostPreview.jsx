import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import Post from "../components/Post"
import Container from '../components/Container';

const SinglePostPreview = () => {
    let { state } = useLocation();
    let [previewPost,setPreviewPost] = useState(null);

    useEffect(() => {
        if(state.post) {
            setPreviewPost(state.post)
        }
    },[state.post])

    return (
        <>
            <Container>
                <Post post={previewPost} key={previewPost.$id}/>
            </Container>
        </>
    )
}

export default SinglePostPreview