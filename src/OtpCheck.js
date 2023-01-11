// import Button from '@mui/material/Button';
// import TextField from '@mui/material/TextField';
// import { useFormik } from 'formik';
// import { useState } from 'react';
// import * as Yup from 'yup';

// export function OtpCheck({ setcheck }) {
//     let userValidation = Yup.object({
//         otp: Yup.string().min(4, "OTP Should Be More Than 4 Characters").max(4, "OTP Should Have Lessthan 4 Character").required("Enter Otp"),
//     });
//     let [btn, setbtn] = useState("send otp");
//     const { handleChange, handleSubmit, errors } = useFormik({
//         initialValues: {
//             otp: ""
//         },
//         validationSchema: userValidation,
//         onSubmit: async (values) => {
//             // console.log(values);
//             values.username = localStorage.getItem("username")
//             let result = await fetch("http://localhost:4020/user/otp?hiii", {
//                 headers: values,
//                 // headers: { "username": localStorage.getItem("username") },

//             })
//             console.log(values);
//             if (result.status == 200) {
//                 alert("sucess")
//             } else {
//                 alert("Wrong Otp")
//             }

//         }
//     });
//     return (
//         <div className="otp-check">
//             <form onSubmit={handleSubmit}>
//                 <h1> Enter OTP Aliens 🧟‍♀️💻</h1>
//                 <TextField name="otp" onChange={handleChange} color={errors.otp ? "error" : "primary"} label={errors.otp ? errors.otp : "OTP"} variant="outlined" />

//                 <Button type="submit" color={errors.otp ? "primary" : "error"} variant="contained">DONE</Button>


//             </form>
//         </div>
//     );
// }
