import Hero from "../../../Components/HomeCompo/Hero";

const HomePage = () => {
    return (
        <div>
            Homepage
            <Hero/>
            <marquee className='text-2xl'>Please Login first and check your Dashboard</marquee>
        </div>
    );
};

export default HomePage;