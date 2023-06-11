import React,{useState} from 'react';

const AddProduct = () => {
   
    const [name,setName] = useState("");
    const [price,setPrice] = useState("");
    const [category,setCategory] = useState("");
    const [company,setcompany] = useState("");
    const [error,setError] = useState("");
    const addProduct =async ()=>{
       
        if(!name || !price || !category || !company){
            setError(true);
            return false;
        }



        const userId = JSON.parse(localStorage.getItem('user'))._id;
        let result = await fetch("http://localhost:5000/add-product",{
            method:"POST",
            body:JSON.stringify({name,price,category,company,userId}),
            headers:{
                "Content-Type":"application/json",
                authorization:`bearer ${JSON.parse(localStorage.getItem('token'))}`
                },
            });
            result = await result.json();
            console.log(result);
    }
    return (
        <div className='addproduct'>
            <h1>AddProduct</h1>
            <input type='text' placeholder='Enter product name' className='inputBox'
             onChange={(e)=>setName(e.target.value)} value={name}/>
         {    error && !name && <span className ='inavalid-input'>Enter Valid Name</span>}

            <input type='text' placeholder='Enter product price' className='inputBox'
             onChange={(e)=>setPrice(e.target.value)} value={price}/> 
        {    error && !price &&  <span className ='inavalid-input'>Enter Valid Price</span>}

            <input type='text' placeholder='Enter product category' className='inputBox'
             onChange={(e)=>setCategory(e.target.value)} value={category}/>
        {    error && !category && <span className ='inavalid-input'>Enter Valid Category</span>}

            <input type='text' placeholder='Enter product company' className='inputBox'
            onChange={(e)=>setcompany(e.target.value)} value={company } />
        {   error && !company &&   <span className ='inavalid-input'>Enter Valid Company</span>}

            <button onClick={addProduct} className='appButton'>Add Product</button>
        </div>
    )
}

export default AddProduct;