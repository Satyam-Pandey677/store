import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  useCreateProductMutation,
  useUploadProductImageMutation,
} from "../../redux/Api/productApiSlice";
import { useFetchAllCategoriesQuery } from "../../redux/Api/apiCategorySlice";
import { toast } from "react-toastify";
import AdminMenu from "./AdminMenu";
import { ImagePlus, PackagePlus, Upload } from "lucide-react";

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
      console.log(res)
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

      const result = await createProduct(productData).unwrap()
      toast.success(`${result?.data?.name} is Created`)
      navigate("/admin/allproductlist")
      
    } catch (error) {
        toast.error("Product creation is fails")
        console.log(error.message)

    }
  }

  return (
    <section className="space-y-8">
      <AdminMenu />
      <div className="flex flex-col gap-2 border-b border-slate-200 pb-6 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-pink-600">Catalog setup</p>
          <h1 className="mt-2 text-3xl font-semibold tracking-tight text-slate-950">Create product</h1>
          <p className="mt-2 text-sm text-slate-500">Add the details customers need to make a confident choice.</p>
        </div>
        <div className="flex items-center gap-2 text-sm text-slate-500"><PackagePlus size={17} className="text-pink-600" /> New inventory</div>
      </div>

      <form onSubmit={handleSubmit} className="grid gap-6 lg:grid-cols-[minmax(0,0.75fr)_minmax(0,1.25fr)]">
        <div className="rounded-2xl border border-slate-200 bg-slate-950 p-6 text-white shadow-sm">
          <div className="mb-6 flex items-center gap-3">
            <div className="grid h-10 w-10 place-items-center rounded-xl bg-pink-500/20 text-pink-300"><ImagePlus size={20} /></div>
            <div><h2 className="font-semibold">Product image</h2><p className="text-sm text-slate-400">Use a clear, well-lit photo.</p></div>
          </div>
          <div className="flex min-h-72 flex-col items-center justify-center rounded-xl border border-dashed border-slate-700 bg-slate-900/60 p-5 text-center">
            {imageURL ? <img src={imageURL} alt="Product preview" className="mb-5 max-h-52 rounded-lg object-contain" /> : <ImagePlus size={42} className="mb-4 text-slate-600" />}
            <label className="inline-flex cursor-pointer items-center gap-2 rounded-xl bg-pink-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-pink-700">
              <Upload size={16} /> {imageURL ? "Replace image" : "Upload image"}
              <input type="file" name="image" accept="image/*" onChange={uploadFileHandler} className="hidden" />
            </label>
            <p className="mt-3 text-xs text-slate-500">PNG, JPG or WEBP</p>
          </div>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="mb-6"><h2 className="font-semibold text-slate-900">Product details</h2><p className="mt-1 text-sm text-slate-500">Organize the product information below.</p></div>
          <div className="grid gap-5 sm:grid-cols-2">
            <div className="sm:col-span-2"><label htmlFor="product-name" className="mb-2 block text-sm font-medium text-slate-700">Product name</label><input id="product-name" type="text" className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none transition focus:border-pink-500 focus:bg-white focus:ring-4 focus:ring-pink-100" value={name} onChange={(e) => setName(e.target.value)} required /></div>
            <div><label htmlFor="product-price" className="mb-2 block text-sm font-medium text-slate-700">Price</label><input id="product-price" type="number" min="0" step="0.01" className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none transition focus:border-pink-500 focus:bg-white focus:ring-4 focus:ring-pink-100" value={price} onChange={(e) => setPrice(e.target.value)} required /></div>
            <div><label htmlFor="product-brand" className="mb-2 block text-sm font-medium text-slate-700">Brand</label><input id="product-brand" type="text" className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none transition focus:border-pink-500 focus:bg-white focus:ring-4 focus:ring-pink-100" value={brand} onChange={(e) => setBrand(e.target.value)} /></div>
            <div><label htmlFor="product-quantity" className="mb-2 block text-sm font-medium text-slate-700">Quantity</label><input id="product-quantity" type="number" min="0" className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none transition focus:border-pink-500 focus:bg-white focus:ring-4 focus:ring-pink-100" value={quantity} onChange={(e) => setQuantity(e.target.value)} required /></div>
            <div><label htmlFor="product-stock" className="mb-2 block text-sm font-medium text-slate-700">Count in stock</label><input id="product-stock" type="number" min="0" className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none transition focus:border-pink-500 focus:bg-white focus:ring-4 focus:ring-pink-100" value={stock} onChange={(e) => setStock(e.target.value)} required /></div>
            <div className="sm:col-span-2"><label htmlFor="product-category" className="mb-2 block text-sm font-medium text-slate-700">Category</label><select id="product-category" value={category} className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none transition focus:border-pink-500 focus:bg-white focus:ring-4 focus:ring-pink-100" onChange={(e) => setCategory(e.target.value)} required><option value="" disabled>Choose a category</option>{categories?.data?.map((c) => <option key={c._id} value={c._id}>{c.name}</option>)}</select></div>
            <div className="sm:col-span-2"><label htmlFor="product-description" className="mb-2 block text-sm font-medium text-slate-700">Description</label><textarea id="product-description" rows="5" className="w-full resize-y rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none transition focus:border-pink-500 focus:bg-white focus:ring-4 focus:ring-pink-100" value={discription} onChange={(e) => setDiscription(e.target.value)} required /></div>
          </div>
          <button type="submit" className="mt-6 inline-flex items-center gap-2 rounded-xl bg-pink-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-pink-700 focus:outline-none focus:ring-4 focus:ring-pink-100"><PackagePlus size={17} /> Create product</button>
        </div>
      </form>
    </section>
  );
};

export default ProductList;
