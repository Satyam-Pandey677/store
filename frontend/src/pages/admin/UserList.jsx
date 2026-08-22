import { useEffect, useState } from "react"
import { FaTrash, FaEdit, FaCheck, FaTimes } from "react-icons/fa"
import Loader from "../../component/Loader"
import { toast } from "react-toastify"
import { useUpdateUserMutation, useDeleteUserMutation, useGetUsersQuery } from "../../redux/Api/apiUserSlice"
import Message from "../../component/Message"
import AdminMenu from "./AdminMenu"
import { ShieldCheck, Users } from "lucide-react"

const UserList = () => {
    const { data: users, refetch, isLoading, error } = useGetUsersQuery()
    const [deleteUser] = useDeleteUserMutation()
    const [updateUser] = useUpdateUserMutation()
    const [editableUserId, setEditableUserId] = useState(null)
    const [editableUserName, setEditableUserName] = useState("")
    const [editableUserEmail, setEditableUserEmail] = useState("")

    useEffect(() => {
        refetch()
    }, [refetch])

    const deleteHandler = async (id) => {
        if (!window.confirm("Are you sure?")) return
        try {
            await deleteUser(id).unwrap()
            toast.success("User removed successfully")
            refetch()
        } catch (deleteError) {
            toast.error(deleteError?.data?.message || deleteError.message)
        }
    }

    const toggleEdit = (id, username, email) => {
        setEditableUserId(id)
        setEditableUserName(username)
        setEditableUserEmail(email)
    }

    const updateHandler = async (id) => {
        try {
            await updateUser({ userId: id.trim(), username: editableUserName, email: editableUserEmail }).unwrap()
            setEditableUserId(null)
            toast.success("User updated successfully")
            refetch()
        } catch (updateError) {
            toast.error(updateError?.data?.message || updateError.message)
        }
    }

    return (
        <section className="space-y-8">
            <AdminMenu />
            <div className="flex flex-col gap-2 border-b border-slate-200 pb-6 sm:flex-row sm:items-end sm:justify-between">
                <div>
                    <p className="text-sm font-semibold uppercase tracking-[0.18em] text-pink-600">Access management</p>
                    <h1 className="mt-2 text-3xl font-semibold tracking-tight text-slate-950">Users</h1>
                    <p className="mt-2 text-sm text-slate-500">Manage customer accounts and administrator access.</p>
                </div>
                <div className="flex items-center gap-2 text-sm text-slate-500"><Users size={17} className="text-pink-600" /> {users?.data?.length ?? 0} accounts</div>
            </div>
            {isLoading ? <Loader /> : error ? <Message variant="danger">{error?.data?.message || error.message}</Message> : (
                <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
                    <div className="overflow-x-auto">
                        <table className="w-full min-w-3xl">
                            <thead className="border-b border-slate-200 bg-slate-50">
                                <tr>
                                    <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">User</th>
                                    <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">Email</th>
                                    <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">Role</th>
                                    <th className="px-5 py-4 text-right text-xs font-semibold uppercase tracking-wider text-slate-500">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {users?.data?.map((user) => (
                                    <tr key={user._id} className="border-b border-slate-100 last:border-0">
                                        <td className="px-5 py-4">
                                            {editableUserId === user._id ? <input type="text" value={editableUserName} onChange={(event) => setEditableUserName(event.target.value)} className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm outline-none focus:border-pink-500 focus:ring-4 focus:ring-pink-100" aria-label="Edit username" /> : <div className="flex items-center gap-3"><span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-pink-50 font-semibold text-pink-700">{user.username?.slice(0, 1).toUpperCase()}</span><div><p className="font-medium text-slate-900">{user.username}</p><p className="mt-0.5 text-xs text-slate-400">ID: {user._id.slice(-8)}</p></div></div>}
                                        </td>
                                        <td className="px-5 py-4">{editableUserId === user._id ? <input type="email" value={editableUserEmail} onChange={(event) => setEditableUserEmail(event.target.value)} className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm outline-none focus:border-pink-500 focus:ring-4 focus:ring-pink-100" aria-label="Edit email" /> : <span className="text-sm text-slate-600">{user.email}</span>}</td>
                                        <td className="px-5 py-4">{user.isAdmin ? <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700"><ShieldCheck size={14} /> Admin</span> : <span className="inline-flex items-center gap-1.5 rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-600"><FaCheck size={11} /> Customer</span>}</td>
                                        <td className="px-5 py-4 text-right">
                                            {editableUserId === user._id ? <div className="flex justify-end gap-2"><button type="button" onClick={() => updateHandler(user._id)} className="grid h-9 w-9 place-items-center rounded-lg bg-emerald-600 text-white transition hover:bg-emerald-700" aria-label="Save user"><FaCheck /></button><button type="button" onClick={() => setEditableUserId(null)} className="grid h-9 w-9 place-items-center rounded-lg border border-slate-200 text-slate-500 transition hover:bg-slate-50" aria-label="Cancel editing"><FaTimes /></button></div> : <div className="flex justify-end gap-2"><button type="button" onClick={() => toggleEdit(user._id, user.username, user.email)} className="grid h-9 w-9 place-items-center rounded-lg border border-slate-200 text-slate-500 transition hover:border-pink-200 hover:bg-pink-50 hover:text-pink-600" aria-label={`Edit ${user.username}`}><FaEdit /></button>{!user.isAdmin && <button type="button" onClick={() => deleteHandler(user._id)} className="grid h-9 w-9 place-items-center rounded-lg border border-red-100 text-red-500 transition hover:bg-red-50" aria-label={`Delete ${user.username}`}><FaTrash /></button>}</div>}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}
        </section>
    )
}

export default UserList
