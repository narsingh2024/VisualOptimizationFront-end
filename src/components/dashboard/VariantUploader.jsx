// import React from "react";
// import { useDropzone } from "react-dropzone";

// export default function VariantUploader({ variant, index, onDrop }) {
//   const { getRootProps, getInputProps } = useDropzone({
//     onDrop: (files) => onDrop(files, index),
//     accept: { "image/*": [] }
//   });

//   return (
//     <div>
//       <h3>{variant.name}</h3>
//       <div {...getRootProps()} style={{ border: "1px solid gray", padding: "10px" }}>
//         <input {...getInputProps()} />
//         {variant.image ? (
//           <img src={variant.image} alt="" width="100" />
//         ) : (
//           <p>Drag & drop or click to select an image</p>
//         )}
//       </div>
//     </div>
//   );
// }
