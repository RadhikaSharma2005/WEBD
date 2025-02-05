

const jwt = require('jsonwebtoken')


async function userMiddleware(req,res,next){

    try{const authorization = req.body.token;
        req.token = jwt.verify(authorization,process.env.JWT_KEY);

        next();
    }
    catch(e){

        res.status(400).send(e)
    }
}


module.exports = userMiddleware;