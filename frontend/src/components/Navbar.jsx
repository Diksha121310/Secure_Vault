import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

function Navbar({ logout }) {

    const { user } = useContext(AuthContext);
    
    return (

        <div
            className="
            sticky
            top-0
            z-50
            w-full
            bg-grey-950
            border-b
            border-gray-800
            px-4
            md:px-8
            py-4
            flex
            justify-between
            items-center
            "
        >

            <div className="flex-1 min-w-0">

                <p className="text-gray-300 text-xs md:text-sm">
                    Welcome back
                </p>

                <h1
                    className="
                    text-lg
                    md:text-2xl
                    font-bold
                    text-white
                    truncate
                    "
                >
                    {user?.name}
                </h1>

            </div>

            <div className="flex-shrink-0 flex items-center gap-3">

                <div
                    className="
                    hidden md:flex
                    bg-cyan-500/10
                    border
                    border-cyan-500/20
                    px-3
                    py-2
                    rounded-xl
                    items-center
                    gap-2
                    "
                >

                    <div
                        className="
                        w-9
                        h-9
                        rounded-full
                        bg-cyan-500
                        flex
                        items-center
                        justify-center
                        font-bold
                        text-black
                        "
                    >
                        {user?.name?.charAt(0)?.toUpperCase()}
                    </div>

                    <span className="text-cyan-400 font-medium">
                        {user?.name}
                    </span>

                </div>

                <button
                    onClick={logout}
                    className="
                    bg-red-500/20
                    hover:bg-red-500/30
                    text-red-400
                    border
                    border-red-500/20
                    px-4
                    py-2
                    rounded-xl
                    transition
                    "
                >
                    Logout
                </button>

            </div>

        </div>

    );
}

export default Navbar;