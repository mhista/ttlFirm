const InputField = ({ labelName, placeholder }) => {
    return (
      <div className=" w-full flex flex-col">
        <label className="text-gray-400">{labelName}</label>
        <input
          className="w-full flex rounded-lg mt-2 py-2.5 px-2 text-sm text-gray-300 outline-0 outline-none  border border-gray-100 bg-transparent focus:border-amber-600"
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
    <h1 className="font-serif text-4xl">
      CONTACT <span className="text-amber-600">US</span>
    </h1>
    <p className="font-sans text-sm">
      Complete the form and we will get back to you as soon as possible
    </p>
    <div className="flex w-full gap-4">
      <InputField labelName="First Name" placeholder="Enter first name" />
      <InputField labelName="Last Name" placeholder="Enter last name" />
    </div>
    <div className="flex w-full gap-4">
      <InputField
        labelName="Phone number"
        placeholder="Enter phone number"
      />
      <InputField
        labelName="Email address"
        placeholder="Enter email address"
      />
    </div>
    <div>
      <textarea
        className="w-full flex rounded-lg h-[100px] mt-2 p-3 text-sm outline-0 outline-none  border border-gray-100 bg-transparent focus:border-amber-600"
        placeholder="Please provide a brief description of your inquiry"
      />
    </div>
    <button className="btn rounded-lg text-white w-full md:w-32">SUBMIT</button>
  </form>)
}

export default Form;