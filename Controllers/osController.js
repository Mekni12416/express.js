const express = require('express');
const os = require('os');

module.exports.getOsInformation  = (req,res,next) => {
    try{
        const osInformation = {hostname:os.hostname() , type:os.type()};
        if(!osInformation){
            throw new Error("there is-no information from your os");
        }
        res.status(200).json(osInformation);


    }catch(error){
        res.status(500).json({message : error.message});
    }
  

}