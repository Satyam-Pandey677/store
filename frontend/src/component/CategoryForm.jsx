import React from 'react'

const CategoryForm = ({value, setValue , handleSubmit, buttonText="Submit", handleDelete}) => {
  return (
    <div className='p-3'>
        <form onSubmit={handleSubmit} className='space-y-3'>
            <input type="text" className='py-3 px-4 border rounded-lg w-full' placeholder='Enter Category Name' value={value} onChange={(e) => setValue(e.target.value)} />

            <div className='flex justify-between'>
                <button className='bg-pink-500 text-white py-2 px-4 rounded-lg hover:bg-pink-600 focus:outline-none focus:ring-pink-500 focus:ring-opacity-50'>{buttonText}</button>

                {handleDelete && (
                    <button onClick={handleDelete} className='bg-pink-500 text-white py-2 px-4 rounded-lg hover:bg-pink-600 focus:outline-none focus:ring-pink-500 focus:ring-opacity-50g'> Delete </button>
                )}
            </div>
        </form>
    </div>
  )
}

export default CategoryForm