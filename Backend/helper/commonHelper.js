const bcrypt= require('bcrypt');

const hashedPassword= async (password)=>{
    const saltround=10;
    return await bcrypt.hash(password,saltround);
};

const comparePassword= async (enteredPassword, storedPassword)=>{
    return await bcrypt.compare(enteredPassword, storedPassword);
}
module.exports={ hashedPassword, comparePassword };