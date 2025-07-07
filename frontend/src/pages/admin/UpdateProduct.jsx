import {useEffect, useState} from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useUpateProductMutation, useDeleteProductMutation, useGetProductByIdQuery, useUploadProductImageMutation } from "../../redux/Api/productApiSlice"

import { useFetchAllCategoriesQuery } from '../../redux/Api/apiCategorySlice'
import { toast } from 'react-toastify'
import AdminMenu from './AdminMenu'


const UpdateProduct = () => {

    const params = useParams()
    const {data: productData} = useGetProductByIdQuery(params.id)

    console.log(productData.data)
    

    const [image, setImage] = useState(productData? productData.data.image : "")
    const [name, setName] = useState(productData? productData.name : "")
    const [discription, setDiscription] = useState(productData? productData.data.discription : "")
    const [price, setPrice] = useState(productData? productData.data.price : "")
    const [quantity, setQuatity] = useState(productData? productData.data.quantity : "")
    const [brand, setBrand] = useState(productData? productData.data.brand : "")
    const [category, setCategory] = useState(productData? productData.data.category : "")
    const [stock, setStock] = useState(productData? productData.data.countInStock : "")

    console.log(name)

    const navigate = useNavigate()

    const {data:categories = []} = useFetchAllCategoriesQuery()
    const [uploadProductImage] = useUploadProductImageMutation()
    const [updateProduct] = useUpateProductMutation()
    const [deleteProduct] = useDeleteProductMutation()

    useEffect(() => {
      if(productData && productData.data._id){
        setName(productData.data.name)
        setDiscription(productData.data.discription)
        setPrice(productData.data.price)
        setCategory(productData.data.category)
        setBrand(productData.data.brand)
        setImage(productData.data.image)
        setStock(productData.data.stock)
        setQuatity(productData.data.quantity)
      }
    },[productData])
  return (
    <div className="container xl:ml-[9rem] sm:ml-[0]">
      <div className="flex felx-col md:flex-row">
        <AdminMenu/>
        <div className="md:w-3/4 p-3">
          <div className="h-9 text-xl font-bold">Update Product</div>

          {image && (
            <div className="text-center">
              <img
                src={image}
                alt="product"
                className="block mx-auto max-h-[200px]"
              />
            </div>
          )}

          <div className="mb-3">
            <label className="border px-4 block w-full text-center rounded-lg cursor-pointer font-bold  py-11">
              {image ? image.name : "Upload image"}

              <input type="file" name="image" accept="image/*"  className={!image? "hidden": "text-black"} />
            </label>
          </div>

          <div className="p-3">
            <div className="flex flex-wrap">
                <div className="one">
                  <label htmlFor="name">Name</label><br />
                  <input type="text" name="name" className="p-4 mb-3 w-[30rem] border rounded-lg bg-[#fff]" value={name} onChange={(e) => setName(e.target.value)} />
                </div>
                <div className="two ml-5">
                  <label htmlFor="name block">Price</label><br />
                  <input type="number" name="name" className="p-4 mb-3 w-[30rem] border rounded-lg bg-[#fff]" value={price} onChange={(e) => setPrice(e.target.value)} />
                </div>
            </div>

            <div className="flex flex-wrap">
                <div className="one">
                  <label htmlFor="name block">Quantity</label><br />
                  <input type="number" name="name" className="p-4 mb-3 w-[30rem] border rounded-lg bg-[#fff]" value={quantity} onChange={(e) => setQuantity(e.target.value)} />
                </div>
                <div className="two ml-5">
                  <label htmlFor="name block">Brand</label><br />
                  <input type="text" name="name" className="p-4 mb-3 w-[30rem] border rounded-lg bg-[#fff]" value={brand} onChange={(e) => setBrand(e.target.value)} />
                </div>
            </div>

            <label htmlFor=""className="my-5">Discription</label>
            <textarea className="p-2 mb-3 border rounded-lg w-[95%]" value={discription} onChange={(e)=> setDiscription(e.target.value)}></textarea>

            <div className="flex gap-5">
              <div>
                <label htmlFor="name block">Count In Stock</label><br />
                <input type="text" className="p-4 mb-3 w-[30rem] border rounded-lg" value={stock} onChange={e => setStock(e.target.value)} />
              </div>

              <div>
                <label htmlFor="">Category</label><br />
                <select placeholder="Choose Category" className="p-4 mb-3 w-[30rem] border rounded-lg" onChange={e => setCategory(e.target.value)}>
                  {
                    categories?.data?.map((c) => (
                      <option key={c._id} value={c._id}>{c.name}</option>
                    ))
                  }
                </select>
              </div>
            </div>

            {/* <button onClick={handleSubmit} className="py-4 px-10 mt-5 rounded-lg text-lg font-bold bg-pink-600 text-white">Submit</button> */}
          </div>
        </div>
      </div>
    </div>
  );
}

export default UpdateProduct