import mongoose from "mongoose";

const Connection = async (URL) => {
    
    try{
        await mongoose.connect(URL, {useUnifiedTopology: true, useNewUrlParser: true});
        console.log("connected to db");
    }catch (error){
        console.log('couldnt connect to db ', error);
    }

}

export default Connection;