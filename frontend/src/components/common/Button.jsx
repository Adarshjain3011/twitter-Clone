import React from 'react';

const Button = ({ children, clickHandler, className = '', ...props }) => {
    return (
        <div className='flex justify-center items-center'>
            <button
                className={`border-2 border-slate-500 p-3 px-16 md:px-32 font-bold hover:bg-sky-500 ${className}`}
                onClick={clickHandler}
                {...props}
            >
                {children}
            </button>
        </div>
    );
}

export default Button;

