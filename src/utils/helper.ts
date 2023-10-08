import bcrypt from "bcrypt";

const generateSalt = () => {

    const saltRounds = 10;
   return bcrypt.genSalt(saltRounds);
}

export const hashPassword = async (plainPassword: string) => {
    const salt = await generateSalt()
    return bcrypt.hash(plainPassword,  salt)
}

export const verifyPassword = async (plainPassword:string, hashPassword: any) => {
    return bcrypt.compare(plainPassword, hashPassword);
}