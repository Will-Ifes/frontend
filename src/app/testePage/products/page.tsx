// "use client";

// import React from "react";
// import ProtectedRoute from "../../../protected-route-client";

// export default function Products() {
//   interface Product {
//     id: number;
//     name: string;
//   }

//   const [products, setProducts] = React.useState<Product[]>([]);

//   return (
//     <ProtectedRoute>
//       <div className="flex items-center justify-center h-screen">
//         <div className="w-full max-w-2xl">
//           <h1 className="text-2xl mb-4">Products</h1>
//           <ul>
//             {products.map((product) => (
//               <li key={product.id} className="mb-2">
//                 {product.name}
//               </li>
//             ))}
//           </ul>
//         </div>
//       </div>
//     </ProtectedRoute>
//   );
// }
