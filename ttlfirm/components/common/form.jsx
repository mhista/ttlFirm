const InputField = ({ labelName, placeholder }) => {
    return (
      <div className=" w-full flex flex-col">
        {/* <label className="text-gray-400">{labelName}</label> */}
        <input
          className="w-full flex mt-2 py-5 pl-2 pr-20  text-black outline-0 outline-none  border text-start border-gray-100 bg-white "
          type="text"
          id="name"
          name="name"
          placeholder={placeholder}
        />
      </div>
    );
  };

const Form = ()=>{
return (<form className="flex w-full flex-col gap-6 px-5 text-white">
 <div className="flex w-full gap-4">
      <InputField labelName="Full Name" placeholder="Full name" />
      {/* <InputField labelName="Last Name" placeholder="last name" /> */}
    </div>
<div className="flex flex-wrap w-full gap-4">
      <InputField
        labelName="Phone number"
        placeholder="Phone number"
      />
      <InputField
        labelName="Email address"
        placeholder="Email address"
      />
    </div>
   
    
    <div>
      <textarea
        className="w-full flex  h-[100px] mt-2 p-3 outline-0 outline-none  border border-gray-100 bg-white text-black  resize-none"
        placeholder="Please provide a brief description of your inquiry"
      />
    </div>
    <button className="btn rounded-lg text-white w-full hover:text-black">SUBMIT</button>
  </form>)
}

export default Form;