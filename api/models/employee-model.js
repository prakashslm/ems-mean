import { Schema, model } from 'mongoose';

const employee = new Schema({
    firstname: String,
    lastname: String,
    email: {
        type: String,
        trim: true,
        index: {
            unique: true,
            dropDups: true
        },
    },
    salary: Number,
    dob: String,
    status: {
        type: String,
        lowercase: true,
        trim: true,
        default: 'on',
    },
    created_on: { type: Date, default: Date.now },
    updated_on: { type: Date, default: Date.now },
});

export const Employee = model('employee', employee);
