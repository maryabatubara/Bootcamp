const Usser = require ('./../models/usser.model');
const{encrypt}=require('./helpers');
const uid = require('uid');

exports.usserList = (_, res) => 
    Usser.find({}, (error, result)=> {
        if(error) return res.status(500).json({error});
        return res.json({result});
    }).select('-password -salt');

exports.getUsserById = (req, res) => 
    Usser.findOne({_id:req.params.id},(error, result)=> {
        if(error) return res.status(500).json({error});
        return res.json({result});
    }). select('-password -salt');

exports.addUser=(req,res) =>{ 
    const salt = uid(10);
    req.body.password = encrypt(req.body.password,salt);
    req.body.salt=salt;
    Usser.create(req.body, (error,_)=>{
        if(error) return res.status(500).json({error});
        return res.json({result :'success'});
    });
};

exports.editUser=(req,res)=> {
    if(req.body.password) delete req.body.password;
    if(req.body.salt) delete req.body.password;
    Usser.findByIdAndUpdate({_id:req.params.id},req.body,{new:true},(error,result)=>{
        return res.json({result});
    });
};

exports.deleteUser = (req,res) =>
    Usser.deleteOne({_id:req.params.id},(error,_) =>{
        if(error) return res.status(500).json({error});
        return res.json({result:'success deleted'});
    });
    