import bcrypt from "bcryptjs";
import { Schema, model } from 'mongoose';
import crypto from 'crypto';

const userSchema = new Schema({
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true, select: false },
    roles: [{
        ref: "Rol",                 // referencia al modelo Rol
        type: Schema.Types.ObjectId,
        required: true
    }],
    passwordChangedAt: { type: Date, default: undefined },
    encryptedPasswordResetToken: String,
    passwordResetExpires: Date
}, {
    timestamps: true,
});

userSchema.methods.createResetPasswordToken = function(){
    
    const resetToken = crypto.randomBytes(32).toString("hex"); 
    // save the password encrypted in the DDBB
    this.encryptedPasswordResetToken = crypto.createHash('sha256').update(resetToken).digest('hex');
    this.passwordResetExpires = Date.now() + (10 * 60 * 1000); //  10 minutes in miliseconds

    return resetToken;
}

userSchema.methods.isPasswordChanged = async function (JwtTimeStamp) {

    if (this.passwordChangedAt) {
        // JwtTimeStamp is in seconds  // this.passwordChangedAt.getTime() is in miliseconds
        const pswrdChangedTimestamp = parseInt(this.passwordChangedAt.getTime() / 1000, 10); // return time in seconds

        const pswrdChanged = pswrdChangedTimestamp > JwtTimeStamp; // if password date is bigger than token date, that means the password has changed.
        return pswrdChanged;
    }
    return false;
}

userSchema.statics.encryptPassword = async (password) => {
    const salt = await bcrypt.genSalt(8);
    return await bcrypt.hash(password, salt); // devuelve el password encriptado
}

userSchema.statics.comparePassword = async (password, storedPassword) => {
    return await bcrypt.compare(password, storedPassword); // devuelve true o false
}

export default model("User", userSchema); 