import { useState } from "react";
import { toast } from "react-toastify";

function VaultCard({ item, onDelete, onEdit }) {
const [show, setShow] = useState(false);

const decrypt = (text) => {
    try {
        return decodeURIComponent(escape(atob(text)));
    } catch {
        return text;
    }
};

const copyToClipboard = () => {
    const valueToCopy = show
        ? decrypt(item.encryptedData)
        : decrypt(item.encryptedData);

    navigator.clipboard.writeText(valueToCopy);
    toast.success("Copied to clipboard!");
};

const getTypeColor = () => {
    switch (item.type) {
        case "PASSWORD":
            return "bg-cyan-500/20 text-cyan-400 border-cyan-500/30";
        case "API_KEY":
            return "bg-red-500/20 text-red-400 border-red-500/30";
        case "NOTE":
            return "bg-purple-500/20 text-purple-400 border-purple-500/30";
        case "BANK":
            return "bg-green-500/20 text-green-400 border-green-500/30";
        default:
            return "bg-gray-500/20 text-gray-300 border-gray-500/30";
    }
};

return (
    <div className="
        group
        bg-gradient-to-br
        from-gray-800
        to-gray-900
        border border-gray-700
        hover:border-cyan-500/40
        rounded-2xl
        p-5
        shadow-xl
        hover:shadow-cyan-500/10
        transition-all
        duration-300
        hover:-translate-y-1
    ">

        <div className="flex justify-between items-start mb-4">

            <span
                className={`
                    px-3 py-1
                    rounded-full
                    text-xs
                    font-semibold
                    border
                    ${getTypeColor()}
                `}
            >
                {item.type}
            </span>

            <span className="text-gray-500 text-lg">
                🔒
            </span>

        </div>

        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-3 truncate">
            {item.title}
        </h2>

        <div
            className="
                bg-black/20
                border border-gray-700
                rounded-xl
                p-3
                mb-4
                min-h-[70px]
            "
        >
            <p className="text-gray-300 break-all">

                {show
                    ? decrypt(item.encryptedData)
                    : "••••••••••••••••••••••"}

            </p>
        </div>

        <div className="text-xs text-gray-500 mb-4">
            Securely encrypted
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">

            <button
                onClick={copyToClipboard}
                className="
                    bg-green-500/20
                    hover:bg-green-500/30
                    text-green-400
                    py-2
                    rounded-lg
                    transition
                "
            >
                Copy
            </button>

            <button
                onClick={() => setShow(!show)}
                className="
                    bg-cyan-500/20
                    hover:bg-cyan-500/30
                    text-cyan-400
                    py-2
                    rounded-lg
                    transition
                "
            >
                {show ? "Hide" : "View"}
            </button>

            <button
                onClick={() => onEdit(item)}
                className="
                    bg-yellow-500/20
                    hover:bg-yellow-500/30
                    text-yellow-400
                    py-2
                    rounded-lg
                    transition
                "
            >
                Edit
            </button>

            <button
                onClick={() => onDelete(item.id)}
                className="
                    bg-red-500/20
                    hover:bg-red-500/30
                    text-red-400
                    py-2
                    rounded-lg
                    transition
                "
            >
                Delete
            </button>

        </div>

    </div>
);


}

export default VaultCard;
