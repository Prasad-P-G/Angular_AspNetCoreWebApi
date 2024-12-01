import {
  Component,
  ElementRef,
  inject,
  OnInit,
  ViewChild,
} from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { EmployeeService } from '../../Services/employee.service';
import { Employee } from '../../Models/Employee';

@Component({
  selector: 'app-employee',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './employee.component.html',
  styleUrl: './employee.component.css',
})
export class EmployeeComponent implements OnInit {
  @ViewChild('employeeModel') employeeModel: ElementRef | undefined;

  employeeformGroup: FormGroup = new FormGroup({});
  empService = inject(EmployeeService);

  employees: Employee[] = [];

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    console.log('onInit called..');
    this.setFormState();
    this.getEmployees();
  }

  //Get All Employees
  getEmployees() {
    //debugger;
    this.empService.GetAllEmployees().subscribe((res) => {
      this.employees = res;
    });
  }

  setFormState() {
    this.employeeformGroup = this.fb.group({
      id: [0],
      name: ['', Validators.required],
      email: ['', Validators.required],
      mobile: ['', Validators.required],
      age: ['', Validators.required],
      salary: ['', Validators.required],
      status: [false, Validators.required],
    });
  }
  openModel() {
    // const empModel = document.getElementById('employeeModel');
    // if(empModel!=null)
    // {
    //   empModel.style.display = 'block'
    // }

    if (this.employeeModel != null) {
      this.employeeModel.nativeElement.style.display = 'block';
    }
  }

  closeModel() {
    if (this.employeeModel != null) {
      this.employeeModel.nativeElement.style.display = 'none';
      this.employeeformGroup.reset();
    }
  }

  formValue: any;

  on_Submit() {
    alert('clicked submit');
    try {
      console.log(this.employeeformGroup.value);
      debugger;
      if (this.employeeformGroup.invalid) {
        alert('Please fill all fields!');
        return;
      }
      this.formValue = this.employeeformGroup.value;
      this.formValue.id = 0;
      this.empService.AddEmployee(this.formValue).subscribe((res) => {
        this.getEmployees();
        // this.employeeformGroup.reset();
        this.setFormState();
        this.closeModel();
      });
    } catch (error) {
      console.log(error);
    }
  }
}
