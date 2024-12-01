import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Employee } from '../Models/Employee';

@Injectable({
  providedIn: 'root',
})
export class EmployeeService {
  private apiBaseUrl = 'https://localhost:7037/api/employee';

  constructor() {}

  empService = inject(HttpClient);

  GetAllEmployees() {
    return this.empService.get<Employee[]>(`${this.apiBaseUrl}`);
  }

  AddEmployee(employee: any) {
    debugger;
    return this.empService.post(`${this.apiBaseUrl}`, employee);
  }
}
