'use client';

import React, { useState, useEffect } from "react";
import Slider from "react-slick";
import Image from "next/image";

const MultipleItems = () => {
    const [items, setItems] = useState([]);

    const [job, setJob] = useState([]);
    const [role, setRole] = useState([]);

    let localData = localStorage.getItem("dataFromAPI") || "";
    
    let data: any = JSON.parse(localData);

    useEffect(() => {
        if (Object.keys(data)) {
            setJob(data.job_recommended)
            setRole(data.role_recommended)
        }
    }, [data])

    const settings = {
        dots: true,
        dotsClass: "slick-dots",
        infinite: true,
        slidesToShow: 3,
        slidesToScroll: 2,
        arrows: false,
        autoplay: false,
        speed: 500,
        autoplaySpeed: 2000,
        cssEase: "linear",
        responsive: [
            {
                breakpoint: 1200,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 1,
                    infinite: true,
                    dots: false
                }
            },
            {
                breakpoint: 800,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                    infinite: true,
                    dots: false
                }
            },
            // {
            //     breakpoint: 600,
            //     settings: {
            //         slidesToShow: 1,
            //         slidesToScroll: 1,
            //         infinite: true,
            //         dots: false
            //     }
            // }
        ]
    };

    return (

        <div id="testimonial">
            <div className='mx-auto max-w-7xl sm:py-4 lg:px-8'>
                <div className="mx-auto max-w-7xl sm:py-8 px-4 lg:px-8">
                    <h2 className="text-midnightblue text-4xl lg:text-5xl font-semibold mb-5 sm:mb-0 mt-3">Role Recommendations</h2>
                    <h2 className='text-charcoal text-4xl font-normal text-center mt-8'>Role recommended based on your Education and Skills <br /> <span className="underline font-bold mt-18">{role[0]}</span></h2>

                    <Slider {...settings}>
                        {job.map((item, i) => (
                            <div key={i}>
                                <div className={`bg-white m-4 p-5 my-20 relative ${i % 2 ? 'middleDiv' : 'testimonial-shadow'}`}>
                                    <h1 className="p-5">Designation: {item["Job Title"]}</h1>
                                    <h1>Work Type: {item["Work Type"]}</h1>
                                    <h1>Skills: {item["skills"]}</h1>
                                    <h1>Work Type: {item["Qualifications"]}</h1>

                                    <hr style={{ color: "#D7D5D5" }} />
                                    <div className="flex justify-between">
                                        <div>
                                            <div>
                                                <h3 className='text-lg font-medium text-darkbrown pt-4 pb-2'>{item.Company}</h3>
                                                <h3 className='text-sm font-normal text-lightgray pb-2'>{item.location}, {item.Country}</h3>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </Slider>
                </div>
            </div>
        </div>
    );
}

export default MultipleItems;
