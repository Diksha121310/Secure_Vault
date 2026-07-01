function PasswordHealth({ overview }) {

    if (!overview) {
        return (
            <div className="bg-slate-900/60 backdrop-blur-xl border border-cyan-500/20 rounded-3xl p-8 mt-8 shadow-xl">
                <div className="text-center text-gray-300">
                    Loading password health...
                </div>
            </div>
        );
    }

    const totalPasswords = overview?.passwordCount ?? 0;
    const weakPasswords = overview?.weakPasswords ?? 0;
    const reusedPasswords = overview?.reusedPasswords ?? 0;
    const oldPasswords = overview?.oldPasswords ?? 0;

    const strongPasswords = Math.max(
        totalPasswords - weakPasswords - reusedPasswords,
        0
    );

    const health =
        totalPasswords === 0
            ? 100
            : Math.round(
                  (strongPasswords / totalPasswords) * 100
              );

    return (

        <div className="bg-slate-900/60 backdrop-blur-xl border border-cyan-500/20 rounded-3xl p-8 mt-8 shadow-xl">

            <div className="flex items-center justify-between mb-8">

                <div>

                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                        Password Health
                    </h2>

                    <p className="text-gray-300 mt-2">
                        Overall strength of your stored passwords
                    </p>

                </div>

                <div className="text-right">

                    <div className="text-5xl font-bold text-cyan-400">
                        {health}%
                    </div>

                    <div className="text-gray-300">
                        {health >= 90
                            ? "Excellent"
                            : health >= 70
                            ? "Good"
                            : "Weak"}
                    </div>

                </div>

            </div>

            <div className="w-full h-4 bg-slate-700 rounded-full overflow-hidden mb-8">

                <div
                    className="bg-gradient-to-r from-cyan-400 to-blue-500 h-full rounded-full transition-all duration-700"
                    style={{
                        width: `${health}%`
                    }}
                />

            </div>

            <div className="grid md:grid-cols-4 gap-5">

                <HealthCard
                    title="Strong"
                    value={strongPasswords}
                    color="text-green-400"
                    bg="bg-green-500/10"
                />

                <HealthCard
                    title="Weak"
                    value={weakPasswords}
                    color="text-red-400"
                    bg="bg-red-500/10"
                />

                <HealthCard
                    title="Reused"
                    value={reusedPasswords}
                    color="text-yellow-400"
                    bg="bg-yellow-500/10"
                />

                <HealthCard
                    title="Old"
                    value={oldPasswords}
                    color="text-orange-400"
                    bg="bg-orange-500/10"
                />

            </div>

        </div>

    );

}

function HealthCard({
    title,
    value = 0,
    color,
    bg
}) {

    return (

        <div className={`${bg} rounded-2xl p-6 border border-slate-700`}>

            <div className="text-gray-300 text-sm">
                {title}
            </div>

            <div className={`text-4xl font-bold mt-3 ${color}`}>
                {value}
            </div>

        </div>

    );

}

export default PasswordHealth;