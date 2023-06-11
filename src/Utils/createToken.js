import jwt from "jsonwebtoken";

// jwt.sign({dato que se desea guardar}, secret, {tiempo de expiracion en seg });
const createToken = (id, expiration) => {
    return jwt.sign({ id: id }, process.env.JWT_SECRET, { expiresIn: expiration });
}

export default createToken;