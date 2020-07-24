const Joi = require('joi');
const mongoose = require('mongoose');

const User = mongoose.model('User', new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 50
    },
    email:{
        type: String,
        required: true,
        minlength: 10,
        maxlength: 255,
        unique: true
    },
    password:{
        type: String,
        required: true,
        minlength: 5,
        maxlength: 1024
    }
}));

function validateGenre(user) {
  //const pattern = new RegExp("/(?=.*[a-z])(?=.*[A-Z])(?=.*d)(?=.*[$@$!#.])/");
  //const pattern = "/(?=.*[a-z])/";
  // const mediumRegex = new RegExp("^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9]))|(?=.*[!@#$%^&*]))(?=.{6,})");
  //const pattern = new RegExp("/^(?=.*[a-z]) (?=.*[A-Z])	(?=.*[0-9]) (?=.*[!@#$%^&*]) (?=.{5,})/");
  var mediumRegex = new RegExp(/^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{5,255}$/);
  //confuse with the pattern? read here : https://www.youtube.com/watch?v=FZ7kV3ZzD38
  //worked : https://www.w3resource.com/javascript/form/password-validation.php
  //ref1: https://stackoverflow.com/questions/14850553/javascript-regex-for-password-containing-at-least-8-characters-1-number-1-uppe
  //ref2: https://stackoverflow.com/questions/51596779/joi-regex-is-not-recognized-as-regex-pattern
  //ref3: https://medium.com/@rossbulat/joi-for-node-exploring-javascript-object-schema-validation-50dd4b8e1b0f
  const schema = {
    name: Joi.string().min(5).max(50).required(),
    email: Joi.string().min(10).max(255).required().email(),
    password: Joi.string().min(5).max(255).regex(RegExp(mediumRegex)).required().error( (ex) => {
      return{
        message: 'The password should be contain atleat 1 lower and uppercase alphabetical character, 1  numeric character, 1 special  and 5 character long!'
      }
    })
  };

  return Joi.validate(user, schema);
}

exports.User = User; 
exports.validate = validateGenre;