 import React from "react";
import { useState } from "react";

  

const getMerchantData = async (id: string) => {
    const baseurl = process.env.NEXT_PUBLIC_API_BASE_URL;

    console.log(`Base URL: ${baseurl}`);
    console.log(`Merchant ID: ${id}`);
  
    if (!baseurl) {
      console.error('API Base URL is not defined.');
      return;
    }
  
    try {
      const res = await fetch(`${baseurl}/api/v1/wrap/${id}`, {
        method: 'GET',
      });
      
      if (!res.ok) {
        throw new Error(`Failed to fetch data: ${res.statusText}`);
      }
      const data = await res.json();
      console.log(data);
      return data; 
    } catch (err) {
      console.error('Error fetching merchant data:', err);
      throw err; 
    }
  };
  
export default getMerchantData;
