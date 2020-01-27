export interface DateOfBirthInterface {
    year: number;
    month: number;
    day: number;
}

interface EmployeeInterface {
    id?: number;
    name: string;
    dateOfBirth: DateOfBirthInterface;
    salary: number;
    skills: string[];
    photoUrl?: string;
}

export default EmployeeInterface;
