import bcrypt from  'bcrypt';

export const hashPassword = async(password) =>{
    try {
        const saltRounds = 5
        const hashedPassword = await bcrypt.hash(password, saltRounds )
        return hashedPassword
    } catch (error) {
        console.log(error)
    }
};
 export const comparPassword =  async(password, hashedPassword) =>{
    return bcrypt.compare(password,hashedPassword)
 }