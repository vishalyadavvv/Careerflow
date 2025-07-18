import mongoose from 'mongoose';

const jobSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    company: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    location: {
      type: String,
      required: true,
      trim: true,
    },
    salaryRange: {
      type: String,
    },
    jobType: {
      type: String,
      required: true,
      enum: ['Full-time', 'Part-time', 'Contract', 'Internship'],
    },
    experienceLevel: {
      type: String,
      required: true,
      enum: ['Entry-level', 'Mid-level', 'Senior-level', 'Director', 'Executive'],
    },
    description: {
      type: String,
      required: true,
    },
    requirements: {
      type: String,
      required: true,
    },
    responsibilities: {
      type: String,
    },
    skillsRequired: {
      type: [String],
    },
    postedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    applicants: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Application',
      },
    ],
    status: {
      type: String,
      enum: ['Active', 'Closed', 'Draft'],
      default: 'Active',
    },
    expiresAt: {
      type: Date,
    },
  },
  {
    timestamps: true,
  }
);

const Job = mongoose.model('Job', jobSchema);

export default Job;
