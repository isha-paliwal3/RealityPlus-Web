import mongoose, { Document, Schema } from 'mongoose';

interface IAssistant {
    name: string;
    specialSkills: string[];
    backStory: string;
    // fileUrl?: string;
}

interface IUser extends Document {
    email: string;
    password: string;
    assistants: IAssistant[];
}

const AssistantSchema = new Schema<IAssistant>({
    name: { type: String, required: true },
    specialSkills: [{ type: String }],
    backStory: { type: String, required: true },
    // fileUrl: { type: String },
});

const UserSchema = new Schema<IUser>({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    assistants: [AssistantSchema],
});

export default mongoose.models.User || mongoose.model<IUser>('User', UserSchema);
