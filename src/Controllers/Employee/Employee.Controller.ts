import { Router, Request, Response, RequestHandler } from "express";
import EmployeeExceptions from "./Employee.Exceptions";
import InternalErrorException from "../../utils/Errors/InternalError.Exception";
import RegisterRouteValidator from "./Validators/Create";
import EmployeeService from "../../Services/Employee.Service";
import EmployeeInterface from "../../Interfaces/Employee.Interface";
import { ValidationErrorMiddleware } from "../../Middlewares/ValidationError";

class EmployeeController {
    public path: string = "/employee";
    public router: Router = Router();
    private middlewares: RequestHandler[];
    private employeeExceptions: EmployeeExceptions;
    private employeeService: EmployeeService;

    public constructor(middlewares: RequestHandler[] = []) {
        this.middlewares = middlewares;
        this.employeeExceptions = new EmployeeExceptions();
        this.employeeService = new EmployeeService();
        this.intializeMiddlewares();
        this.intializeRoutes();
    }

    private intializeMiddlewares(): void {
        this.middlewares.forEach((middleware): void => {
            this.router.use(middleware);
        });
    }

    private intializeRoutes(): void {
        this.router.post("/", RegisterRouteValidator, ValidationErrorMiddleware, this.createEmplyee);
        this.router.get("/", this.getEmployees);
        this.router.get("/:id", this.getEmployeeById);
        this.router.delete("/:id", this.deleteEmployeeById);
        this.router.put("/:id", this.updateEmployeeById);
    }

    private createEmplyee = async (request: Request, response: Response): Promise<void> => {
        const { name, salary, dateOfBirth, skills, photoUrl } = request.body as EmployeeInterface;
        try {
            const data = await this.employeeService.createEmployee({ name, salary, dateOfBirth, skills, photoUrl });
            response.json({
                success: true,
                data,
            });
        } catch (error) {
            InternalErrorException(response, error);
        }
    };

    private getEmployees = async (request: Request, response: Response): Promise<void> => {
        try {
            const data = await this.employeeService.getEmployees();
            response.json({
                success: true,
                data,
            });
        } catch (error) {
            InternalErrorException(response, error);
        }
    };

    private getEmployeeById = async (request: Request, response: Response): Promise<void> => {
        try {
            const id = parseInt(request.params.id);
            const data = await this.employeeService.getEmployeeById(id);
            response.json({
                success: true,
                data,
            });
        } catch (error) {
            InternalErrorException(response, error);
        }
    };

    private deleteEmployeeById = async (request: Request, response: Response): Promise<void> => {
        try {
            const id = parseInt(request.params.id);
            const data = await this.employeeService.deleteEmployeeById(id);
            response.json({
                success: true,
                data,
            });
        } catch (error) {
            InternalErrorException(response, error);
        }
    };

    private updateEmployeeById = async (request: Request, response: Response): Promise<void> => {
        try {
            const id = parseInt(request.params.id);
            const { name, salary, dateOfBirth, skills, photoUrl } = request.body as EmployeeInterface;
            const data = await this.employeeService.updateEmployeeById({
                id,
                name,
                salary,
                dateOfBirth,
                skills,
                photoUrl,
            });

            response.json({
                success: true,
                data,
            });
        } catch (error) {
            InternalErrorException(response, error);
        }
    };
}

export default EmployeeController;
