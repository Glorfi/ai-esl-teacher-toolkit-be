import mongoose from 'mongoose';
const sentenceSchema = new mongoose.Schema({
    sentence: {
        type: String,
        required: true,
    },
    answer: {
        type: String,
        required: true,
    },
    hint: { type: String },
    options: [{ type: String }],
    exercise: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'exercises',
    },
});
export default sentenceSchema;
//# sourceMappingURL=sentenceSchema.js.map