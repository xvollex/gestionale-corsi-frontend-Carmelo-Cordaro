import { Footer } from "../../../Footer/Footer";
import { useOutlet } from "react-router-dom";
import { Navbar } from "../../Navbar";

export function Layout()
{
    const outlet = useOutlet();

    return (
        <>
            <Navbar/>
            <Footer/> 
            {outlet}
            
        </>
    );
}