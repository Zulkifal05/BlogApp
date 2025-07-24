import Appwrite from "../conf/Config"
import { Client , ID , Databases , Storage , Query } from "appwrite"

class Posts {
    client = new Client()
    bucket;
    databases;

    constructor() {
        this.client
            .setEndpoint(Appwrite.EndPoint)
            .setProject(Appwrite.ProjectID)
        this.databases = new Databases(this.client);
        this.bucket = new Storage(this.client);
    }

    async CreatePost({Title,Content,FeaturedImage,UserID,UserName}) {
        try {
            return await this.databases.createDocument(
                Appwrite.DataBaseID,
                Appwrite.CollectionID,
                ID.unique(),
                {
                    Title,
                    Content,
                    FeaturedImage,
                    UserID,
                    UserName
                }
            )
        } catch (error) {
            console.log("An Error Occured : ",error);
            return false;
        }
    }

    async UpdatePost(PostID,{Title,Content,FeaturedImage}) {
        try {
            return await this.databases.updateDocument(
                Appwrite.DataBaseID,
                Appwrite.CollectionID,
                PostID,
                {
                    Title,
                    Content,
                    FeaturedImage
                }
            )
        } catch (error) {
            console.log("An Error Occured : ",error);
            return false;
        }
    }

    async DeletePost(ID) {
        try {
            await this.databases.deleteDocument(
                Appwrite.DataBaseID,
                Appwrite.CollectionID,
                ID
            )
            return true;
        } catch (error) {
            console.log("An Error Occured : ",error);
            return false;
        }
    }

    async GetPosts(ID = "") {
        try {
            if(ID === "") { //For the case in which user has not provided ID so fetching all posts
                return await this.databases.listDocuments(
                    Appwrite.DataBaseID,
                    Appwrite.CollectionID
                )
            }
            else {  //If user has provided ID so fetching only given ID's posts
                return await this.databases.listDocuments(
                    Appwrite.DataBaseID,
                    Appwrite.CollectionID,
                    [
                        Query.equal('UserID', ID)
                    ],
                )
            }
        } catch (error) {
            if (error.code === 401) {  //This for expected error
                return null;
              } else {
                console.error("Unexpected Appwrite error:", error);
            }
            return null;
        }
    }

    async GetPost() {
        try {
            return await this.databases.getDocument(
                Appwrite.DataBaseID,
                Appwrite.CollectionID,
                ID
            )
        } catch (error) {
            console.log("An Error Occured : ",error);
            return false;
        }
    }

    //File related services
    async UploadFile(file) {
        try {
            return await this.bucket.createFile(
                Appwrite.BucketID,
                ID.unique(),
                file
            )
        } catch (error) {
            console.log("An Error Occured : ",error);
            return false;
        }
    }

    async DeleteFile(fileId){
        try {
            await this.bucket.deleteFile(
                Appwrite.BucketID,
                fileId
            )
            return true
        } catch (error) {
            console.log("An Error Occured : ", error);
            return false
        }
    }

    FilePreview(fileId){
        return this.bucket.getFileView(
            Appwrite.BucketID,
            fileId
        );
    }
}

let PostsService = new Posts();

export default PostsService