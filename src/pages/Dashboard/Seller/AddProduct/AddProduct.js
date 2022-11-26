import React, { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../../../contexts/AuthProvider';

const AddProduct = () => {
    const { user } = useContext(AuthContext);
    const [err, setErr] = useState('');
    const { register, formState: { errors }, handleSubmit } = useForm();
    const navigate = useNavigate();
    const date = new Date();

    const handleLogin = data => {
        const { productName, img, originalPrice, resalePrice, condition, phone, location, category, purchasedYear, description } = data;
        let categoryId = "3";
        if (category === "Faired Sports Bikes") {
            categoryId = "1";
        } else if (category === "Naked Sports Bikes") {
            categoryId = "2";
        } else {
            categoryId = "3";
        }

        const imageHost = process.env.REACT_APP_imageHost;
        const image = img[0];
        const formData = new FormData();
        formData.append('image', image);
        fetch(`https://api.imgbb.com/1/upload?key=${imageHost}`, {
            method: 'POST',
            body: formData
        })
            .then(res => res.json())
            .then(imgData => {
                if (imgData.success) {
                    const myProduct = {
                        time:date.toLocaleTimeString(),
                        email: user?.email,
                        seller: user?.displayName,
                        bike_name: productName,
                        image: imgData.data.url,
                        original_price: originalPrice,
                        resale_price: resalePrice,
                        condition,
                        number: phone,
                        location,
                        category_name: category,
                        category_id: categoryId,
                        purchase_year: purchasedYear,
                        description
                    }

                    fetch(`http://localhost:5000/products`, {
                        method: "POST",
                        headers: {
                            'content-type': 'application/json',
                            authorization: `bearer ${localStorage.getItem('accessToken')}`
                        },
                        body: JSON.stringify(myProduct)
                    })
                        .then(res => res.json())
                        .then(data => {
                            if (data.acknowledged) {
                                toast.success(`Your Product added successfully`)
                                navigate('/dashboard/myproducts')
                            }
                        })
                }
            })
    }

    return (
        <div className='flex items-center lg:items-start justify-center flex-col'>
            <div className='shadow-xl p-4 rounded-lg w-11/12 md:w-9/12 lg:w-6/12'>
                <form onSubmit={handleSubmit(handleLogin)}>
                    <h2 className='text-xl text-center mb-4'>Add Your Product</h2>

                    <div className="form-control w-full">

                        {/* Product Name */}
                        <input type="text" placeholder='Bike Name'
                            {...register("productName",
                                { required: "productName is required" })}
                            className="input input-bordered w-full my-1" />
                        {errors.productName && <p className='text-red-600 text-sm'>{errors.productName?.message}</p>}

                        {/* Product image */}
                        <label className="label">
                            <span className="label-text">Photo</span>
                        </label>
                        <input type="file"
                            {...register("img",
                                { required: "Photo is required" })} />
                        {errors.img && <p role="alert" className='text-red-600 text-sm'>{errors.img?.message}</p>}

                        {/* Resale Price */}
                        <input type="number" placeholder='Resale Price in dollar'
                            {...register("resalePrice",
                                {
                                    required: "resalePrice is required",
                                }
                            )}
                            className="input input-bordered w-full my-1" />
                        {errors.resalePrice && <p className='text-red-600 text-sm'>{errors.resalePrice?.message}</p>}
                        {err && <p className='text-sm text-red-600'>{err}</p>}

                        {/* Original Price */}
                        <input type="number" placeholder='Original Price in dollar'
                            {...register("originalPrice",
                                {
                                    required: "originalPrice is required",
                                }
                            )}
                            className="input input-bordered w-full my-1" />
                        {errors.originalPrice && <p className='text-red-600 text-sm'>{errors.originalPrice?.message}</p>}
                        {err && <p className='text-sm text-red-600'>{err}</p>}

                        {/* Condition */}
                        <input type="text" placeholder='Condition: e.g.Excelent, Good, Fair'
                            {...register("condition",
                                {
                                    required: "condition is required",
                                }
                            )}
                            className="input input-bordered w-full my-1" />
                        {errors.condition && <p className='text-red-600 text-sm'>{errors.condition?.message}</p>}
                        {err && <p className='text-sm text-red-600'>{err}</p>}

                        {/* Phone */}
                        <input type="number" placeholder='Phone Number'
                            {...register("phone",
                                {
                                    required: "phone is required",
                                }
                            )}
                            className="input input-bordered w-full my-1" />
                        {errors.phone && <p className='text-red-600 text-sm'>{errors.phone?.message}</p>}
                        {err && <p className='text-sm text-red-600'>{err}</p>}

                        {/* location */}
                        <input type="text" placeholder='Location: e.g.Dhaka, Khulna'
                            {...register("location",
                                {
                                    required: "location is required",
                                }
                            )}
                            className="input input-bordered w-full my-1" />
                        {errors.location && <p className='text-red-600 text-sm'>{errors.location?.message}</p>}
                        {err && <p className='text-sm text-red-600'>{err}</p>}

                        {/* Category */}
                        <label className="label">
                            <span className="label-text">Product Category</span>
                        </label>
                        <select
                            {...register("category")}
                            className="select select-bordered w-full max-w-xs my-1">
                            <option value='Faired Sports Bikes'>Faired Sports Bikes</option>
                            <option value='Naked Sports Bikes'>Naked Sports Bikes</option>
                            <option value='Scooters'>Scooters</option>
                        </select>
                        {errors.category && <p role="alert" className='text-red-600 text-sm'>{errors.category?.message}</p>}

                        {/* Purchased Year */}
                        <input type="text" placeholder='Purchased Year'
                            {...register("purchasedYear",
                                {
                                    required: "location is required",
                                }
                            )}
                            className="input input-bordered w-full my-1" />
                        {errors.purchasedYear && <p className='text-red-600 text-sm'>{errors.purchasedYear?.message}</p>}
                        {err && <p className='text-sm text-red-600'>{err}</p>}

                        {/* Description */}
                        <textarea type="text" placeholder='Description maxlengeth: 100'
                            {...register("description",
                                {
                                    required: "location is required",
                                }
                            )}
                            className="textarea textarea-bordered w-full my-1" maxLength={100} />
                        {errors.description && <p className='text-red-600 text-sm'>{errors.description?.message}</p>}
                        {err && <p className='text-sm text-red-600'>{err}</p>}

                    </div>
                    <input className='btn btn-accent mt-4 w-full' type="submit" value={'Submit'} />
                </form>
            </div>
        </div >
    );
};

export default AddProduct;