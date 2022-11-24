import React from 'react';

const Blogs = () => {
    return (
        <section>
            <h2 className='text-4xl font-bold text-center underline mt-5'>Blogs</h2>

            <div className="blogs mx-auto my-10 w-11/12 md:w-8/12">
                {/* Blog-1 */}
                <div className="blog border-2 border-blue-100 rounded-lg p-4">
                    <h3 className='text-center text-2xl'>What are the different ways to manage a state in a React application?</h3>
                    <p className='p-2'><span className='font-semibold underline'>Answer:</span>
                        There are four different ways to manage a state in a React application: <br />
                        1. Local state <br />
                        2. Global state <br />
                        3. Server state <br />
                        4. URL state <br />
                    </p>
                </div>

            </div>
        </section>
    );
};

export default Blogs;