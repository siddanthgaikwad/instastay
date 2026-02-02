import Bug from "../models/Bug.js"

export const bugPostController = async(request, response)=>{
    try{
        const {name,email,bug} = request.body;

        // Validate
        if(!name || !email || !bug){
            response.status(400).json({
                error: "All fields are required"
            });
        }

        const newBug = new Bug({
            email,
            bug
        });
        await newBug.save();

        return response.status(200).send({
            success : true,
            message: "Thanks for reporting.",
        })
    }
    catch(error){
        // console.log("Bug report error : ",error);
        response.status(500).send({
            success : false,
            error: "Error While reporting bug",
            error,
        })
    }
}

