import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { useFormik } from 'formik';
import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router';
import { useSearchParams } from 'react-router-dom';
import * as Yup from 'yup';
import { port } from './port';



export function UpdatePassword() {
    let params = useLocation().search;
    let token = new URLSearchParams(params).get("token");
    let name = new URLSearchParams(params).get("name");
    // console.log(token);
    let navigate = useNavigate()
    let userValidation = Yup.object({
        password: Yup.string().required().min(6, "Password need 6 characters").max(10, "Password need less than 10 characters"),
        confirm_password: Yup.string().oneOf([Yup.ref('password'), null], 'Passwords must match')

    })
    const { handleChange, handleSubmit, errors } = useFormik({
        initialValues: {
            password: "",
            confirm_password: ""
        },
        validationSchema: userValidation,

        onSubmit: async (values) => {
            console.log(values);

            // console.log(window);
            let result = await fetch(`${port}/user/newpassword?token=${token}&name=${name}`, {
                method: "PUT",
                headers: {
                    "Content-type": "application/json"
                },
                body: JSON.stringify(values),
            })
            if (result.status == 200) {
                alert("SucessFully Password Updated")
            } else {
                alert("Something Wrong")
            }

        }
    })
    return (
        <form onSubmit={handleSubmit}>
            <h1> Welcome Aliens 🧟‍♀️🎉</h1>
            <TextField name="password" onChange={handleChange} color={errors.password ? "error" : "primary"} label={errors.password ? errors.password : "password"} variant="outlined" />
            <TextField name="confirm_password" color={errors.confirm_password ? "error" : "primary"} label={errors.confirm_password ? errors.confirm_password : " confirm password"} onChange={handleChange} variant="outlined" />

            <Button type="submit" variant="contained">Submit</Button>


        </form>

    );
}