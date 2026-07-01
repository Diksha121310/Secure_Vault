import { downloadFile } from "../api/fileApi";
import { toast } from "react-toastify";

function FileCard({ file, onPreview, onDelete }) {

    const handleDownload = async () => {

        try {

            const blob = await downloadFile(file.id);

            const url =
                window.URL.createObjectURL(blob);

            const a =
                document.createElement("a");

            a.href = url;
            a.download = file.fileName;

            document.body.appendChild(a);

            a.click();

            a.remove();

            toast.success("Download started");

        } catch (error) {

            console.error(error);
            toast.error("Download failed");
        }
    };

    return (

        <div
            className="
                bg-white dark:bg-gray-800/60
                backdrop-blur-lg
                border
                border-gray-700
                rounded-2xl
                p-5
                transition-all
                duration-300
                hover:border-cyan-500/30
                hover:-translate-y-1
                shadow-xl
                flex
                flex-col
                justify-between
                min-h-[220px]
            "
        >

            <div>

                <div className="flex items-start justify-between gap-3">

                    <div className="flex items-center gap-3 min-w-0">

                        <div
                            className="
                                w-12
                                h-12
                                rounded-xl
                                bg-cyan-500/10
                                border
                                border-cyan-500/20
                                flex
                                items-center
                                justify-center
                                text-xl
                            "
                        >
                            📄
                        </div>

                        <div className="min-w-0">

                            <h3
                                className="
                                    text-lg
                                    font-bold
                                    text-gray-900 dark:text-white
                                    truncate
                                "
                            >
                                {file.title}
                            </h3>

                            <p
                                className="
                                    text-sm
                                    text-gray-300
                                    truncate
                                "
                            >
                                {file.fileName}
                            </p>

                        </div>

                    </div>

                    <span
                        className="
                            bg-cyan-500/10
                            text-cyan-400
                            border
                            border-cyan-500/20
                            px-2
                            py-1
                            rounded-lg
                            text-xs
                            font-medium
                            shrink-0
                        "
                    >
                        {file.fileType}
                    </span>

                </div>

            </div>

            <div
                className="
                    grid
                    grid-cols-1
                    sm:grid-cols-3
                    gap-3
                    mt-6
                "
            >

                <button
                    onClick={() => onPreview(file)}
                    className="
                        bg-green-500/20
                        hover:bg-green-500/30
                        border
                        border-green-500/20
                        text-green-400
                        py-2.5
                        rounded-xl
                        transition
                        font-medium
                    "
                >
                    Preview
                </button>

                <button
                    onClick={handleDownload}
                    className="
                        bg-cyan-500/20
                        hover:bg-cyan-500/30
                        border
                        border-cyan-500/20
                        text-cyan-400
                        py-2.5
                        rounded-xl
                        transition
                        font-medium
                    "
                >
                    Download
                </button>

                <button
                    onClick={() => onDelete(file.id)}
                    className="
                        bg-red-500/20
                        hover:bg-red-500/30
                        border
                        border-red-500/20
                        text-red-400
                        py-2.5
                        rounded-xl
                        transition
                        font-medium
                    "
                >
                    Delete
                </button>

            </div>

        </div>
    );
}

export default FileCard;