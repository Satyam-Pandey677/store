import React from 'react'
import { Save, Trash2 } from 'lucide-react'

const CategoryForm = ({value, setValue , handleSubmit, buttonText="Submit", handleDelete}) => {
  return (
    <div className='p-1'>
        <form onSubmit={handleSubmit} className='space-y-4'>
            <label className='block text-sm font-medium text-slate-700' htmlFor='category-name'>
              Category name
            </label>
            <input id='category-name' type="text" className='w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-pink-500 focus:bg-white focus:ring-4 focus:ring-pink-100' placeholder='e.g. New arrivals' value={value} onChange={(e) => setValue(e.target.value)} />

            <div className='flex flex-wrap gap-3'>
                <button type='submit' className='inline-flex items-center gap-2 rounded-xl bg-pink-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-pink-700 focus:outline-none focus:ring-4 focus:ring-pink-100'>
                  <Save size={16} /> {buttonText}
                </button>

                {handleDelete && (
                    <button type='button' onClick={handleDelete} className='inline-flex items-center gap-2 rounded-xl border border-red-200 px-4 py-2.5 text-sm font-semibold text-red-600 transition hover:bg-red-50 focus:outline-none focus:ring-4 focus:ring-red-100'>
                      <Trash2 size={16} /> Delete
                    </button>
                )}
            </div>
        </form>
    </div>
  )
}

export default CategoryForm