import mongoose from 'mongoose';

const complaintSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  status: {
    type: String,
    enum: ['pending', 'closed', 'escalated'],
    default: 'pending'
  },
  assignedTo: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    default: null
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
},
{
  timestamps: true,
}
);

export default mongoose.model('Complaint', complaintSchema);
