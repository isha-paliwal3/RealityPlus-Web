import mongoose, { Document, Schema } from 'mongoose';

interface IAssistant {
    assistant_id: string;
    // specialSkills: string[];
    backStory: string;
    // fileUrl?: string;
}

interface IUser extends Document {
    email: string;
    password: string;
    assistants: IAssistant[];
}

const AssistantSchema = new Schema<IAssistant>({
    assistant_id: { type: String },
    backStory: { type: String, required: true },
    // fileUrl: { type: String },
});

const UserSchema = new Schema<IUser>({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    assistants: [AssistantSchema],
});

export default mongoose.models.User || mongoose.model<IUser>('User', UserSchema);
