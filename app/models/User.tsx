import mongoose, { Document, Schema } from 'mongoose';

interface IAssistant {
    assistant_id: string;
    name : string;
    backStory: string;
}

interface IUser extends Document {
    email: string;
    password: string;
    assistants: IAssistant[];
}

const AssistantSchema = new Schema<IAssistant>({
    assistant_id: { type: String, required: true },
    name:{ type: String, required: true },
    backStory: { type: String, required: true },
});

const UserSchema = new Schema<IUser>({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    assistants: [AssistantSchema],
});

export default mongoose.models.User || mongoose.model<IUser>('User', UserSchema);
