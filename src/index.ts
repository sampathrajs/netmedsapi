/**
 * Create an end to end web application with crud functionality for employee dashboard.

Employee attributes
1. Employee id(auto gen one up sequence number)
2. Name
3. Date of birth
4. Salary
5. Skills (multiple checkboxes)(skill 1 to skill 10)
6. Attach photo (optional)

All data mandatory and should be validated before saving. Below should be the dashboard screens:
1. Employee list screen with pagination and search
2. Add employee screen
3. Edit employee screen
4. Delete employee function in list screen and edit screen

Required a node application with  front end and any  database (local/cloud) preferable PostgreSQL or mongoDB.
The assignment would be evaluated on the basis of seamless UI and UX and API structure.
 */

import "./utils/InitializeEnv";
import App from "./App";
import EmployeeController from "./Controllers/Employee/Employee.Controller";

const app = new App({
    controllers: [new EmployeeController()],
});

app.listen();
