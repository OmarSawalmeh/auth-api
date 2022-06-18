'use strict';

module.exports = (action)=>{
    return(req, res, next)=>{
        try{
            if(req.user.capabilities.includes(action)){
                next();
            }
            else{
                next('Access Denied');
            }

        }catch (error){
            next('invalid login')
        }
    }
}