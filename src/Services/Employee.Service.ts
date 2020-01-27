import { Document, DocumentQuery } from "mongoose";
import EmployeeInterface from "../Interfaces/Employee.Interface";
import Employee from "../Models/Employee.Model";

class AuthService {
    public constructor() {}
    public createEmployee = (employee: EmployeeInterface): Promise<EmployeeInterface & Document> => {
        return new Employee({
            name: employee.name,
            dateOfBirth: employee.dateOfBirth,
            skills: employee.skills,
            photoUrl: employee.photoUrl,
            salary: employee.salary,
        }).save();
    };

    public getEmployees = (): DocumentQuery<(EmployeeInterface & Document)[], EmployeeInterface & Document, {}> => {
        return Employee.find();
    };

    public getEmployeeById = (
        id: number,
    ): DocumentQuery<EmployeeInterface & Document, EmployeeInterface & Document, {}> => {
        return Employee.findById(id);
    };
    public deleteEmployeeById = (
        id: number,
    ): DocumentQuery<EmployeeInterface & Document, EmployeeInterface & Document, {}> => {
        return Employee.findByIdAndDelete(id);
    };

    public updateEmployeeById = (
        employee: EmployeeInterface,
    ): DocumentQuery<EmployeeInterface & Document, EmployeeInterface & Document, {}> => {
        return Employee.findByIdAndUpdate(employee.id, { ...employee }, { upsert: false, new: true });
    };
}

export default AuthService;
