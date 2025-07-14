const Appwrite = {
    ProjectID : String(import.meta.env.VITE_APPWRITE_PROJECT_ID),
    EndPoint : String(import.meta.env.VITE_APPWRITE_ENDPOINT),
    DataBaseID : String(import.meta.env.VITE_APPWRITE_DATABASE_ID),
    BucketID : String(import.meta.env.VITE_APPWRITE_BUCKET_ID),
    CollectionID : String(import.meta.env.VITE_APPWRITE_COLLECTION_ID)
}

export default Appwrite