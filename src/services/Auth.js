import { Client , Account , ID } from "appwrite"
import Appwrite from "../conf/Config";

class AppwriteAuthService {
    client = new Client();
    account;

    constructor() {
        this.client.setEndpoint(Appwrite.EndPoint).setProject(Appwrite.ProjectID);
        this.account = new Account(this.client);
    }

    async CreateAccount({email,password,name}) {
        try {
            let response = await this.account.create(ID.unique() , email , password , name);
            if(response) {
                return this.Login({email , password});
            }
            else {
                return response;
            }
        }
        catch(error) {
            throw error;
        }
    }

    async Login({email , password}) {
        try {
            return await this.account.createEmailPasswordSession(email , password);
        } catch (error) {
            throw error;
        }
    }

    async Logout() {
        try {
            return await this.account.deleteSessions();
        } catch (error) {
            console.log("An Error Occured : ",error);
            return false;
        }
    }

    async GetCurrentUser() {
        try {
            return await this.account.get();
        } catch (error) {
            if (error.code === 401) {  //This for expected error if no session already active
                return null;
              } else {
                console.error("Unexpected Appwrite error:", error);
            }
        }
        return null;
    }

    async GetUser(ID) {
        try {
            return await this.account.get(ID);
        } catch (error) {
            console.log("An Error Occured : ",error);
        }
        return null;
    }
}

let AuthService = new AppwriteAuthService();

export default AuthService;