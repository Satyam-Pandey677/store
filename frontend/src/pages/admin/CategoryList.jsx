import { useState, useEffect } from "react"
import { toast } from "react-toastify"
import { useCreateCategoryMutation, useUpdateCategoryMutation, useDeleteCategoryMutation, useFetchAllCategoriesQuery } from "../../redux/Api/apiCategorySlice"
import CategoryForm from "../../component/CategoryForm"
import Modal from "../../component/Modal"
import AdminMenu from "./AdminMenu"
import { FolderPlus, Pencil, Tags } from "lucide-react"


const CategoryList = () => {
    const {data: categories }= useFetchAllCategoriesQuery() 
    const [name, setName] = useState("")
    const [selectedCategory, setSelectedCategory] = useState(null)
    const [updatingName, setUpdatingName] = useState("")
    const [modelVisible, setModelVisible] = useState(false)

    const [createCategory] = useCreateCategoryMutation()
    const [updateCategory] = useUpdateCategoryMutation()
    const [deleteCategory] = useDeleteCategoryMutation()

    const handleCreateCategory = async(e) => {
        e.preventDefault()

        if(!name.trim()) {
            toast.error("Category name is required")
            return
        }

        try {
            const result = await createCategory({name}).unwrap()
            if(result.error){
                toast.error(result.error)
            }else{
                setName('')
                console.log(result)
                toast.success(`${result.data.name} Is Created`)
            }
        } catch (error) {
            toast.error(error?.data?.message || error.message)
            console.log(error.message)
        }
    }

    const handleUpdateCategory = async(e) => {
        e.preventDefault()

        if(!updatingName){
            toast.error("Category name is required")
            return
        }
        try {
            const result = await updateCategory({categoryId : selectedCategory._id, updateCategory:{
                name:updatingName
            }}).unwrap()

            if(result.error){
                toast.error(result.error)
            }
            console.log(result)
            toast.success(`${result.data.name} is updated`)
            setSelectedCategory(null)
            setUpdatingName("")
            setModelVisible(false)
        } catch (error) {
            console.log(error.message)
        }

    }

    const handleDeleteCategory = async() => {
        try {
            const result = await deleteCategory(selectedCategory._id).unwrap()
            if(result.error){
                toast.error(result.error)
            }else{
                toast.success(`${result.data.name} is deleted`)}
                setSelectedCategory(null);
                setModelVisible(false);

        } catch (error) {
            console.log(error.message)
        }
    }

  return (
    <section className="space-y-8">
        <AdminMenu />
        <div className="flex flex-col gap-2 border-b border-slate-200 pb-6 sm:flex-row sm:items-end sm:justify-between">
            <div>
                <p className="text-sm font-semibold uppercase tracking-[0.18em] text-pink-600">Catalog setup</p>
                <h1 className="mt-2 text-3xl font-semibold tracking-tight text-slate-950">Create category</h1>
                <p className="mt-2 text-sm text-slate-500">Keep your catalog easy to browse with clear, consistent groups.</p>
            </div>
            <div className="flex items-center gap-2 text-sm text-slate-500">
                <Tags size={17} className="text-pink-600" />
                {categories?.data?.length ?? 0} categories
            </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)]">
            <div className="rounded-2xl border border-slate-200 bg-slate-950 p-6 text-white shadow-sm">
                <div className="mb-8 grid h-12 w-12 place-items-center rounded-xl bg-pink-500/20 text-pink-300">
                    <FolderPlus size={22} />
                </div>
                <h2 className="text-xl font-semibold">Add a new category</h2>
                <p className="mt-2 mb-6 text-sm leading-6 text-slate-400">Use short names that help customers find products quickly.</p>
                <CategoryForm value={name} setValue={setName} handleSubmit={handleCreateCategory} buttonText="Create category" />
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                <div className="mb-5 flex items-center justify-between">
                    <div>
                        <h2 className="font-semibold text-slate-900">Your categories</h2>
                        <p className="mt-1 text-sm text-slate-500">Select a category to update or remove it.</p>
                    </div>
                    <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-600">Manage</span>
                </div>
                <div className="space-y-2">
                    {categories?.data?.length ? categories.data.map((category) => (
                        <button key={category._id} type="button" className="group flex w-full items-center justify-between rounded-xl border border-slate-100 bg-slate-50 px-4 py-3 text-left transition hover:border-pink-200 hover:bg-pink-50" onClick={() => {
                            setModelVisible(true)
                            setSelectedCategory(category)
                            setUpdatingName(category.name)
                        }}>
                            <span className="font-medium text-slate-800 group-hover:text-pink-700">{category.name}</span>
                            <Pencil size={16} className="text-slate-400 group-hover:text-pink-600" />
                        </button>
                    )) : (
                        <div className="rounded-xl border border-dashed border-slate-200 px-5 py-10 text-center">
                            <p className="font-medium text-slate-700">No categories yet</p>
                            <p className="mt-1 text-sm text-slate-500">Create your first category to get started.</p>
                        </div>
                    )}
                </div>
            </div>
        </div>

            <Modal isOpen={modelVisible} onClose={() => setModelVisible(false)} >
                <CategoryForm  value={updatingName} setValue={value => setUpdatingName(value)}
                   handleSubmit={handleUpdateCategory} buttonText="Update" handleDelete={handleDeleteCategory} />
            </Modal>
        </section>
  )
}

export default CategoryList