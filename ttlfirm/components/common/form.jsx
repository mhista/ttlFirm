"use client";
import { useState } from "react";
const InputField = ({ labelName, placeholder, type, name, value, onChange }) => {
    return (
      <div className=" w-full flex flex-col">
        {/* <label className="text-gray-400">{labelName}</label> */}
        <input
          className="w-full flex mt-2 py-5 pl-2 pr-20  text-black outline-0 outline-none  border text-start border-gray-100 bg-white "
          type={type}
          id="name"
          name={name}
          placeholder={placeholder}
          value={value ?? ''}
          onChange={onChange}
          required
        />
      </div>
    );
  };

const Form = ()=>{

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    message: '',
  })

  const [status, setStatus] = useState("");
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
};

const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("Sending...");

    try {
      console.log(formData)
        const response = await fetch("/api/email", {
            method: "POST",
            // headers: {
            //     "Content-Type": "application/json",
            // },
            body: JSON.stringify(formData),
        });

        const result = response.json();

        if (response.ok) {
            setStatus("Message sent successfully!");
            setFormData({ name: "", email: "", message: "", phone:"" });
        } else {
            setStatus(`Error: ${result.error}`);
        }
    } catch (error) {
        console.log("Error:", error);
        setStatus("Failed to send message.");
    }
};

return (<div>
  <form className="flex w-full flex-col gap-6 px-2 sm:px-5 text-white" onSubmit={handleSubmit}>
 <div className="flex w-full gap-4">
      <InputField labelName="Full Name" placeholder="Full name" type={"text"} name={"name"} value={formData.name} onChange={handleChange} />
      {/* <InputField labelName="Last Name" placeholder="last name" /> */}
    </div>
<div className="flex flex-wrap w-full gap-4">
      <InputField
        labelName="Phone number"
        placeholder="Phone number"
        type={"tel"}
        name={"phone"}
        value={formData.phone}
        onChange={handleChange}


      />
      <InputField
        labelName="Email address"
        placeholder="Email address"
        type={"email"}
        name={"email"}
        value={formData.email}

        onChange={handleChange}

      />
    </div>
   
    
    <div>
      <textarea
        className="w-full flex  h-[100px] mt-2 p-3 outline-0 outline-none  border border-gray-100 bg-white text-black  resize-none"
        placeholder="Please provide a brief description of your inquiry"
        name="message"
        value={formData.message}
        onChange={handleChange}
        required
      />
    </div>
    <button className="btn rounded-lg text-white w-full hover:text-black">SUBMIT</button>
    
  </form>
  <p>{status}</p>
</div>)
}

export default Form;