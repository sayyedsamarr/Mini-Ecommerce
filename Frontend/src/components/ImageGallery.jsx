import React, { useState } from 'react';
export default function ImageGallery({ images=[] }) {
  const [main, setMain] = useState(0);
  if (!images || images.length === 0) return <div className="h-64 bg-gray-100 flex items-center justify-center">No images</div>;
  return (
    <div>
      <div className="h-80 bg-gray-100 mb-3"><img src={images[main]} alt="" className="w-full h-full object-contain" /></div>
      <div className="flex gap-2">{images.map((s,i)=>(
        <button key={i} onClick={()=>setMain(i)} className={`w-20 h-20 border rounded overflow-hidden ${i===main ? 'ring-2 ring-indigo-500' : ''}`}>
          <img src={s} alt="" className="w-full h-full object-cover" />
        </button>
      ))}</div>
    </div>
  );
}
