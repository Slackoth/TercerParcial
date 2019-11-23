var soccer = require('../models/soccerTeam');
var debug = require('debug')('tercer-parcial:user_controller');

const getAll = (req,res,next)=>{
    var perPage = Number(req.query.size) || 10;
    var page = req.query.page > 0 ? req.query.page : 0;

    var sortProperty = req.query.sortby || "createAt";
    var sort = req.query.sort || "desc";

    debug("Soccer list:", {size: perPage,page, sortby: sortProperty,sort});

    soccer.find({},"-login_count")
    .limit(perPage)
    .skip(perPage * page)
    .sort({[sortProperty]: sort})
    .then(teams=>{
        return res
        //.header('Access-Control-Allow-Origin','https://soccer-team-rest.herokuapp.com')
        .status(200).json(teams);
    })
    .catch(err=>{
        next(err)
        //return res.status(400).json({message: 'Invalid request'})
    });
}

const register = (req,res,next)=>{
    debug("New soccer team: ", {body: req.body});
    //terconsole.log(req.body.name);
    
    if(req.body.name == '') {
        return res.status(400).json({message: 'Invalid request'})
    }

    soccer.findOne({
        name: req.body.name
    }, "-login_count")
    .then(foundTeam=>{
        if (foundTeam) {
            debug("Equipo duplicado");
            throw new Error(`Equipo duplicado ${req.body.name}`);
        } else {
            let newTeam = new soccer({
                name: req.body.name,
                country: req.body.country || "",
                director: req.body.director || "",
                captain: req.body.captain,
                league: req.body.league
            });
            return newTeam.save();
        }
    })
    .then(team=>{
        console.log(team._id);
        
        return res
        .header('Location','/createdTeam/' + team._id)
        .status(201)
        .json({
            soccer_team: team.name
        });
    })
    .catch(err=>{
        next(err);
        //return res.status(400).json({message: 'Invalid request'})
    
    });
}

const getOne = (req,res,next)=>{
    debug('Search team: ', req.params);
    soccer.findOne({
        name: req.params.name
    }, '-login_count')
    .then(foundTeam=>{
        if (foundTeam) {
            return res.status(200).json(foundTeam);
        } else {
            return res.status(400).json(null);
        }
    })
    .catch(err=>{
        next(err);
    });
}

const update = (req,res,next)=>{
    debug("Update team: ", {
        username: req.params.name,
        ...req.body
    })
    let update = {
        ...req.body
    }

    if (req.params.name == '') {
        return res.status(400).json({message: 'Invalid request'})
    }

    soccer.findOneAndUpdate({
        name: req.params.name
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
        //return res.status(400).json({message: 'Invalid request'})
    });
}

const deleteTeam = (req, res, next) => {
    debug("Delete team: ", {
        name: req.params.name
    });

    if (req.params.name == '') {
        return res.status(400).json({message: 'Invalid request'})
    }
    
    soccer.findOneAndDelete({name: req.params.name})
    .then(data=>{
        console.log(data);
        
        if (data) res.status(200).json(data);

        else res.status(404).send();
    }).catch( err => {
        next(err);
        //return res.status(400).json({message: 'Invalid request'})
    })
}

module.exports = {register, getOne, getAll,update,deleteTeam};

