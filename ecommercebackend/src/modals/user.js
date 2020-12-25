const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const UserSchema = mongoose.Schema({
    firstName:{
        type:String,
        require:true,
        trim:true,
        min:3,
        max:20
    },
    lastName:{
        type:String,
        require:true,
        trim:true,
        min:3,
        max:20
    },
    username:{
        type:String,
        require:true,
        trim:true,
        unique:true,
        index:true,
        lowercase:true

    },
    email:{
        type:String,
        require:true,
        trim:true,
        index:true,
        lowercase:true

    },
    hash_password:{
        type:String,
        require:true
    },
    role:{
        type:String,
        enum:['user','admin'],
        default:'admin'
    },
    contactNumber:{type:String},
    profilePicture:{type:String}
},{timestamps:true});
UserSchema.virtual('fullName').get(function(){
    return `${firstName} ${lastName}`
})
UserSchema.virtual('password').set(function(password){
    this.hash_password=bcrypt.hashSync(password, 10);
})

UserSchema.methods={
    authenticat:function(password){
        return bcrypt.compareSync(password, this.hash_password)
    }

}

module.exports=mongoose.model('User',UserSchema);
