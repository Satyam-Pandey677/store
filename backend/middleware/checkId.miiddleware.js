import { isValidObjectId } from "mongoose";
import { ApiError } from "../utils/ApiError";

function checkId(req, res, next){
    if(isValidObjectId(req.params.id)){
        throw new ApiError(404, `invalid object of ${req.params.id}`)
    }
    next()
}

export default checkId