import mongoose from "mongoose";


async function connect(){
    try {
        mongoose.connect(process.env.MONGO_URL)
        const connection = mongoose.connection

        connection.on("connected", ()=>{
            console.log("Connected With DB")
        })
        connection.on("error", ()=>{
            console.log("Faild to connect with DB")
            process.exit()
        })
        
    } catch (error) {
        console.log("Something went wrong!!")
        console.log(error)
    }
}

export default connect