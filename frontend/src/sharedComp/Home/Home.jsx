import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const heroImage = 'https://img.freepik.com/premium-photo/charming-call-center-woman-grinned-while-working-giving-customers-courteous-attentive-service-front-laptop-with-lens-flare-bokeh-office-with-soft-dark-tone-generative-ai_722401-5222.jpg?w=900';
const categoryImages = {
    sarees: 'https://assets.myntassets.com/h_720,q_90,w_540/v1/assets/images/28206710/2024/3/12/8f5a1d59-a5f8-44d4-b1cb-a72a9e1ad7bf1710233595802MaroonSatinSolidwithEmbroideredLaceSaree1.jpg',
    kurtasets: 'https://assets.myntassets.com/h_720,q_90,w_540/v1/assets/images/27406590/2024/2/6/5904c221-d661-47e3-aacf-447b4f4cbd091707232494335KALINIWomenFloralPrintedRegularKurtawithPalazzos1.jpg',
    jumpsuit: 'https://img.fantaskycdn.com/c7880a6c4a8fd41abb0335c71ee0e268_1080x.jpeg',
    co_ords: 'https://rukminim2.flixcart.com/image/832/832/xif0q/night-suit/5/2/o/m-438-ctmtex-original-imagtqfmcgcszrch.jpeg?q=70&crop=false',
    skirts: 'https://assets.ajio.com/medias/sys_master/root/20230912/kVFP/6500583fafa4cf41f5dda4a1/-473Wx593H-442174009-beige-MODEL.jpg',
};

const categories = [
    { name: 'Sarees', image: categoryImages.sarees, id: 'sarees' },
    { name: 'Kurta Sets', image: categoryImages.kurtasets, id: 'kurtasets' },
    { name: 'Jumpsuit', image: categoryImages.jumpsuit, id: 'jumpsuit' },
    { name: 'Co-Ords', image: categoryImages.co_ords, id: 'co_ords' },
    { name: 'Skirts', image: categoryImages.skirts, id: 'skirts' },
];

const CategoryCard = ({ category, onSelect }) => (
    <div onClick={() => onSelect(category.id)} className="cursor-pointer group">
        <div className="relative overflow-hidden rounded-lg shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
            <img src={category.image} alt={category.name} className="w-full h-80 object-cover group-hover:scale-110 transition-transform duration-500" />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent opacity-70 group-hover:opacity-80 transition-opacity duration-300"></div>
            <div className="absolute bottom-0 left-0 right-0 p-6">
                <h3 className="text-white text-2xl font-bold group-hover:scale-110 transition-transform duration-300">{category.name}</h3>
                <p className="text-gray-300 mt-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">Explore products</p>
            </div>
        </div>
    </div>
);

const Home = () => {
    const navigate = useNavigate();

    const handleCategorySelect = (categoryId) => {
        // console.log(categoryId);
        navigate(`/products/${categoryId}`);
    };

    return (
        <div className="flex flex-col min-h-screen bg-gray-50">
            <div className="container mx-auto px-4 py-5 flex-grow select-none">
                {/* Hero Section */}
                <div className="relative mb-24 rounded-2xl overflow-hidden shadow-2xl">
                    <img src={heroImage} alt="Hero" className="w-full h-[79vh] delay-700 transition object-cover" />
                    <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col items-center justify-center text-white px-4">
                        <h1 className="text-6xl md:text-7xl font-extrabold mb-8 text-center leading-tight">Welcome to Our Store</h1>
                        <p className="text-2xl md:text-3xl mb-12 text-center max-w-3xl font-light">Discover amazing products across all categories</p>
                        <Link
                            to="/products"
                            className="bg-white text-black px-10 py-4 rounded-full font-bold text-xl hover:bg-gray-200 transition-all duration-300 transform hover:scale-105 hover:shadow-lg"
                        >
                            Shop Now
                        </Link>
                    </div>
                </div>

                {/* Categories Section */}
                <div className="mb-24">
                    <h2 className="text-5xl font-bold mb-12 text-center text-gray-800">Shop by Category</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
                        {categories.map((category, index) => (
                            <CategoryCard key={index} category={category} onSelect={handleCategorySelect} />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Home;








