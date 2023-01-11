import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { useFormik } from 'formik';
import { useState } from 'react';
import { useNavigate } from 'react-router';
import * as Yup from 'yup';
import { port } from './port';



export function Home() {
    let navigate = useNavigate()
    let userValidation = Yup.object({
        name: Yup.string().min(5, "Name Should Be More Than 5 Characters").max(15, "Name Should Have Lessthan 15 Character").required("Name"),
        password: Yup.string().min(2, "Password Need To Be More Than 8 Character ").max(15, "Password Need To Be Less Than 8 Character ").required("Password"),

    })
    let [btn, setbtn] = useState("Log In")
    const { handleChange, handleSubmit, errors } = useFormik({
        initialValues: {
            name: "",
            password: ""
        },
        validationSchema: userValidation,

        onSubmit: async (values) => {
            // console.log(values);
            const data = await fetch(`${port}/user/login`, {
                method: "POST",
                headers: {
                    "Content-type": "application/json"
                },
                body: JSON.stringify(values),

            })
            if (data.status != 200) {
                console.log("Wrong One");
                setbtn("Try Again")
            } else {
                let result = await data.json();
                console.log(result)
                localStorage.setItem("token", result.token)
                navigate("/content")
            }
        }
    })
    return (
        <form onSubmit={handleSubmit}>
            <h1> Welcome Aliens 🧟‍♀️🎉</h1>
            <TextField name="name" onChange={handleChange} color={errors.name ? "error" : "primary"} label={errors.name ? errors.name : "User Name"} variant="outlined" />
            <TextField name="password" color={errors.password ? "error" : "primary"} label={errors.password ? errors.password : "User Name"} onChange={handleChange} label="Password" variant="outlined" />
            <div className="login-options">
                <p onClick={() => navigate("/reset")}>forget password</p>
                <p onClick={() => navigate("/signup")}>sign up</p>

            </div>
            <Button type="submit" color={btn == "Log In" ? "primary" : "error"} variant="contained">{btn}</Button>


        </form>

    );
}
