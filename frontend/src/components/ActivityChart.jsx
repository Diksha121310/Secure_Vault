function ActivityChart({ overview }) {

    const total =
        overview.totalAssets || 1;

    const passwordPercent =
        Math.round((overview.passwordCount / total) * 100);

    const filePercent =
        Math.round((overview.totalFiles / total) * 100);

    const apiPercent =
        Math.round((overview.apiKeyCount / total) * 100);

    const notePercent =
        Math.round((overview.noteCount / total) * 100);

    return (

        <div className="bg-slate-900/60 backdrop-blur-xl border border-cyan-500/20 rounded-3xl p-8 shadow-xl">

            <div className="flex justify-between items-center mb-8">

                <div>

                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white">

                        Vault Analytics

                    </h2>

                    <p className="text-gray-300 mt-2">

                        Distribution of your secure assets

                    </p>

                </div>

                <div className="text-5xl">

                    📊

                </div>

            </div>

            <div className="space-y-6">

                <ProgressItem
                    title="Passwords"
                    value={overview.passwordCount}
                    percent={passwordPercent}
                    color="bg-cyan-400"
                />

                <ProgressItem
                    title="Files"
                    value={overview.totalFiles}
                    percent={filePercent}
                    color="bg-green-400"
                />

                <ProgressItem
                    title="API Keys"
                    value={overview.apiKeyCount}
                    percent={apiPercent}
                    color="bg-yellow-400"
                />

                <ProgressItem
                    title="Notes"
                    value={overview.noteCount}
                    percent={notePercent}
                    color="bg-purple-400"
                />

            </div>

            <div className="mt-10 pt-6 border-t border-slate-700">

                <div className="flex justify-between">

                    <span className="text-gray-300">

                        Security Score

                    </span>

                    <span className="text-cyan-400 font-bold text-xl">

                        {overview.securityScore}%

                    </span>

                </div>

                <div className="w-full bg-slate-700 rounded-full h-3 mt-4 overflow-hidden">

                    <div
                        className="bg-gradient-to-r from-cyan-400 to-blue-500 h-full rounded-full transition-all duration-700"
                        style={{
                            width: `${overview.securityScore}%`
                        }}
                    />

                </div>

            </div>

        </div>

    );

}

function ProgressItem({
    title,
    value,
    percent,
    color
}) {

    return (

        <div>

            <div className="flex justify-between mb-2">

                <span className="text-gray-900 dark:text-white font-medium">

                    {title}

                </span>

                <span className="text-gray-300">

                    {value}

                </span>

            </div>

            <div className="w-full bg-slate-700 rounded-full h-3 overflow-hidden">

                <div
                    className={`${color} h-full rounded-full transition-all duration-700`}
                    style={{
                        width: `${percent}%`
                    }}
                />

            </div>

        </div>

    );

}

export default ActivityChart;