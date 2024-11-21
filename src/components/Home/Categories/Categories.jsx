import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import React from 'react';
import Loading from '../../Loading/Loading';

export default function Categories() {
  function getAllCategories() {
    return axios.get('https://ecommerce.routemisr.com/api/v1/categories');
  }

  const { data, isLoading, isError } = useQuery({
    queryKey: ['allCategories'], // Array format for queryKey
    queryFn: getAllCategories,
    retry: 1, // Optional: retries once on failure
  });

  if (isLoading) {
    return (
      <div className="text-center py-64 justify-center flex">
        <Loading />
      </div>
    );
  }

  if (isError) {
    return <h3 className="text-red-600">Error loading categories</h3>;
  }

  return (
      <div className="container py-3 mx-auto">
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
      {data?.data?.data?.map((category) => (
        <div key={category._id} className="rounded-xl bg-slate-200">
          <img src={category.image} alt={category.name} className="w-full h-[300px] object-cover" />
          <h3 className="text-xl font-semibold text-green-600 text-center">{category.name}</h3>
        </div>
      ))}
    </div>
  </div>  
  );
}
