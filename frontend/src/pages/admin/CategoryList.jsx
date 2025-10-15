import { useState, useEffect } from "react"
import { toast } from "react-toastify"
import { useCreateCategoryMutation, useUpdateCategoryMutation, useDeleteCategoryMutation, useFetchAllCategoriesQuery } from "../../redux/Api/apiCategorySlice"
import CategoryForm from "../../component/CategoryForm"
import Modal from "../../component/Modal"
import AdminMenu from "./AdminMenu"


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

        if(!name) {
            toast.error("Category name is required")
        }

        try {
            const result = await createCategory({name}).unwrap()
            if(result.error){
                toast.error(result.error)
            }else{
                setName('')
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
    <div className="ml-[10rem] flex flex-col md:flex-row">
        <AdminMenu/>
        <div className="md:w-3/4 p-3">
            <div className="h-12">Manage Category</div>
            <CategoryForm value={name} setValue={setName} handleSubmit={handleCreateCategory}/>
            <br />
            <hr />
            <div className="flex flex-wrap">
                {categories?.data?.map((category) => (
                    <div key={category._id}>
                        <button className="bg-white border border-pink-500 text-pink-500 py-2 px-4 rounded-lg m-3 hover:bg-pink-500 hover:text-white focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-opacity-50" onClick={() => {{
                            setModelVisible(true)
                            setSelectedCategory(category)
                            setUpdatingName(category.name)
                        }}}>{category.name}</button>
                    </div>
                ))}
            </div>

            <Modal isOpen={modelVisible} onClose={() => setModelVisible(false)} >
                <CategoryForm  value={updatingName} setValue={value => setUpdatingName(value)}
                   handleSubmit={handleUpdateCategory} buttonText="Update" handleDelete={handleDeleteCategory} />
            </Modal>
        </div>
    </div>
  )
}

export default CategoryList