import { checkSchema } from "express-validator";

const CreateEmployeeValidator = checkSchema({
    name: {
        isString: true,
    },
    salary: {
        isNumeric: true,
    },
    dateOfBirth: {},
    skills: {
        isArray: true,
    },
});

export default CreateEmployeeValidator;
