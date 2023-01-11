import { ErrorSharp } from '@mui/icons-material';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { useFormik } from 'formik';
import { useNavigate } from 'react-router';
import * as Yup from 'yup';
import { port } from './port';

export function Signup() {
    let navigate = useNavigate()
    let userValidation = Yup.object({
        name: Yup.string().min(5, "Name Should Be More Than 5 Characters").max(15, "Name Should Have Lessthan 15 Character").required("Name"),
        password: Yup.string().min(5, "Password Need To Be More Than 8 Character ").max(15, "Password Need To Be Less Than 8 Character ").required("Password"),
        email: Yup.string().email("Invalid Email ").required("Email"),

    })
    let { handleChange, handleSubmit, errors, toched } = useFormik({
        initialValues: {
            name: "",
            password: "",
        },
        validationSchema: userValidation,
        onSubmit: (async (val) => {
            let result = await fetch(`${port}/user/signup`, {
                method: "POST",
                headers: {
                    "Content-type": "application/json"

                },
                body: JSON.stringify(val)
            })
            let dt = await result;
            if (dt.status == 200) {
                alert("SuccesFully Loged In")
                navigate("/")
            } else {
                alert("User Name Already As Used")
            }
        })

    })

    return (
        <form onSubmit={handleSubmit}>
            <h1> Join Aliens Group 🧟‍♀️🎉</h1>

            <TextField name="name" onChange={handleChange} color={errors.name ? "error" : "primary"} label={errors.name ? errors.name : "User Name"} variant="outlined" />
            <TextField name="password" color={errors.password ? "error" : "primary"} label={errors.password ? errors.password : "User Name"} onChange={handleChange} label="Password" variant="outlined" />
            <TextField name="email" color={errors.email ? "error" : "primary"} label={errors.email ? errors.email : "User Name"} onChange={handleChange} label="Email" variant="outlined" />


            <Button type="submit" variant="contained">Sign Up</Button>


        </form>
    );
}
