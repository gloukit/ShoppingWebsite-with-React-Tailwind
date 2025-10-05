import { Outlet } from "react-router-dom";
import Header from "./header";
import CartTab from "./cartTab";
import { useSelector } from "react-redux";

export default function Layout(){
    const statusTab = useSelector(state=>state.cart.statusTab);

    return (
        <div className="bg-zinc-100 h-full ">
            <main className={`max-w-full w-[1200px] m-auto px-20 py-10
                             transform transition-transform duration-500
                             ${statusTab===false? "" : "-translate-x-[200px]" }`}>
                <Header />
                <Outlet/>
            </main>
            <CartTab/>
        </div>
    )
}