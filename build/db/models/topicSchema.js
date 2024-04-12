import mongoose from 'mongoose';
const topicSchema = new mongoose.Schema({
    skill: {
        type: String,
        enum: ['grammar', 'vocabulary'],
        required: true,
    },
    name: {
        type: String,
        required: true,
        unique: true,
    },
});
export default topicSchema;
//# sourceMappingURL=topicSchema.js.map