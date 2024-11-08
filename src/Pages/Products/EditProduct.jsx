import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import JoditEditor from 'jodit-react';

const EditProduct = () => {
    const { id } = useParams(); // Get the product ID from the URL
    const navigate = useNavigate()
    const [categories, setCategories] = useState([]);
    const [inplants, setInplants] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [formData, setFormData] = useState({
        category: '',
        inplants: '',
        productName: '',
        productDetails: '',
        stainlessDetails: '',
        titaniumDetails: '',
        image: null,
    });

    useEffect(() => {
        const fetchCategories = async () => {
            setIsLoading(true);
            try {
                const response = await axios.get('https://api.sofia.digiindiasolutions.com/api/get-all-category');
                setCategories(response.data.data);
            } catch (error) {
                console.error("Error fetching categories:", error);
                toast.error("Failed to fetch categories.");
            } finally {
                setIsLoading(false);
            }
        };

        const fetchInplants = async () => {
            setIsLoading(true);
            try {
                const response = await axios.get('https://api.sofia.digiindiasolutions.com/api/all-inplants-details');
                setInplants(response.data.data);
            } catch (error) {
                console.error("Error fetching inplants:", error);
                toast.error("Failed to fetch inplants.");
            } finally {
                setIsLoading(false);
            }
        };

        const fetchProductDetails = async () => {
            setIsLoading(true);
            try {
                const response = await axios.get(`https://api.sofia.digiindiasolutions.com/api/single-inplants-product/${id}`);
                const product = response.data.data;
                setFormData({
                    category: product.category,
                    inplants: product.inplants,
                    productName: product.productName,
                    productDetails: product.productDetails,
                    stainlessDetails: product.stainlessDetails,
                    titaniumDetails: product.titaniumDetails,
                    image: null, // Keep the existing image unless the user uploads a new one
                });
            } catch (error) {
                console.error("Error fetching product details:", error);
                toast.error("Failed to fetch product details.");
            } finally {
                setIsLoading(false);
            }
        };

        fetchCategories();
        fetchInplants();
        fetchProductDetails();
    }, [id]);

    const handleChange = (name, value) => {
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleFileChange = (e) => {
        setFormData((prevData) => ({
            ...prevData,
            image: e.target.files[0],
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        // Prepare form data for submission
        const data = new FormData();
        data.append('category', formData.category);
        data.append('inplants', formData.inplants);
        data.append('productName', formData.productName);
        data.append('productDetails', formData.productDetails);
        data.append('stainlessDetails', formData.stainlessDetails);
        data.append('titaniumDetails', formData.titaniumDetails);
        if (formData.image) {
            data.append('image', formData.image);
        }

        try {
            const response = await axios.put(`https://api.sofia.digiindiasolutions.com/api/update-inplants-product/${id}`, data, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            if (response.data.success) {
                toast.success("Product updated successfully!");
                navigate("/all-inplants-products")
            }
        } catch (error) {
            console.error("Error updating product:", error);
            toast.error("Failed to update product.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <>
            <ToastContainer />
            <div className="bread">
                <div className="head">
                    <h4>Edit Product</h4>
                </div>
                <div className="links">
                    <Link to="/all-inplants-products" className="add-new">Back <i className="fa-regular fa-circle-left"></i></Link>
                </div>
            </div>

            <div className="d-form">
                <form className="row g-3" onSubmit={handleSubmit}>
                    <div className="col-md-4">
                        <label htmlFor="category" className="form-label">Category</label>
                        <select name='category' className="form-select" id="category" value={formData.category} onChange={e => handleChange('category', e.target.value)}>
                            <option value="" disabled>Select Category</option>
                            {categories.map((item) => (
                                <option value={item._id} key={item._id}>{item.categoryName}</option>
                            ))}
                        </select>
                    </div>

                    <div className="col-md-4">
                        <label htmlFor="inplants" className="form-label">Inplants</label>
                        <select name='inplants' className="form-select" id="inplants" value={formData.inplants} onChange={e => handleChange('inplants', e.target.value)}>
                            <option value="" disabled>Select Inplants</option>
                            {inplants.map((item) => (
                                <option value={item._id} key={item._id}>{item.inplantsName}</option>
                            ))}
                        </select>
                    </div>

                    <div className="col-md-4">
                        <label htmlFor="productName" className="form-label">Product Name</label>
                        <input type="text" name="productName" className='form-control' placeholder='Product Name' value={formData.productName} onChange={e => handleChange('productName', e.target.value)} />
                    </div>

                    <div className="col-12">
                        <label htmlFor="productDetails" className="form-label">Product Details</label>
                        <JoditEditor
                            value={formData.productDetails}
                            onChange={newContent => handleChange('productDetails', newContent)}
                        />
                    </div>

                    <div className="col-12">
                        <label htmlFor="stainlessDetails" className="form-label">Stainless Details</label>
                        <JoditEditor
                            value={formData.stainlessDetails}
                            onChange={newContent => handleChange('stainlessDetails', newContent)}
                        />
                    </div>

                    <div className="col-12">
                        <label htmlFor="titaniumDetails" className="form-label">Titanium Details</label>
                        <JoditEditor
                            value={formData.titaniumDetails}
                            onChange={newContent => handleChange('titaniumDetails', newContent)}
                        />
                    </div>

                    <div className="mb-4">
                        <input
                            type="file"
                            name="image"
                            className="form-control-file border p-2 mt-1 rounded shadow-sm"
                            onChange={handleFileChange}
                        />
                    </div>

                    <div className="col-12 text-center">
                        <button type="submit" className={`${isLoading ? 'not-allowed' : 'allowed'}`}>{isLoading ? "Please Wait..." : "Update Product"}</button>
                    </div>
                </form>
            </div>
        </>
    );
}

export default EditProduct;