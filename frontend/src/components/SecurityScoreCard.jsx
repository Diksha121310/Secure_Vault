function SecurityScoreCard({ score = 0 }) {

    const safeScore = Number(score) || 0;

    const getColor = () => {

        if (safeScore >= 90)
            return "from-green-400 to-cyan-400";

        if (safeScore >= 70)
            return "from-yellow-400 to-orange-400";

        return "from-red-400 to-red-600";
    };

    const getMessage = () => {

        if (safeScore >= 90)
            return "Excellent Security";

        if (safeScore >= 70)
            return "Good Security";

        return "Needs Improvement";
    };

    return (

        <div
            className="
                bg-slate-900/60
                backdrop-blur-xl
                border
                border-cyan-500/20
                rounded-3xl
                p-10
                shadow-xl
            "
        >

            <div className="flex items-center justify-between">

                <div>

                    <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                        Security Score
                    </h1>

                    <p className="text-gray-300 mt-3">
                        Overall health of your vault
                    </p>

                </div>

                <div className="text-6xl">
                    🛡️
                </div>

            </div>

            <div className="mt-10">

                <div
                    className={`
                        text-7xl
                        font-black
                        bg-gradient-to-r
                        ${getColor()}
                        bg-clip-text
                        text-transparent
                    `}
                >
                    {safeScore}%
                </div>

                <div className="text-gray-300 text-xl mt-3">
                    {getMessage()}
                </div>

            </div>

            <div className="mt-10">

                <div className="w-full bg-slate-700 rounded-full h-4 overflow-hidden">

                    <div
                        className={`
                            h-full
                            rounded-full
                            bg-gradient-to-r
                            ${getColor()}
                            transition-all
                            duration-1000
                        `}
                        style={{
                            width: `${safeScore}%`
                        }}
                    />

                </div>

            </div>

        </div>

    );

}

export default SecurityScoreCard;