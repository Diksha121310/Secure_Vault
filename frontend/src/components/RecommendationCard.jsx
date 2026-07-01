function RecommendationCard({ recommendation }) {

    if (!recommendation) {
        return null;
    }

    const getStyle = (severity) => {

        switch ((severity || "").toLowerCase()) {

            case "high":
                return {
                    bg: "bg-cyan-500/10",
                    border: "border-cyan-500/30",
                    text: "text-cyan-400",
                    icon: "🛡️"
                };

            case "medium":
                return {
                    bg: "bg-blue-500/10",
                    border: "border-blue-500/30",
                    text: "text-blue-400",
                    icon: "💡"
                };

            default:
                return {
                    bg: "bg-green-500/10",
                    border: "border-green-500/30",
                    text: "text-green-400",
                    icon: "✅"
                };
        }

    };

    const style = getStyle(recommendation.severity);

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

            <div className="flex justify-between items-center">

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
                    {recommendation.severity || "Low"}
                </span>

            </div>

            <h3 className="text-gray-900 dark:text-white font-semibold text-lg mt-6">
                {recommendation.title || "No Recommendation"}
            </h3>

            <p className="text-gray-300 text-sm mt-2">
                Recommended action to improve your vault security.
            </p>

        </div>

    );

}

export default RecommendationCard;