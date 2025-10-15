import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  useCreateProductMutation,
  useUpateProductMutation,
  useUploadProductImageMutation,
} from "../../redux/Api/productApiSlice";
import { useFetchAllCategoriesQuery } from "../../redux/Api/apiCategorySlice";
import { toast } from "react-toastify";
import AdminMenu from "./AdminMenu";

const ProductList = () => {
  const [image, setImage] = useState("");
  const [name, setName] = useState("");
  const [discription, setDiscription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [quantity, setQuantity] = useState("");
  const [brand, setBrand] = useState("");
  const [stock, setStock] = useState(0);
  const [imageURL, setImageURL] = useState(null);


  const navigate = useNavigate();

  const [uploadProductImage] = useUploadProductImageMutation();
  const [createProduct] = useCreateProductMutation();
  const { data: categories } = useFetchAllCategoriesQuery();

  const uploadFileHandler= async(e) => {
    
    const formData = new FormData()
    formData.append('image', e.target.files[0])
    try {

      const res= await uploadProductImage(formData).unwrap()
      toast.success(res.message)
      setImage(res.image)
      setImageURL(res.image)

      
    } catch (error) {
      toast.error(error?.data?.message || error.error)
    }
  }

  const handleSubmit = async(e) => {
    e.preventDefault()
    try {

      const productData = new FormData()
      productData.append('image', image)
      productData.append('name', name)
      productData.append('price',price)
      productData.append('discription', discription)
      productData.append('category', category)
      productData.append('brand', brand)
      productData.append('quantity', quantity)
      productData.append('countInStock', stock)

      const {data} = await createProduct(productData)
      if(data.error){
        toast.error("Product creation is fails")
      }else{
        toast.success(`${data?.data?.name} is Created`)
        navigate("/")
      }
      
    } catch (error) {
        toast.error("Product creation is fails")
        console.log(error.response.data.error)

    }
  }

  return (
    <div className="container xl:ml-[9rem] sm:ml-[0]">
      <div className="flex felx-col md:flex-row">
        <AdminMenu/>
        <div className="md:w-3/4 p-3">
          <div className="h-9">Create Product</div>

          {imageURL && (
            <div className="text-center">
              <img
                src={imageURL}
                alt="product"
                className="block mx-auto max-h-[200px]"
              />
            </div>
          )}

          <div className="mb-3">
            <label className="border px-4 block w-full text-center rounded-lg cursor-pointer font-bold  py-11">
              {image ? image.name : "Upload image"}

              <input type="file" name="image" accept="image/*" onChange={uploadFileHandler} className={!image? "hidden": "text-black"} />
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

            <button onClick={handleSubmit} className="py-4 px-10 mt-5 rounded-lg text-lg font-bold bg-pink-600 text-white">Submit</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductList;
