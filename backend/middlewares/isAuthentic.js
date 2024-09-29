import jwt from "jsonwebtoken"

const isAuthentic = async (req, res,next)=> {
    try{
        const token = req.cookies.token;
        if(!token){
            return res.status(401).json({
                message:"User not authenticated",
                success:false
            })
        }
        const decode = await jwt.verify(token, process.env.SECRETE_KEY);
        if(!decode){
            return res.status(401).json({
                message:"User token not found",
                success:false,
            })
        };
        req.id = decode.userId;
        next();

    }catch(error){
        console.log(error)
    }
}

export default isAuthentic;