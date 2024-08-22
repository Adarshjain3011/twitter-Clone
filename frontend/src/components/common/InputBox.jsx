import React from 'react';

const InputBox = ({ placeholder, name, type, register, errors }) => {
    return (
        <div>
            <input
                type={type}
                placeholder={placeholder}
                name={name}
                {...register(name, { required: `${name} is required` })}  // Use the name prop here
                className='w-[260px] sm:w-[400px] md:w-[500px] p-4 rounded-md outline-none border bg-black font-semibold text-base md:text-2xl focus-within:border-blue-600'
            />
            {errors[name] && <p className="errorMsg text-red-500 font-semibold">{errors[name]?.message}</p>}
        </div>
    );
}

export default InputBox;


