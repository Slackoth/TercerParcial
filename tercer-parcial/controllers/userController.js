var user = require('../models/user');
var debug = require('debug')('tercer-parcial:user_controller');

const getOne = (req,res,next)=>{
    debug('Search User', req.params);
    user.findOne({
        username: req.params.username
    }, '-password -login_count')
    .then(foundUser=>{
        if (foundUser) {
            return res.status(200).json(foundUser);
        } else {
            return res.status(400).json(null);
        }
    })
    .catch(err=>{
        next(err);
    });
}

const getAll = (req,res,next)=>{
    var perPage = Number(req.query.size) || 10;
    var page = req.query.page > 0 ? req.query.page : 0;

    var sortProperty = req.query.sortby || "createAt";
    var sort = req.query.sort || "desc";

    debug("User list:", {size: perPage,page, sortby: sortProperty,sort});

    user.find({},"-password -login_count")
    .limit(perPage)
    .skip(perPage * page)
    .sort({[sortProperty]: sort})
    .then(users=>{
        return res.status(200).json(users);
    })
    .catch(err=>{
        next(err)
    });
}

const register = (req,res,next)=>{
    debug("New user: ", {body: req.body});

    user.findOne({
        username: req.body.username
    }, "-password -login_count")
    .then(foundUser=>{
        if (foundUser) {
            debug("Usuario duplicado");
            throw new Error(`Usuario duplicado ${req.body.username}`);
        } else {
            let newUser = new user({
                username: req.body.username,
                first_name: req.body.first_name || "",
                last_name: req.body.last_name || "",
                email: req.body.email,
                password: req.body.password
            });
            return newUser.save();
        }
    })
    .then(user=>{
        console.log(user._id);
        
        return res
        .header('Location','/createdUser/' + user._id)
        .status(201)
        .json({
            username: user.username,
            id: user._id
        });
    })
    .catch(err=>{
        next(err);
    });
}

const update = (req,res,next)=>{
    debug("Update user: ", {
        username: req.params.username,
        ...req.body
    })
    let update = {
        ...req.body
    }

    user.findOneAndUpdate({
        username: req.params.username
    }, update, {
        new: true
    })
    .then(updated=>{
        if (updated) {
            return res.status(200).json(updated)
        }
        else {
            return res.status(400).json(null);
        }
    })
    .catch(err=>{
        next(err);
    });
}

const deleteUser = (req, res, next) => {
    debug("Delete user: ", {
        username: req.params.username,
    });
    
    user.findOneAndDelete({username: req.params.username})
    .then(data=>{
        console.log(data);
        
        if (data) res.status(200).json(data);

        else res.status(404).send();
    }).catch( err => {
        next(err);
    })
}

module.exports = {getOne,getAll,register,update,deleteUser};