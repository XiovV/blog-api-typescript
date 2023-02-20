import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'

export default function userAuth(req: Request, res: Response, next: NextFunction) {
    const authHeader = req.headers["authorization"]
    const authHeaderSplit = authHeader?.split(' ')

    if (authHeaderSplit?.length != 2) {
        res.status(403).json({ msg: "invalid authorization header format" })
        return
    }

    const token = authHeaderSplit[1]

    let decodedToken: string | jwt.JwtPayload
    try {
        decodedToken = jwt.verify(token, 'testingsecret')
    } catch (error) {
        res.status(403).json({ msg: "invalid token" })
        return
    }
    
    if (!isJwtPayload(decodedToken)) {
        console.log('decodedToken is not jwt.JwtPayload')
        res.status(500).json({msg: "internal server error"})
        return
    }

    res.locals.userId = decodedToken['userId']

    next()
}

const isJwtPayload = (toBeDetermined: any | jwt.JwtPayload): toBeDetermined is jwt.JwtPayload => {
    return !!(toBeDetermined as jwt.JwtPayload)
}