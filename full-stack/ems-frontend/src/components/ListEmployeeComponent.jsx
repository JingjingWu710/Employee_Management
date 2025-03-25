import React, {useEffect, useState} from 'react'
import { deleteEmployee, listEmployees } from '../services/EmployeeService'
import { getDepartmentById } from '../services/DepartmentService';
import { useNavigate } from 'react-router-dom'

const ListEmployeeComponent = () => {

    const [employees, setEmployees] = useState([])
    const [departmentNames, setDepartmentNames] = useState({});
    const navigator = useNavigate();

    useEffect(() => {
        getAllEmployees();
    }, [])

    function getAllEmployees() {
        listEmployees().then((response) => {
            setEmployees(response.data);
        }).catch(error => {
            console.error(error)
        })
    }

    useEffect(() => {
        employees.forEach(employee => {
            if (employee.departmentId && !departmentNames[employee.departmentId]) {
                getDepartmentById(employee.departmentId)
                    .then(response => {
                        setDepartmentNames(prev => ({
                            ...prev,
                            [employee.departmentId]: response.data.departmentName
                        }));
                    })
                    .catch(error => {
                        console.error(error);
                    });
            }
        });
    }, [employees]);

    function addNewEmployee(){
        navigator('/add-employee')
    }

    function updateEmployee(id){
        navigator(`/edit-employee/${id}`)
    }

    function removeEmployee(id){
        console.log(id);

        deleteEmployee(id).then((response) => {
            getAllEmployees();
        }).catch(error => {
            console.error(error);
        })
    }

  return (
    <div className='container'>
        <h2 className='text-center' style={{ margin: "20px" }}>List of Employees</h2>
        <button type="button" className="btn btn-primary" onClick={addNewEmployee}
        style={{ margin: "20px" }}>Add Employee</button>
        <table className='table table-bordered table-hover'>
            <thead>
                <tr>
                    <th>Employee ID</th>
                    <th>Employee First Name</th>
                    <th>Employee Last Name</th>
                    <th>Employee Email</th>
                    <th>Department</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                {
                    employees.map(employee => 
                        <tr key={employee.id}>
                            <td>{employee.id}</td>
                            <td>{employee.firstName}</td>
                            <td>{employee.lastName}</td>
                            <td>{employee.email}</td>
                            <td>{departmentNames[employee.departmentId]}</td>
                            <td>
                                <button className='btn btn-info' onClick={() => updateEmployee(employee.id)}
                                    style={{margin:"10px"}}>Update</button>
                                <button className='btn btn-danger' onClick={() => removeEmployee(employee.id)}
                                    style={{margin:"10px"}}>Delete</button>
                            </td>
                        </tr>
                    )
                }
            </tbody>
        </table>
    </div>
  )
}

export default ListEmployeeComponent
