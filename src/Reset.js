import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { useFormik } from 'formik';
import { useState } from 'react';
import { useNavigate } from 'react-router';
import * as Yup from 'yup';
import { OtpCheck } from './OtpCheck';
import { port } from './port';

export function Reset() {
    let [check, setCheck] = useState(false);
    let navigate = useNavigate()
    let userValidation = Yup.object({
        name: Yup.string().min(5, "Name Should Be More Than 5 Characters").max(15, "Name Should Have Lessthan 15 Character").required("Name"),
        email: Yup.string().email("Invalid Email ").required("Email"),
    })
    const { handleChange, handleSubmit, errors } = useFormik({
        initialValues: {
            name: "",
            email: ""
        },
        validationSchema: userValidation,

        onSubmit: async (values) => {
            console.log("running");

            // console.log(values);
            const data = await fetch(`${port}/user/resetpassword`, {
                method: "POST",
                headers: {
                    "Content-type": "application/json"
                },
                body: JSON.stringify(values),
            })
            if (data.status != 200) {
                alert("Invalid username or password");
            } else {

                localStorage.setItem("username", values.name)
                alert("Check the Email")

                navigate("/")
            }
        }
    })
    return (
        // <h1>Reset Page 🚫</h1>
        <div className="reset-password">
            <form onSubmit={handleSubmit}>
                <h1> Welcome Aliens 🧟‍♀️🎉</h1>
                <TextField name="name" onChange={handleChange} color={errors.name ? "error" : "primary"} label={errors.name ? errors.name : "User Name"} variant="outlined" />
                <TextField name="email" color={errors.email ? "error" : "primary"} label={errors.email ? errors.email : "User Name"} onChange={handleChange} label="Email" variant="outlined" />

                <Button type="submit" variant="contained">Send Link</Button>


            </form>
        </div>

    );
}

