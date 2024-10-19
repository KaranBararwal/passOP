import React from "react";
import { useRef, useState, useEffect } from "react";
import { ToastContainer, toast } from 'react-toastify';
import { v4 as uuidv4 } from 'uuid';

 

import 'react-toastify/dist/ReactToastify.css';

const Manager = () => {
  const ref = useRef();
  const passwordRef = useRef()
  const [form, setform] = useState({ site: "", username: "", password: "" });
  const [passwordArray, setPasswordArray] = useState([]);


  const getPasswords = async () => {
        
    let req = await fetch("http://localhost:3000/");
    let passwords = await req.json()

    console.log(passwords)
    setPasswordArray(passwords)
  }
  
  useEffect(() => {
    // get the passwords from the storage if there are some already
    getPasswords()
  }, []);

  const copyText = (text) => {
    toast('🦄 Copied to clipboard!', {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark"
      });
    // alert("Copied to clipboard " + text)
    navigator.clipboard.writeText(text)
  }
  
  

  const showPassword = () => {
    // alert("Show the Password")
    // if(ref.current.src === "icons/eyecross.png"){


    // starting me password ka kya type rkhna hai
    // passwordRef.current.type = "text"
    console.log(ref.current.src);
    if (ref.current.src.includes("icons/eyecross.png")) {
      ref.current.src = "icons/eye.png";
      passwordRef.current.type = "text"
    } 
    else {
      ref.current.src = "icons/eyecross.png";
      passwordRef.current.type = "password"
    }
  };

  const savePassword = async () => {
    if(form.site.length >3 && form.username.length >3 &&form.password.length >3){
    // spreading ...

    // if any such id exists in the db , delete it cuz edit option is clicked
    await fetch("http://localhost:3000/" , 
      {method : "DELETE",
        headers : { "Content-Type" : "application/json"},
        body : JSON.stringify({id : form.id}) // jo di h id wo delete kro
        // body : JSON.stringify({...form, id:id}) // jo di h id wo delete kro
      }
    )

    // saving uuid for every form in the website to accessing the passwords uniquly
    setPasswordArray([...passwordArray,{...form , id : uuidv4()}]);


    // localStorage.setItem("passwords", JSON.stringify([...passwordArray,{...form , id : uuidv4()}]));
      await fetch("http://localhost:3000/" , 
        {method : "POST",
          headers : { "Content-Type" : "application/json"},
          body : JSON.stringify({...form, id: uuidv4()})
        }
      )


    // console.log(passwordArray) // it will not console it so fast
    // console.log([...passwordArray, form]);
    // making the form clear after saving
    setform({site:"" , username : "" , password: ""})

      toast('🦄 Password saved!', {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "dark"
    });
  }
  else{
    toast('Error: Invaild password format')
  }
  };




  const deletePassword = async (id) => {
    console.log("Deleting password with id " , id)
    // selecting those passwords which id is not equal to the deleting password

    let c = confirm("Do you really want to delete this password?")

    if(c){
    setPasswordArray(passwordArray.filter(item=>item.id !== id))
    // saving the remaing passwords in the local storage
    // localStorage.setItem("passwords" , JSON.stringify(passwordArray.filter(item => item.id !== id)))
    let res = await fetch("http://localhost:3000/" , 
      {method : "DELETE",
        headers : { "Content-Type" : "application/json"},
        body : JSON.stringify({id}) // jo di h id wo delete kro
        // body : JSON.stringify({...form, id:id}) // jo di h id wo delete kro
      }
    )

    toast('🦄 Password deleted successfully!', {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark"
      });
    }
  }




  const editPassword = (id) => {
    console.log("Deleting password with id " , id)

    // for mein edit wale password ki value copy kr denge
    // array ka first element choose krenge

    // we will spread it and will add the id for of the password for which the edit option is clicked
    // form ki id set kr rhe fir jaise hi save kre to delete wali api chal jaye
    setform({...passwordArray.filter(i=>i.id ===id)[0] , id:id})

    // edit wale password ko delete kr denge 
    setPasswordArray(passwordArray.filter(item=>item.id !== id))

    
  }
  



  const handleChange = (e) => {
    // spread the form
    setform({ ...form, [e.target.name]: e.target.value });
  };

  return (
    <>

        <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition = "Bounce"
        />
        {/* Same as */}
        <ToastContainer />

      <div className="absolute inset-0 -z-10 h-full w-full bg-green-50 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]">
        <div className="absolute left-0 right-0 top-0 -z-10 m-auto h-[310px] w-[310px] rounded-full bg-green-400 opacity-20 blur-[100px]"></div>
      </div>

      {/* responsiveness adding here */}
      <div className="md:mycontainer min-h-[83.3vh] p-3">
        <h1 className="text-4xl font-bold text-center">
          <span className="text-green-700">&lt;</span>

          <span>Pass</span>
          <span className="text-green-500">OP/&gt;</span>
        </h1>

        <p className="text-green-900 text-lg text-center">
          Your own Password Manager
        </p>

        {/* Website name entering */}
        <div className="text-black flex flex-col p-4 gap-8">
          <input
            value={form.site}
            onChange={handleChange}
            placeholder="Enter Website URL"
            type="text"
            className="rounded-full border border-green-500 w-full p-4 py-1"
            name="site"
            id="site"
          />

          {/* taking username and password details */}
          {/* for making reponsive the both input should display in column in phone and in row for pc
          so we can write flex-row after reaching the a particulare dimmension and otherwise it should be column wise */}
          <div className="flex flex-col md:flex-row w-full justify-between gap-8">
            <input
              value={form.username}
              onChange={handleChange}
              placeholder="Enter Username"
              type="text"
              className="rounded-full border border-green-500 w-full p-4 py-1"
              name="username"
              id="username"
            />

            <div className="relative">
              <input
                ref = {passwordRef}
                value={form.password}
                onChange={handleChange}
                placeholder="Enter Password"
                type="password"
                className="rounded-full border border-green-500 w-full p-4 py-1"
                name="password"
                id="password"
              />
              {/* making the eye icon */}
              <span
                className="absolute right-[3px] top-[4px] cursor-pointer"
                onClick={showPassword}
              >
                <img
                  ref={ref}
                  className="p-1"
                  width={26}
                  src="icons/eyecross.png"
                  alt="eye"
                />
              </span>
            </div>
          </div>

          {/* items-center for the text aligment */}
          <button
            onClick={savePassword}
            className="flex items-center gap-2 self-center bg-green-400 hover:bg-green-300 rounded-full px-8 py-2 w-fit 
        border border-green-900"
          >
            <lord-icon
              src="https://cdn.lordicon.com/jgnvfzqg.json"
              trigger="loop-on-hover"
              delay="200"
            ></lord-icon>
            Save
          </button>
        </div>

        <div className="passwords">
                    <h2 className='font-bold text-2xl py-4'>Your Passwords</h2>
                    {passwordArray.length === 0 && <div> No passwords to show</div>}
                    {passwordArray.length != 0 && <table className="table-auto w-full rounded-md overflow-hidden mb-10">
                        <thead className='bg-green-800 text-white'>
                            <tr>
                                <th className='py-2'>Site</th>
                                <th className='py-2'>Username</th>
                                <th className='py-2'>Password</th>
                                <th className='py-2'>Actions</th>
                            </tr>
                        </thead>
                        <tbody className='bg-green-100'>
                            {passwordArray.map((item, index) => {
                                return <tr key={index}>
                                    <td className='py-2 border border-white text-center'>
                                        <div className='flex items-center justify-center '>
                                            <a href={item.site} target='_blank'>{item.site}</a>

                                            {/* here we are passing onClick functions as arrow function otherwise it is going to execute while renfering instead of running on the click */}
                                            <div className='lordiconcopy size-7 cursor-pointer' onClick={() => { copyText(item.site) }}>
                                              
                                                <lord-icon
                                                // style tag need to passed as object for applying here
                                                    style={{ "width": "25px", "height": "25px", "paddingTop": "3px", "paddingLeft": "3px" }}
                                                    src="https://cdn.lordicon.com/iykgtsbt.json"
                                                    trigger="hover" >
                                                </lord-icon>
                                            </div>
                                        </div>
                                    </td>
                                    <td className='py-2 border border-white text-center'>
                                        <div className='flex items-center justify-center '>
                                            <span>{item.username}</span>
                                            <div className='lordiconcopy size-7 cursor-pointer' onClick={() => { copyText(item.username) }}>
                                                <lord-icon
                                                    style={{ "width": "25px", "height": "25px", "paddingTop": "3px", "paddingLeft": "3px" }}
                                                    src="https://cdn.lordicon.com/iykgtsbt.json"
                                                    trigger="hover" >
                                                </lord-icon>
                                            </div>
                                        </div>
                                    </td>
                                    <td className='py-2 border border-white text-center'>
                                        <div className='flex items-center justify-center '>
                                            <span>{"*".repeat(item.password.length)}</span>
                                            <div className='lordiconcopy size-7 cursor-pointer' onClick={() => { copyText(item.password) }}>
                                                <lord-icon
                                                    style={{ "width": "25px", "height": "25px", "paddingTop": "3px", "paddingLeft": "3px" }}
                                                    src="https://cdn.lordicon.com/iykgtsbt.json"
                                                    trigger="hover" >
                                                </lord-icon>
                                            </div>
                                        </div>
                                    </td>
                                    <td className='justify-center py-2 border border-white text-center'>
                                        <span className='cursor-pointer mx-1' onClick={()=>{editPassword(item.id)}}>
                                            <lord-icon
                                                src="https://cdn.lordicon.com/gwlusjdu.json"
                                                trigger="hover"
                                                style={{"width":"25px", "height":"25px"}}>
                                            </lord-icon>
                                        </span>
                                        <span className='cursor-pointer mx-1'onClick={()=>{deletePassword(item.id)}}>
                                            <lord-icon
                                                src="https://cdn.lordicon.com/skkahier.json"
                                                trigger="hover"
                                                style={{"width":"25px", "height":"25px"}}>
                                            </lord-icon>
                                        </span>
                                    </td>
                                </tr>

                            })}
                        </tbody>
                    </table>}
                </div>
            </div>
    </>
  );
};

export default Manager;
