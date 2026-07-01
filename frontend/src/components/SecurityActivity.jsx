function SecurityActivity({ activities = [] }) {

    const safeActivities = Array.isArray(activities) ? activities : [];

    return (

        <div className="bg-slate-900/60 backdrop-blur-xl border border-cyan-500/20 rounded-3xl p-8 shadow-xl h-full">

            <div className="flex items-center justify-between mb-8">

                <div>

                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                        Recent Activity
                    </h2>

                    <p className="text-gray-300 mt-2">
                        Latest actions performed in your vault
                    </p>

                </div>

                <div className="text-cyan-400 text-3xl">
                    🔒
                </div>

            </div>

            {safeActivities.length === 0 ? (

                <div className="flex items-center justify-center h-52 text-gray-500">

                    No recent activity found.

                </div>

            ) : (

                <div className="space-y-5">

                    {safeActivities.map((activity, index) => (

                        <div
                            key={index}
                            className="flex items-start gap-5"
                        >

                            {/* Timeline */}

                            <div className="flex flex-col items-center">

                                <div className="w-4 h-4 rounded-full bg-cyan-400 shadow-lg shadow-cyan-400" />

                                {index !== safeActivities.length - 1 && (

                                    <div className="w-[2px] flex-1 bg-slate-700 mt-2" />

                                )}

                            </div>

                            {/* Activity */}

                            <div className="flex-1 bg-slate-800/50 rounded-2xl p-5 border border-slate-700 hover:border-cyan-500 transition-all duration-300">

                                <div className="flex justify-between items-center">

                                    <h3 className="text-gray-900 dark:text-white font-semibold">

                                        {activity?.title || "Unknown Activity"}

                                    </h3>

                                    <span className="text-xs text-gray-500">

                                        {activity?.time || "--"}

                                    </span>

                                </div>

                                <p className="text-gray-300 mt-2">

                                    {activity?.description || "No description available."}

                                </p>

                            </div>

                        </div>

                    ))}

                </div>

            )}

        </div>

    );

}

export default SecurityActivity;