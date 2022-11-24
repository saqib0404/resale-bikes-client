import React from 'react';

const Blogs = () => {
    return (
        <section>
            <h2 className='text-4xl font-bold text-center underline mt-5'>Blogs</h2>

            <div className="blogs mx-auto my-10 w-11/12 md:w-8/12">

                {/* Blog-1 */}
                <div className="blog border-2 border-blue-100 rounded-lg p-4 mb-4">
                    <h3 className='text-center text-2xl'>What are the different ways to manage a state in a React application?</h3>
                    <p className='p-2'><span className='font-semibold underline'>Answer:</span>
                        There are four different ways to manage a state in a React application: <br />
                        1. Local state <br />
                        2. Global state <br />
                        3. Server state <br />
                        4. URL state <br />
                    </p>
                </div>

                {/* Blog-2 */}
                <div className="blog border-2 border-blue-100 rounded-lg p-4 mb-4">
                    <h3 className='text-center text-2xl'>How does prototypical inheritance work?</h3>
                    <p className='p-2'><span className='font-semibold underline'>Answer:</span>
                        The Prototypal Inheritance is a feature in javascript used to add methods and properties in objects. It is a method by which an object can inherit the properties and methods of another object. Traditionally, in order to get and set the [[Prototype]] of an object, we use Object. getPrototypeOf and Object.
                    </p>
                </div>

                {/* Blog-3 */}
                <div className="blog border-2 border-blue-100 rounded-lg p-4 mb-4">
                    <h3 className='text-center text-2xl'>What is a unit test? Why should we write unit tests?</h3>
                    <p className='p-2'><span className='font-semibold underline'>Answer:</span>
                    The main objective of unit testing is to isolate written code to test and determine if it works as intended. Unit testing is an important step in the development process, because if done correctly, it can help detect early flaws in code which may be more difficult to find in later testing stages. That is why we should use it.
                    </p>
                </div>

            </div>
        </section>
    );
};

export default Blogs;