import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { toast } from "react-toastify";

import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import VaultCard from "../components/VaultCard";
import axiosInstance from "../api/axiosInstance";
import FileCard from "../components/FileCard";

import {
    getVaultItems,
    addVaultItem,
    updateVaultItem,
    deleteVaultItem
} from "../api/vaultApi";
import Settings from "../pages/Settings";

import { getFiles } from "../api/fileApi";
import UploadFile from "./UploadFile";
import { getSecurityOverview } from "../api/securityApi";

import SecurityScoreCard from "../components/SecurityScoreCard";
import SecurityActivity from "../components/SecurityActivity";
import RiskCard from "../components/RiskCard";
import RecommendationCard from "../components/RecommendationCard";
import PasswordHealth from "../components/PasswordHealth";


function Dashboard() {

    const { token, logout } = useContext(AuthContext);

    const [items, setItems] = useState([]);
    const [activeTab, setActiveTab] = useState("vault");

    const [title, setTitle] = useState("");
    const [secret, setSecret] = useState("");
    const [search, setSearch] = useState("");

    // EDIT STATES
    const [editItem, setEditItem] = useState(null);
    const [editTitle, setEditTitle] = useState("");
    const [editSecret, setEditSecret] = useState("");

    const [type, setType] = useState("PASSWORD");

    const [filterType, setFilterType] = useState("ALL");
    const [sortBy, setSortBy] = useState("NEWEST");

    const [currentPage, setCurrentPage] = useState(1);
    const ITEMS_PER_PAGE = 9;

    const [files, setFiles] = useState([]);
    const [fileTypeFilter] = useState("ALL");

    const [previewFile, setPreviewFile] = useState(null);
    const [previewUrl, setPreviewUrl] = useState(null);

    const [overview, setOverview] = useState(null);
    
    const fetchItems = async () => {
        if (!token) return;

        try {
            const data = await getVaultItems();
            setItems(data || []);
        } catch (err) {
            console.log("Fetch error:", err);
        }
    };

    useEffect(() => {
        if (!token) return;

        fetchItems();
        fetchFiles();
        fetchOverview();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [token]);

    const handleDelete = async (id) => {

        try {

            await deleteVaultItem(id);
            await fetchItems();
            await fetchOverview();
            // Remove from Vault
            setItems(prev =>
                prev.filter(item => item.id !== id)
            );

            // Remove from Files
            setFiles(prev =>
                prev.filter(file => file.id !== id)
            );

            toast.success("Deleted successfully");

        } catch (err) {

            console.error(err);
            toast.error("Delete failed");

        }
    };

    const handlePreview = async (file) => {
        try {
            const response =
                await axiosInstance.get(
                    `/vault/download/${file.id}`,
                    {
                        responseType: "blob"
                    }
                );
            const url =
                window.URL.createObjectURL(
                    response.data
                );
            setPreviewUrl(url);
            setPreviewFile(file);
        } catch (err) {
            console.error(err);
            alert("Preview failed");
        }
    };

    const handleAdd = async () => {

    if (!title.trim() || !secret.trim()) {
        toast.error("Title and Secret cannot be empty");
        return;
    }

    try {

        await addVaultItem({
            title: title.trim(),
            type: type,
            encryptedData: secret
        });

        toast.success("Secret saved successfully");

        setTitle("");
        setSecret("");

        // Refresh both
        await fetchItems();
        await fetchOverview();

        setActiveTab("vault");

    } catch (err) {

        console.log("Error adding secret:", err);
        console.error(err);
        console.error(err.response);
        console.error(err.response?.data);
    }
};

    // OPEN EDIT MODAL
    const handleEdit = (item) => {
        setEditItem(item);
        setEditTitle(item.title);
        setEditSecret(item.encryptedData);
    };

    // UPDATE ITEM
    const handleUpdate = async () => {
        if (!editItem) return;
        await updateVaultItem(
            editItem.id,
            {
                title: editTitle,
                encryptedData: editSecret
            },
            token
        );
        toast.success("Secret updated successfully");
        setEditItem(null);
        setEditTitle("");
        setEditSecret("");
        fetchItems();
        fetchOverview();
    };

    const handleDeleteFile = async (id) => {

        try {

            await deleteVaultItem(id);
            await fetchItems();
            await fetchOverview();
            // Remove from Files page
            setFiles(prev =>
                prev.filter(file => file.id !== id)
            );

            // Remove from Vault page
            setItems(prev =>
                prev.filter(item => item.id !== id)
            );

            toast.success("File deleted");

        } catch (err) {

            console.error(err);
            toast.error("Delete failed");

        }
    };

    const filteredItems = items
        .filter(item =>
            item.title?.toLowerCase().includes(search.toLowerCase())
        )
        .filter(item =>
            filterType === "ALL"
                ? true
                : item.type === filterType
        )
        .sort((a, b) => {
            if (sortBy === "AZ") {
                return a.title.localeCompare(b.title);
            }
            if (sortBy === "ZA") {
                return b.title.localeCompare(a.title);
            }
            if (sortBy === "NEWEST") {
                return new Date(b.createdAt) - new Date(a.createdAt);
            }
            if (sortBy === "OLDEST") {
                return new Date(a.createdAt) - new Date(b.createdAt);
            }
            return 0;
        });

    const indexOfLast =
        currentPage * ITEMS_PER_PAGE;

    const indexOfFirst =
        indexOfLast - ITEMS_PER_PAGE;

    const currentItems =
        filteredItems.slice(
            indexOfFirst,
            indexOfLast
        );

    const totalPages =
        Math.ceil(
            filteredItems.length /
            ITEMS_PER_PAGE
        );

    const fetchFiles = async () => {
        try {
            const data =
                await getFiles();
            setFiles(data);
        } catch (err) {
            console.log(err);
        }
    };

    const filteredFiles =
        fileTypeFilter === "ALL"
            ? files
            : files.filter(
                file => file.type === fileTypeFilter
            );

    const fetchOverview = async () => {
        try {
            const data = await getSecurityOverview();
            setOverview(data);
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <div className="flex flex-col lg:flex-row bg-gray-900 min-h-screen w-full overflow-x-hidden">

            <Sidebar setActiveTab={setActiveTab} />
            
            <div className="flex-1 min-w-0">
                
                <Navbar logout={logout} />

                <div className="p-4 md:p-6 lg:p-8 pt-8">

                    {/* VAULT */}
                    {activeTab === "vault" && (
                        <>

                            <div className="mb-8">

                                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">

                                    <div>

                                        <h1 className="text-3xl font-bold text-white">
                                            Security Overview
                                        </h1>

                                        <p className="text-gray-300 mt-1">
                                            Monitor and manage your encrypted assets
                                        </p>

                                    </div>

                                    <div className="bg-cyan-500/10 border border-cyan-500/30 px-4 py-2 rounded-xl">

                                        <span className="text-cyan-400 font-semibold">
                                            Security Score: {overview?.securityScore ?? 0}%
                                        </span>

                                    </div>

                                </div>

                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">

                                    <div className="bg-gray-800 p-4 rounded-xl text-center">
                                        <p className="text-gray-300">Assets</p>
                                        <h2 className="text-3xl font-bold text-cyan-400">
                                            {overview?.totalAssets ?? 0}
                                        </h2>
                                    </div>

                                    <div className="bg-gray-800 p-4 rounded-xl text-center">
                                        <p className="text-gray-300">Files</p>
                                        <h2 className="text-3xl font-bold text-green-400">
                                            {overview?.totalFiles ?? 0}
                                        </h2>
                                    </div>

                                    <div className="bg-gray-800 p-4 rounded-xl text-center">
                                        <p className="text-gray-300">Passwords</p>
                                        <h2 className="text-3xl font-bold text-yellow-400">
                                            {overview?.passwordCount ?? 0}
                                        </h2>
                                    </div>

                                    <div className="bg-gray-800 p-4 rounded-xl text-center">
                                        <p className="text-gray-300">Notes</p>
                                        <h2 className="text-3xl font-bold text-purple-400">
                                            {overview?.noteCount ?? 0}
                                        </h2>
                                    </div>

                                    <div className="bg-gray-800 p-4 rounded-xl text-center">
                                        <p className="text-gray-300">API Keys</p>
                                        <h2 className="text-3xl font-bold text-red-400">
                                            {overview?.apiKeyCount ?? 0}
                                        </h2>
                                    </div>

                                </div>
                                <div className="h-6"></div>
                                <div className="flex flex-col lg:flex-row gap-4">

                                    <input
                                        type="text"
                                        placeholder="Search vault..."
                                        value={search}
                                        onChange={(e) => {
                                            setSearch(e.target.value);
                                            setCurrentPage(1);
                                        }}
                                        className="
                                            w-full
                                            lg:flex-1
                                            bg-gray-800
                                            border
                                            border-gray-700
                                            text-white
                                            px-5
                                            py-3
                                            rounded-2xl
                                            outline-none
                                            focus:border-cyan-500
                                            "
                                    />

                                    <select
                                        value={filterType}
                                        onChange={(e) => {
                                            setFilterType(e.target.value);
                                            setCurrentPage(1);
                                        }}
                                        className="
                                            bg-gray-800
                                            border
                                            border-gray-700
                                            text-white
                                            px-4
                                            py-3
                                            rounded-2xl
                                            "
                                    >
                                        <option value="ALL">All Types</option>
                                        <option value="PASSWORD">Password</option>
                                        <option value="NOTE">Note</option>
                                        <option value="API_KEY">API Key</option>
                                        <option value="BANK">Bank</option>
                                        <option value="WIFI">WiFi</option>
                                    </select>

                                    <select
                                        value={sortBy}
                                        onChange={(e) => {
                                            setSortBy(e.target.value);
                                            setCurrentPage(1);
                                        }}
                                        className="
                                            bg-gray-800
                                            border
                                            border-gray-700
                                            text-white
                                            px-4
                                            py-3
                                            rounded-2xl
                                            "
                                    >
                                        <option value="NEWEST">Newest First</option>
                                        <option value="OLDEST">Oldest First</option>
                                        <option value="AZ">A-Z</option>
                                        <option value="ZA">Z-A</option>
                                    </select>

                                </div>
                                <div className="h-3"></div>
                                <div className="bg-gray-800/40 border border-gray-700 rounded-2xl p-6 min-h-[400px]">

                                    <div className="flex justify-between items-center mb-6">

                                        <h2 className="text-xl font-semibold text-white">
                                            Vault Assets
                                        </h2>

                                        <span className="text-gray-300 text-sm">
                                            {filteredItems.length} Records
                                        </span>

                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">

                                        {currentItems.map((item) => (
                                            <VaultCard
                                                key={item.id}
                                                item={item}
                                                onDelete={handleDelete}
                                                onEdit={handleEdit}
                                            />
                                        ))}

                                    </div>

                                </div>
                                <div className="flex justify-center items-center gap-4 mt-6">

                                    <button
                                        disabled={currentPage === 1}
                                        onClick={() => setCurrentPage(currentPage - 1)}
                                        className="bg-gray-700 px-4 py-2 rounded text-white disabled:opacity-50"
                                    >
                                        Previous
                                    </button>

                                    <span className="text-white">
                                        Page {currentPage} of {totalPages}
                                    </span>

                                    <button
                                        disabled={currentPage === totalPages}
                                        onClick={() => setCurrentPage(currentPage + 1)}
                                        className="bg-gray-700 px-4 py-2 rounded text-white disabled:opacity-50"
                                    >
                                        Next
                                    </button>
                                </div>
                            </div>
                        </>
                    )}

                    {/* ADD */}
                    {activeTab === "add" && (

                        <div className="max-w-3xl mx-auto">

                            <div className="bg-gray-800/60 backdrop-blur-lg border border-gray-700 rounded-3xl p-8 shadow-2xl">

                                <div className="mb-8">

                                    <h2 className="text-3xl font-bold text-white">
                                        Create New Secret
                                    </h2>

                                    <p className="text-gray-300 mt-2">
                                        Store passwords, API keys, notes and sensitive data securely.
                                    </p>

                                </div>

                                <div className="space-y-6">

                                    <div>

                                        <label className="block text-gray-300 mb-2">
                                            Secret Title
                                        </label>

                                        <input
                                            className="w-full bg-gray-900 border border-gray-700 rounded-xl px-4 py-3 text-white focus:border-cyan-500 focus:outline-none"
                                            placeholder="Example: GitHub Production Token"
                                            value={title}
                                            onChange={(e) => setTitle(e.target.value)}
                                        />

                                    </div>

                                    <div>

                                        <label className="block text-gray-300 mb-2">
                                            Secret Type
                                        </label>

                                        <select
                                            className="w-full bg-gray-900 border border-gray-700 rounded-xl px-4 py-3 text-white focus:border-cyan-500 focus:outline-none"
                                            value={type}
                                            onChange={(e) => setType(e.target.value)}
                                        >
                                            <option value="PASSWORD">Password</option>
                                            <option value="NOTE">Note</option>
                                            <option value="API_KEY">API Key</option>
                                            <option value="BANK">Bank</option>
                                            <option value="WIFI">WiFi</option>
                                            <option value="OTHER">Other</option>
                                        </select>

                                    </div>

                                    <div>

                                        <label className="block text-gray-300 mb-2">
                                            Secret Data
                                        </label>

                                        <textarea
                                            rows="6"
                                            className="w-full bg-gray-900 border border-gray-700 rounded-xl px-4 py-3 text-white focus:border-cyan-500 focus:outline-none"
                                            placeholder="Enter secret value..."
                                            value={secret}
                                            onChange={(e) => setSecret(e.target.value)}
                                        />

                                    </div>

                                    <div className="flex justify-end">

                                        <button
                                            onClick={handleAdd}
                                            className="
                                                bg-cyan-500/20
                                                hover:bg-cyan-500/30
                                                border
                                                border-cyan-500/20
                                                text-cyan-300
                                                px-6
                                                py-3
                                                rounded-xl
                                                transition
                                                font-medium
                                                whitespace-nowrap
                                            "
                                        >
                                            Save Secret
                                        </button>

                                    </div>

                                </div>

                            </div>

                        </div>

                    )}
                    {activeTab === "upload" && (
                        <UploadFile
                            onUploadSuccess={() => {
                                fetchFiles();
                                fetchItems();
                                setActiveTab("files");
                            }}
                        />
                    )}
                    {activeTab === "files" && (

                        <div>

                            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">

                                <div>

                                    <h1 className="text-3xl font-bold text-white">
                                        Uploaded Files
                                    </h1>

                                    <p className="text-gray-300 mt-1">
                                        Securely manage and access your encrypted documents.
                                    </p>

                                </div>

                                <div className="bg-cyan-500/10 border border-cyan-500/20 px-4 py-2 rounded-xl">

                                    <span className="text-cyan-400 font-semibold">
                                        {files.length} Files Stored
                                    </span>

                                </div>

                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">

                                {filteredFiles.length > 0 ? (

                                    filteredFiles.map((file) => (

                                        <FileCard
                                            key={file.id}
                                            file={file}
                                            onPreview={handlePreview}
                                            onDelete={handleDeleteFile}
                                        />

                                    ))

                                ) : (

                                    <div className="col-span-full">

                                        <div className="bg-gray-800/60 border border-gray-700 rounded-2xl p-10 text-center">

                                            <h3 className="text-xl font-semibold text-white">
                                                No Files Found
                                            </h3>

                                            <p className="text-gray-300 mt-2">
                                                Upload files to start building your secure vault.
                                            </p>

                                        </div>

                                    </div>

                                )}

                            </div>

                        </div>

                    )}
                    {activeTab === "security" && (
                <div className="space-y-8">

                    {/* Security Score */}
                    <SecurityScoreCard score={overview?.securityScore} />

                    {/* Activity + Risks */}
                    <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">

                        <SecurityActivity
                            activities={overview?.activities}
                        />

                        <div className="space-y-4">

                            {(overview?.risks ?? []).map((risk, index) => (
                                <RiskCard
                                    key={index}
                                    risks={risk}
                                />
                            ))}

                        </div>

                    </div>

                    {/* Recommendations */}
                    <div>

                        <h2 className="text-2xl font-bold text-white mb-5">
                            Recommendations
                        </h2>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                            {(overview?.recommendations ?? []).map((recommendation, index) => (
                                <RecommendationCard
                                    key={index}
                                    recommendation={recommendation}
                                />
                            ))}

                        </div>

                    </div>

                    {/* Password Health */}
                    <PasswordHealth overview={overview} />

                </div>
            )}
            {activeTab === "settings" && <Settings />}
            {
                previewFile && (

                    <div className="fixed inset-0 bg-black bg-opacity-80 flex justify-center items-center z-50">

                        <div className="bg-white p-4 rounded-lg w-4/5 h-4/5 relative">

                            <button
                                className="bg-red-500 px-4 py-2 rounded"
                                onClick={() => {

                                    setPreviewFile(null);
                                    setPreviewUrl(null);

                                }}
                            >
                                X
                            </button>

                            {
                                previewFile.fileType?.toLowerCase().includes("pdf") ? (

                                    <iframe
                                        src={previewUrl}
                                        title="Preview"
                                        className="w-full h-full"
                                    />

                                ) : previewFile.fileType?.toLowerCase().includes("image") ? (

                                    <img
                                        src={previewUrl}
                                        alt="Preview"
                                        className="max-h-full mx-auto"
                                    />

                                ) : previewFile.fileType?.toLowerCase().includes("csv") ? (

                                    <iframe
                                        src={previewUrl}
                                        title="CSV Preview"
                                        className="w-full h-full"
                                    />

                                ) : previewFile.fileType?.toLowerCase().includes("text") ? (

                                    <iframe
                                        src={previewUrl}
                                        title="Text Preview"
                                        className="w-full h-full"
                                    />

                                ) : (

                                    <div className="text-center mt-20 text-black">
                                        Preview not supported. Please download the file.
                                    </div>
                                )
                            }

                        </div>

                    </div>
                )
            }
            {/* EDIT MODAL (IMPORTANT: INSIDE RETURN) */}
            {
                editItem && (
                    <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center">

                        <div className="bg-gray-800 p-6 rounded-xl w-96 text-white">

                            <h2 className="text-xl mb-4">Edit Secret</h2>

                            <input
                                className="w-full p-2 mb-3 text-black"
                                value={editTitle}
                                onChange={(e) => setEditTitle(e.target.value)}
                            />

                            <textarea
                                className="w-full p-2 mb-3 text-black"
                                value={editSecret}
                                onChange={(e) => setEditSecret(e.target.value)}
                            />

                            <div className="flex gap-2">

                                <button
                                    onClick={handleUpdate}
                                    className="bg-green-500 px-4 py-2 rounded"
                                >
                                    Save
                                </button>

                                <button
                                    onClick={() => setEditItem(null)}
                                    className="bg-red-500 px-4 py-2 rounded"
                                >
                                    Cancel
                                </button>

                            </div>

                        </div>
                    </div>
                )
            }
                </div>
            </div>
        </div >
    );
}

export default Dashboard;