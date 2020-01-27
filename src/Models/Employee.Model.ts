import Mongoose, { Schema, Document, model } from "mongoose";
import EmployeeInterface from "../Interfaces/Employee.Interface";

const AutoIncrement = require("mongoose-sequence")(Mongoose);

const employeeSchema = new Schema(
    {
        _id: {
            type: Number,
        },
        createdAt: {
            type: Number,
            default: Date.now(),
            required: false,
        },
        name: {
            type: String,
            required: true,
        },
        dateOfBirth: {
            type: {
                year: Number,
                month: Number,
                day: Number,
            },
            required: true,
        },
        salary: {
            type: Number,
            required: true,
        },
        skills: {
            type: [String],
            required: true,
        },
        photoUrl: {
            type: String,
            required: false,
        },
    },
    { _id: false },
);
// eslint-disable-next-line @typescript-eslint/camelcase
employeeSchema.plugin(AutoIncrement);
employeeSchema.set("toJSON", {
    transform: (doc: EmployeeInterface & Document, ret: EmployeeInterface & Document): void => {
        ret.id = doc._id;
        delete ret.__v;
        delete ret._id;
    },
});

const employeeModel = model<EmployeeInterface & Document>("employee", employeeSchema);

export default employeeModel;
