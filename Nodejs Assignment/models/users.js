const mongoose=require('mongoose');
const validator=require('validator');
const bcrypt=require('bcryptjs')
const jwt=require('jsonwebtoken')

//Creating user schema
const userSchema= new mongoose.Schema({
    name:{
        type:String,
        required: true,
        trim: true
    },
    email:{
        type: String,
        unique: true,
        required: true,
        trim: true,
        lowercase: true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error('Enter valid Email')
            }
        }
    },
    password: {
        type: String,
        required: true,
        minlength: 7,
        trim: true,
        validate(value) {
            if (value.toLowerCase().includes('password')) {
                throw new Error('Password "password" nhi rakhte')
            }
        }
    },
    role:{
        type: String,
        trim: true,
        default: 'customer'
    },
    tokens: [{
        token: {
            type: String,
            required: true
        }
    }]},{ 
        timestamps: true
    
})


//Creating a method for generating jwt tokens 
userSchema.methods.generateAuthToken = async function () {
    const user = this
    const token = jwt.sign({ _id: user._id.toString(),role: user.role, expiresIn:'3000s'}, 'bookstore')
    user.tokens = user.tokens.concat({ token })
    await user.save() // this was saving token again and again.. now not

    return token
}


//Creating a static method to validate a user's credentials
userSchema.statics.findByCredentials = async (email, password) => {
    const user = await User.findOne({ email })

    if (!user) {
        throw new Error('Unable to login')
    }
    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch) {
        throw new Error('Unable to login')
    }
    return user
}

//Middleware Function to hash the password before saving it to database
userSchema.pre('save', async function (next) {
    const user = this

    if (user.isModified('password')) {
        user.password = await bcrypt.hash(user.password, 8)
    }

    next()
})


const User=mongoose.model('User',userSchema)
module.exports=User;