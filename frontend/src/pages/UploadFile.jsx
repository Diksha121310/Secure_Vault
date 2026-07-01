import { useState } from "react";
import axiosInstance from "../api/axiosInstance";
import { toast } from "react-toastify";

function UploadFile({ onUploadSuccess }) {

    const [title, setTitle] = useState("");
    const [file, setFile] = useState(null);
    const [progress, setProgress] = useState(0);

    const handleUpload = async () => {

        if (!title || !file) {

            toast.error("Title and File are required");
            return;
        }

        try {

            const formData = new FormData();

            formData.append("title", title);
            formData.append("file", file);

            const response =
                await axiosInstance.post(
                    "/vault/upload",
                    formData,
                    {
                        headers: {
                            "Content-Type":
                                "multipart/form-data"
                        },

                        onUploadProgress: (event) => {

                            const percent =
                                Math.round(
                                    (event.loaded * 100) /
                                    event.total
                                );

                            setProgress(percent);
                        }
                    }
                );

            toast.success(response.data);

            setTitle("");
            setFile(null);
            setProgress(0);

            if (onUploadSuccess) {
                onUploadSuccess();
            }

        } catch (err) {

            console.log(err.response);

console.log(err.response?.data);

toast.error(
    typeof err.response?.data === "string"
        ? err.response.data
        : JSON.stringify(err.response?.data)
);
        }
    };

    return (

        <div className="max-w-3xl mx-auto">

            <div
                className="
                bg-white dark:bg-gray-800/60
                backdrop-blur-lg
                border
                border-gray-700
                rounded-3xl
                p-8
                shadow-2xl
                text-gray-900 dark:text-white
            "
            >

                <div className="mb-8">

                    <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
                        Upload File
                    </h2>

                    <p className="text-gray-300 mt-2">
                        Securely upload and encrypt your important documents.
                    </p>

                </div>

                <div className="space-y-6">

                    <div>

                        <label className="block text-gray-300 mb-2">
                            File Title
                        </label>

                        <input
                            className="
                            w-full
                            bg-gray-900
                            border
                            border-gray-700
                            rounded-xl
                            px-4
                            py-3
                            text-gray-900 dark:text-white
                            focus:border-cyan-500
                            focus:outline-none
                        "
                            placeholder="Example: Passport Scan"
                            value={title}
                            onChange={(e) =>
                                setTitle(e.target.value)
                            }
                        />

                    </div>

                    <div
                        onDragOver={(e) => e.preventDefault()}
                        onDrop={(e) => {


                            e.preventDefault();

                            const droppedFile =
                                e.dataTransfer.files[0];

                            if (droppedFile) {
                                setFile(droppedFile);
                            }
                        }}
                        className="
                            bg-gray-900
                            border
                            border-dashed
                            border-cyan-500/40
                            rounded-2xl
                            p-10
                            text-center
                            hover:border-cyan-400
                            transition-all
                        "
                    >


                        <div className="text-cyan-400 text-sm uppercase tracking-widest mb-3">
                            Secure Upload
                        </div>

                        <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                            Drag & Drop Files Here
                        </h3>

                        <p className="text-gray-300 mt-2 mb-6">
                            PDF • DOCX • XLSX • PPTX • CSV • Images
                        </p>

                        <input
                            type="file"
                            hidden
                            id="fileInput"
                            onChange={(e) =>
                                setFile(
                                    e.target.files[0]
                                )
                            }
                        />

                        <label
                            htmlFor="fileInput"
                            className="
                                inline-flex
                                items-center
                                justify-center
                                bg-cyan-500/20
                                hover:bg-cyan-500/30
                                border
                                border-cyan-500/30
                                text-cyan-400
                                px-5
                                py-3
                                rounded-xl
                                cursor-pointer
                                transition
                                font-medium
                            "
                        >
                            Browse Files
                        </label>

                        {file && (

                            <div
                                className="
                                    mt-6
                                    bg-cyan-500/10
                                    border
                                    border-cyan-500/20
                                    rounded-xl
                                    p-3
                                "
                            >

                                <p className="text-cyan-400 font-medium break-all">
                                    {file.name}
                                </p>

                            </div>

                        )}


                    </div>


                    {progress > 0 && (

                        <div>

                            <div
                                className="
                                w-full
                                bg-gray-700
                                rounded-full
                                h-3
                                overflow-hidden
                            "
                            >

                                <div
                                    className="
                                    bg-cyan-500
                                    h-3
                                    rounded-full
                                    transition-all
                                "
                                    style={{
                                        width: `${progress}%`
                                    }}
                                />

                            </div>

                            <div className="flex justify-between mt-2">

                                <span className="text-gray-300 text-sm">
                                    Upload Progress
                                </span>

                                <span className="text-cyan-400 text-sm font-semibold">
                                    {progress}%
                                </span>

                            </div>

                        </div>

                    )}


                        <button
                            onClick={handleUpload}
                            className="
                                w-full
                                bg-green-500/20
                                hover:bg-green-500/30
                                border
                                border-green-500/30
                                text-green-400
                                py-3
                                rounded-xl
                                cursor-pointer
                                transition
                                font-semibold
                                mt-6
                            "
                        >
                            Upload File
                        </button>

                    

                </div>

            </div>

        </div >
    );


}

export default UploadFile;
