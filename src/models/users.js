const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const userSchema = new mongoose.Schema({
fname:String,
lname:String,
email:String,
password:String,
empid:{
    type:Number,
    unique:true
},
orgname:String
})
userSchema.pre("save",async function(next){
    if(this.isModified("password")){
        console.log(`your current password is ${this.password}`);
        this.password = await bcrypt.hash(this.password,10);
        console.log(`your current password is ${this.password}`);
    }
    next();
})
const Employee = new mongoose.model("Employee",userSchema);
module.exports=Employee;
//fn , ln , e id , pass , unique EMPLOYEE id , organisation name 