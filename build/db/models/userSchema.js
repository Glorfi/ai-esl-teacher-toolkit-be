import mongoose from 'mongoose';
const userSchema = new mongoose.Schema({
    role: {
        type: String,
        enum: ['student', 'teacher', 'admin'],
        required: true,
        default: 'teacher',
    },
    email: {
        type: String,
        unique: true,
        required: true,
        trim: true,
        lowercase: true,
        match: [/^\S+@\S+\.\S+$/, 'Please enter a valid email address'],
    },
    password: {
        type: String,
        required: true,
        select: false,
    },
    exercises: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'exercises',
    },
});
export default userSchema;
//# sourceMappingURL=userSchema.js.map