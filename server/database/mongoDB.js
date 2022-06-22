import mongoose from "mongoose";

const Connection = async (username = 'distributed-text-editor-user', password = 'distributed-text-editor-user') => {
    
    const URL = `mongodb+srv://${username}:${password}@distributed-text-editor.gdjffbc.mongodb.net/?retryWrites=true&w=majority`;
    try{
        await mongoose.connect(URL, {useUnifiedTopology: true, useNewUrlParser: true});
        console.log("connected to db");
    }catch (error){
        console.log('couldnt connect to db ', error);
    }

}

export default Connection;