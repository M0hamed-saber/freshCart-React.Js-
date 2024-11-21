import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import React from 'react';
import Loading from '../../Loading/Loading';

export default function Brands() {
  function getAllBrands() {
    return axios.get('https://ecommerce.routemisr.com/api/v1/brands');
  }

  const { data, isLoading, isError } = useQuery({
    queryKey: ['allBrands'], // Ensuring `queryKey` is in array format for consistency
    queryFn: getAllBrands,
    retry: 1, // Optional: Retries once on error
  });

  if (isLoading) {
    return (
      <div className="text-center py-64 justify-center flex">
        <Loading />
      </div>
    );
  }

  if (isError) {
    return <h3 className="text-red-600">Error loading brands</h3>;
  }

  return (
    <div className="container py-3 mx-auto">
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
      {data?.data?.data?.map((brand) => (
        <div key={brand._id} className="rounded-xl bg-slate-200">
          <img src={brand.image} alt={brand.name} className="w-full h-[200px] object-cover" />
          <h3 className="text-xl font-bold text-slate-900 text-center">{brand.name}</h3>
        </div>
      ))}
    </div>
  </div>
  );
}
