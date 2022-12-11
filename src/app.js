const express = require("express");
const app = express();
const path = require("path");
const viewPath = path.join(__dirname,"../templates/views");
const bcrypt = require("bcryptjs");
app.use(express.json());
app.use(express.urlencoded({extended:false}));
require("./db/conn");
const Employee = require("./models/users");
app.set("view engine","hbs");
app.set("views",viewPath);
app.get("/",(req,res)=>{
    res.status(201).render("register")
})
app.post("/register",async(req,res)=>{
    const createEmployee = new Employee({
        fname:req.body.firstname,
        lname:req.body.lastname,
        email:req.body.email,
        password:req.body.password,
        empid:req.body.employeeID,
        orgname:req.body.orgname
    })
    const saveEmployee = await createEmployee.save();
    res.status(201).send(saveEmployee);
})
app.get("/login",(req,res)=>{
    res.status(201).render("login");
})
app.post("/login",async(req,res)=>{
    try{
        const email = req.body.email;
        const userPassword = req.body.password;
        const finduser = await Employee.findOne({email:email});
        const isMatch = await bcrypt.compare(userPassword,finduser.password);
        if(isMatch){
            const empdata = await Employee.find();
            res.status(201).send(empdata);
        }
        else{
            res.status(400).send("invalid password");
        }
    }catch(e){
        res.status(400).send("invalid details")
    }

})
app.listen(8000,()=>{console.log("listening to port")});