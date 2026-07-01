function RiskCard({ risks }) {

    if (!risks) {
        return null;
    }

    const getColor = (riskLevel) => {

        switch ((riskLevel || "").toLowerCase()) {

            case "high":
                return {
                    bg: "bg-red-500/10",
                    border: "border-red-500/30",
                    text: "text-red-400",
                    icon: "🔴"
                };

            case "medium":
                return {
                    bg: "bg-yellow-500/10",
                    border: "border-yellow-500/30",
                    text: "text-yellow-400",
                    icon: "🟡"
                };

            default:
                return {
                    bg: "bg-green-500/10",
                    border: "border-green-500/30",
                    text: "text-green-400",
                    icon: "🟢"
                };
        }

    };

    const style = getColor(risks.riskLevel);

    return (

        <div
            className={`
                ${style.bg}
                ${style.border}
                border
                rounded-2xl
                p-6
                backdrop-blur-xl
                hover:scale-[1.02]
                transition-all
                duration-300
                shadow-lg
            `}
        >

            <div className="flex items-center justify-between">

                <span className="text-3xl">
                    {style.icon}
                </span>

                <span
                    className={`
                        px-3
                        py-1
                        rounded-full
                        text-xs
                        font-semibold
                        uppercase
                        ${style.text}
                        bg-black/20
                    `}
                >
                    {risks.riskLevel || "Low"}
                </span>

            </div>

            <h3 className="text-gray-900 dark:text-white font-semibold text-lg mt-6">
                {risks.title || "No Risk"}
            </h3>

            <p className="text-gray-300 text-sm mt-2">
                This issue affects your vault security.
            </p>

        </div>

    );

}

export default RiskCard;