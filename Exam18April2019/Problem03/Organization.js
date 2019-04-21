class Organization{
    constructor(name, budget){
        this.name = name;
        this.budget = +budget;
        this.employees = [];

        this.departmentsBudget = {
            marketing: 0.4 * this.budget,
            finance: 0.25 * this.budget,
            production: 0.35 * this.budget
        }
    }
    get departmentsBudget(){
        return this._departmentsBudget;
    }
    set departmentsBudget(departmentsBudget){
        this._departmentsBudget = departmentsBudget;
    }
    add(employeeName, department, salary){
        if(+this.departmentsBudget[department] < +salary){
            return `The salary that ${department} department can offer to you Mr./Mrs. ${employeeName} is $${this.departmentsBudget[department]}.`;
        }else{
            let employee = {
                employeeName: employeeName,
                department: department,
                salary: +salary
            }
            this.employees.push(employee);
            this.departmentsBudget[department] -= Number(salary);
            return `Welcome to the ${department} team Mr./Mrs. ${employeeName}.`;
        }
    }
    employeeExists(employeeName){
        let filtered = this.employees.filter(e => e.employeeName === employeeName);
        if(filtered.length === 0){
            return `Mr./Mrs. ${employeeName} is not working in ${this.name}.`;
        }else {
            let existedObj = filtered[0];
            return `Mr./Mrs. ${employeeName} is part of the ${existedObj.department} department.`;
        }
    }
    leaveOrganization(employeeName){
        let filtered = this.employees.filter(e => e.employeeName === employeeName);
        if(filtered.length === 0){
            return `Mr./Mrs. ${employeeName} is not working in ${this.name}.`;
        }else{
            this.employees = this.employees.filter(e => e.employeeName !== employeeName);
            let leavedObj = filtered[0];
            let dep = leavedObj.department;
            let sal = leavedObj.salary;
            this.departmentsBudget[dep] += sal;
            return `It was pleasure for ${this.name} to work with Mr./Mrs. ${employeeName}.`;
        }
    }
    status(){
        let marketingEmployees = this.employees.filter(e => e.department === 'marketing');
        let financeEmployees = this.employees.filter(e => e.department === 'finance');
        let productionEmployees = this.employees.filter(e => e.department === 'production');

        let sortedMarketingEmployees = marketingEmployees.sort((a, b) => b.salary - a.salary);
        let sortedFinanceEmployees = financeEmployees.sort((a, b) => b.salary - a.salary);
        let sortedProductionEmployees = productionEmployees.sort((a, b) => b.salary - a.salary);

        let output = '';
        output += `${this.name.toUpperCase()} DEPARTMENTS:`;
        output += `\nMarketing | Employees: ${sortedMarketingEmployees.length}: ${sortedMarketingEmployees.map(e => e.employeeName).join(', ')} | Remaining Budget: ${this.departmentsBudget['marketing']}`;
        output += `\nFinance | Employees: ${sortedFinanceEmployees.length}: ${sortedFinanceEmployees.map(e => e.employeeName).join(', ')} | Remaining Budget: ${this.departmentsBudget['finance']}`;
        output += `\nProduction | Employees: ${sortedProductionEmployees.length}: ${sortedProductionEmployees.map(e => e.employeeName).join(', ')} | Remaining Budget: ${this.departmentsBudget['production']}`;

        return output;
    }
}

let organization = new Organization('SoftUni', 20000);

console.log(organization.add('Peter', 'marketing', 1200));
console.log(organization.add('Robert', 'production', 2000));

console.log(organization.employeeExists('Peter'))








