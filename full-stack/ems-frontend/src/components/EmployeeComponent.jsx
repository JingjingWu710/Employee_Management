import React, { useEffect, useState } from 'react'
import { createEmployee, getEmployee, updateEmployee } from '../services/EmployeeService'
import { useNavigate, useParams } from 'react-router-dom'
import { getAllDepartments } from '../services/DepartmentService';

const EmployeeComponent = () => {

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [departmentId, setDepartmentId] = useState('')
    const [departments, setDepartments] = useState([])

    useEffect(() => {
        getAllDepartments().then((response) => {
            setDepartments(response.data);
        }).catch(error => {
            console.error(error);
        })
    }, [])

    const {id} = useParams();
    const [error, setError] = useState({
        firstName: '',
        lastName: '',
        email: '',
        department: ''
    })

    const navigator = useNavigate();

    useEffect(() => {

        if(id){
            getEmployee(id).then((response) => {
                setFirstName(response.data.firstName);
                setLastName(response.data.lastName);
                setEmail(response.data.email);
                setDepartmentId(response.data.departmentId)
            }).catch(error => {
                console.log(error);
            })
        }

    }, [id])

    function saveOrUpdateEmployee(e) {
        e.preventDefault();

        if (validateForm()) {

            const employee = { firstName, lastName, email, departmentId };
            console.log(employee);

            if(id){
                updateEmployee(id, employee).then((response) => {
                    console.log(response.data);
                    navigator('/employees');
                }).catch(error => {
                    console.error(error);
                })
            } else {
                createEmployee(employee).then((response) => {
                    console.log(response.data);
                    navigator('/employees');
            }).catch(error => {
                console.error(error);
            })
            }
        }

    }

    function validateForm() {
        let valid = true;

        const errorCopy = { ...error }

        if (firstName.trim()) {
            errorCopy.firstName = '';
        } else {
            errorCopy.firstName = 'First name is required';
            valid = false;
        }
        if (lastName.trim()) {
            errorCopy.lastName = '';
        } else {
            errorCopy.lastName = 'Last name is required';
            valid = false;
        }
        if (email.trim()) {
            errorCopy.email = '';
        } else {
            errorCopy.email = 'Email is required';
            valid = false;
        }

        if (departmentId) {
            errorCopy.department = ''
        }else {
            errorCopy.department = 'Select Department';
            valid = false;
        }

        setError(errorCopy);
        return valid;
    }

    function pageTitle(){
        if (id) {
            return <h2 className='text-center'>Update Employee</h2>
        } else{
            return <h2 className='text-center'>Add Employee</h2>
        }
    }

    return (
        <div className='container col-md-6 offset-md-3 offset-md-3'>
            <br /><br />
            <div className='row'>
                <div className='card'>
                    {
                        pageTitle()
                    }
                    <div className='card-body'>
                        <form>
                            <div className='form-group mb-2'>
                                <label className='form-label'>First Name:</label>
                                <input
                                    type='text'
                                    placeholder='Enter Employee First Name'
                                    name='firstName'
                                    value={firstName}
                                    className={`form-control ${ error.firstName ? 'is-invalid':'' }` }
                                    onChange={(e) => setFirstName(e.target.value)}
                                >
                                </input>
                                { error.firstName && <div className='invalid-feedback'> { error.firstName } </div>}
                            </div>
                            <div className='form-group mb-2'>
                                <label className='form-label'>Last Name:</label>
                                <input
                                    type='text'
                                    placeholder='Enter Employee Last Name'
                                    name='lastName'
                                    value={lastName}
                                    className={`form-control ${ error.lastName ? 'is-invalid':'' }` }
                                    onChange={(e) => setLastName(e.target.value)}
                                >
                                </input>
                                { error.lastName && <div className='invalid-feedback'> { error.lastName } </div>}
                            </div>
                            <div className='form-group mb-2'>
                                <label className='form-label'>Email:</label>
                                <input
                                    type='text'
                                    placeholder='Enter Employee Email'
                                    name='email'
                                    value={email}
                                    className={`form-control ${ error.email ? 'is-invalid':'' }` }
                                    onChange={(e) => setEmail(e.target.value)}
                                >
                                </input>
                                { error.email && <div className='invalid-feedback'> { error.email } </div>}
                            </div>

                            <div className='form-group mb-2'>
                                <label className='form-label'>Select Department:</label>
                                <select
                                    className={`form-control ${ error.department ? 'is-invalid':'' }` }
                                    value={departmentId}
                                    onChange={(e) => setDepartmentId(e.target.value)}
                                >
                                    <option value='Select Department'>Select Department</option>
                                    {
                                        departments.map( department => 
                                            <option key={department.id} value={department.id}>{department.departmentName}</option>
                                        )
                                    }
                                </select>
                                { error.department && <div className='invalid-feedback'> { error.department } </div>}
                            </div>

                            <button className='btn btn-primary' onClick={saveOrUpdateEmployee}>Submit</button>
                        </form>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default EmployeeComponent