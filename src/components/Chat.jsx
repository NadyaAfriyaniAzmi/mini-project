import React from 'react';

function Chat({id, placeholder, value, onChange}) {
  return(
    <input
    className='w-full h-10 bg-white rounded-md border border-blue-500 focus:outline-none p-3'
    id={id}
    placeholder={placeholder}
    value={value}
    onChange={onChange}
    />
  )
}

export default Chat;