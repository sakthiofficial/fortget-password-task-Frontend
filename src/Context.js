// import "./styles.css";
import React, { useContext, useState } from "react";

const data = React.createContext();

export default function ContextTest() {
    let [clr, setclr] = useState("blue");

    return (
        <data.Provider value={[clr, setclr]}>
            <div className="App">
                <button onClick={() => setclr("green")}>Green</button>

                <Test />

            </div>
        </data.Provider>
    );
}
function Test() {
    let [clr, setclr] = useContext(data);
    console.log(clr);

    let theme = {
        backgroundColor: clr
    }
    console.log(theme);
    return (
        <div style={theme}>
            <h1>hii</h1>
            <button onClick={() => setclr("red")}>red</button>

        </div>
    );
}
