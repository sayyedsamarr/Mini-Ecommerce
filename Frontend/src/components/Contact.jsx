import React from "react";
import ContactImage from "../assets/about_img.png"

const Contact = () => {
  return (
    <div>
      <div className="text-2xl text-center pt-8 font-bold">
        <h1>Contact Me</h1>
      </div>
      <div className="flex flex-col md:flex-row justify-center gap-10 mb-28 my-10">
        <img
          className="max-w-[200px] w-full h-auto object-cover rounded-lg"
         src={ContactImage}
          alt=""
        />
        <div className="flex flex-col justify-center items-start gap-6 text-sm">
          <p className="poppins-bold text-xl text-gray-600 ">Mini-Ecommerce</p>
          <p className="text-gray-500">
            {" "}
            A Mini e-commerce project that does almost everything real e-commerce does minus the part where people actually buy stuff. Built for Fynd’s assignment to prove I can manage categories, products, filters, and admin dashboards… basically everything except handling angry customers.
          </p>
          <p className="text-gray-500">
            Contact No : +91 8108138743
            <br /> Email: sa707510@gmail.com
          </p>
        </div>
      </div>
    </div>
  );
};

export default Contact;