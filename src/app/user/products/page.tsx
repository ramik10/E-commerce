"use client"
import React, { useState, useEffect } from 'react';

export default function Products() {
    const [products, setProducts] = useState([]);
    useEffect(() => {
        fetch('/api/products')
            .then(async (response) => {
                const data = await response.json();
                console.log(data);
                setProducts(data);
            }
    )}, []);
    return (
        <div style={{display:"flex", justifyContent:"center", paddingTop:"3vh"}}>
        <div>
            {products.map((p:any) => (
                <div key={p.id}>
                    <h1 style={{color:"white"}}>{p.name}</h1>
                    <p style={{color:"white"}}>{p.description}</p>
                    <p style={{color:"white"}}>{p.price}</p>
                </div>
            ))}
        </div>
        </div>
    )
}
