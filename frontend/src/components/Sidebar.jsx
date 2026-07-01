function Sidebar({ setActiveTab }) {
    return (
        <>
            {/* MOBILE + TABLET */}
            <div
                className="
                    lg:hidden
                    w-full
                    bg-gray-950
                    border-b
                    border-gray-800
                    overflow-x-auto
                    whitespace-nowrap
                "
            >
                <div className="flex items-center gap-2 p-3 min-w-max">

                    <button
                        onClick={() => setActiveTab("vault")}
                        className="px-3 py-2 text-sm text-gray-300 hover:text-cyan-400"
                    >
                        Dashboard
                    </button>

                    <button
                        onClick={() => setActiveTab("vault")}
                        className="px-3 py-2 text-sm text-gray-300 hover:text-cyan-400"
                    >
                        Vault
                    </button>

                    <button
                        onClick={() => setActiveTab("add")}
                        className="px-3 py-2 text-sm text-gray-300 hover:text-cyan-400"
                    >
                        Add Secret
                    </button>

                    <button
                        onClick={() => setActiveTab("upload")}
                        className="px-3 py-2 text-sm text-gray-300 hover:text-cyan-400"
                    >
                        Upload
                    </button>

                    <button
                        onClick={() => setActiveTab("files")}
                        className="px-3 py-2 text-sm text-gray-300 hover:text-cyan-400"
                    >
                        Files
                    </button>

                    <button
                        onClick={() => setActiveTab("security")}
                        className="px-3 py-2 text-sm text-gray-300 hover:text-cyan-400"
                    >
                        Security
                    </button>
                    <button
                        onClick={() => setActiveTab("settings")}
                        className="px-3 py-2 text-sm text-gray-300 hover:text-cyan-400"
                    >
                        Settings
                    </button>

                </div>
            </div>

            {/* DESKTOP */}
            <div
                className="
                    hidden lg:flex
        w-72
        min-h-full
        bg-gradient-to-b
        from-gray-950
        to-black
        border-r
        border-gray-800
        text-gray-900 dark:text-white
        p-6
        flex-col
        justify-between
        shrink-0
                "
            >

                <div>

                    <div className="mb-10">

                        <h1 className="text-3xl font-bold text-cyan-400">
                            🛡 SecureVault
                        </h1>

                        <p className="text-gray-500 text-sm mt-2">
                            Enterprise Security Platform
                        </p>

                    </div>

                    <div className="space-y-2">

                        <button
                            onClick={() => setActiveTab("vault")}
                            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-cyan-500/10 hover:text-cyan-400 transition"
                        >
                            Vault
                        </button>

                        <button
                            onClick={() => setActiveTab("add")}
                            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-cyan-500/10 hover:text-cyan-400 transition"
                        >
                            Add Secret
                        </button>

                        <button
                            onClick={() => setActiveTab("upload")}
                            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-cyan-500/10 hover:text-cyan-400 transition"
                        >
                            Upload File
                        </button>

                        <button
                            onClick={() => setActiveTab("files")}
                            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-cyan-500/10 hover:text-cyan-400 transition"
                        >
                            Files
                        </button>

                        <button
                            onClick={() => setActiveTab("security")}
                            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-cyan-500/10 hover:text-cyan-400 transition"
                        >
                            Security Center
                        </button>
                        <button
                            onClick={() => setActiveTab("settings")}
                            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-cyan-500/10 hover:text-cyan-400 transition"
                        >
                            Settings
                        </button>

                    </div>

                </div>

                <div className="bg-green-500/10 border border-green-500/20 rounded-2xl p-4">

                    <p className="text-green-400 font-semibold">
                        ● Protected
                    </p>

                    <p className="text-gray-300 text-sm mt-1">
                        All vault data encrypted
                    </p>

                </div>

            </div>
        </>
    );
}

export default Sidebar;