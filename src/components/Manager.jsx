import React, { useEffect } from 'react'
import { useRef, useState } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { v4 as uuidv4 } from 'uuid';

const Manager = () => {

  const ref = useRef()
  const passwordRef = useRef()

  const [form, setform] = useState({ site: "", username: "", password: "" })

  const [passwordArray, setpasswordArray] = useState([])

  const getPasswords = async () => {

    let req = await fetch("http://localhost:3000/")
    let passwords = await req.json()
    setpasswordArray(passwords)
  }

  useEffect(() => {
    getPasswords()

  }, [])

  const copyText = (text) => {
    toast('Copied to Clipboard', {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
    navigator.clipboard.writeText(text)
  }

  const showPassword = () => {

    if (ref.current.src.includes("/icons/eyecross.png") && passwordRef.current.type !== "password") {
      ref.current.src = "/icons/eye.png";
      passwordRef.current.type = "password";
    } else {
      ref.current.src = "/icons/eyecross.png";
      passwordRef.current.type = "text";
    }
  }

  const savePassword = async () => {

    if (form.site.length > 3 && form.username.length > 3 && form.password.length > 3) {

      // if any such id exists in the database then delete it
      await fetch("http://localhost:3000/", {
        method: "DELETE", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: form.id })
      })

      setpasswordArray([...passwordArray, { ...form, id: uuidv4() }])
      
      let res = await fetch("http://localhost:3000/", {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, id: uuidv4() })
      })

      // localStorage.setItem("passwords", JSON.stringify([...passwordArray, { ...form, id: uuidv4() }]))

      setform({ site: "", username: "", password: "" })
      toast('Password saved !', {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
    else {
      toast('Min length of all fields must be 4!', {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  }

  const deletePassword = async (id) => {

    let c = confirm("Are you sure you want to delete this password?")
    if (c) {
      setpasswordArray(passwordArray.filter((item) => item.id !== id))

      let res = await fetch("http://localhost:3000/", {
        method: "DELETE", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: id })
      })

      // localStorage.setItem("passwords", JSON.stringify(passwordArray.filter((item) => item.id !== id)))

      toast('Password deleted !', {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  }

  const editPassword = (id) => {

    setform({...passwordArray.filter((item) => item.id === id)[0], id: id})
    setpasswordArray(passwordArray.filter((item) => item.id !== id))

  }

  const handleChange = (e) => {
    setform({ ...form, [e.target.name]: e.target.value })
  }

  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      // transition="bounce"
      />
      {/* Same as */}
      <ToastContainer />
      {/* <div className="absolute inset-0 -z-10 h-full w-full items-center m-0 md:px-5 md:py-24 [background:radial-gradient(125%_125%_at_50%_10%,#000_40%,#63e_100%)]"></div> */}

      <div className="px-4 py-2 md:mycontainer min-h-[88.2vh]">

        <h1 className='text-4xl font-extrabold text-center'>
          <span className='text-green-600'> &lt; </span>
          <span className='text-white'>Pass</span>
          <span className='text-green-600'>Man / &gt; </span>
        </h1>
        <p className='text-blue-400 text-lg text-center font-semibold'>Your Own Password Manager</p>

        <div className='flex flex-col p-4 text-black gap-4 items-center'>

          <input onChange={handleChange} className="rounded-full border border-blue-800 w-full p-4 py-1 font-mono" placeholder='Website url' type="text" name="site" value={form.site} id='site' />

          <div className='flex flex-col md:flex-row w-full gap-4 justify-center'>

            <input onChange={handleChange} className="rounded-full border border-blue-800 w-full p-4 py-1 font-mono" placeholder='Username' type="text" name="username" value={form.username} id='username' />

            <div className="relative">

              <input onChange={handleChange} ref={passwordRef} className="rounded-full border border-blue-800 w-full p-4 py-1 font-mono" placeholder='Password' type="password" name="password" value={form.password} id='password' />
              <span className='absolute right-1 top-[1px] cursor-pointer' onClick={showPassword}>
                <img className='p-1' width={30} ref={ref} src='icons/eye.png' alt="eye" />
              </span>

            </div>
          </div>

          <button onClick={savePassword} className='flex justify-center items-center bg-green-400 rounded-full px-8 py-4 w-fit gap-2 hover:bg-green-300'>
            <lord-icon
              src="https://cdn.lordicon.com/jgnvfzqg.json"
              trigger="hover">
            </lord-icon>
            Save</button>
        </div>

        <div className="passwords">
          <h2 className='font-bold font-mono text-white text-2xl py-4 text-center'>Your Passwords</h2>
          {passwordArray.length === 0 && <div className='text-white text-center font-semibold'>No passwords to show</div>}
          {passwordArray.length !== 0 &&
            <table className="table-auto w-full text-white rounded-xl overflow-hidden mb-5">
              <thead className='bg-indigo-950 bg-opacity-85'>
                <tr>
                  <th className='py-2 border border-blue-950 break-all'>Site</th>
                  <th className='py-2 border border-blue-950 break-all'>Username</th>
                  <th className='py-2 border border-blue-950 break-all'>Password</th>
                  <th className='py-2 border border-blue-950 break-all'>Actions</th>
                </tr>
              </thead>
              <tbody className='bg-indigo-900 bg-opacity-70'>
                {passwordArray.map((item, index) => {
                  return <tr key={index} className=''>
                    <td className='text-center py-2 border border-blue-900'>
                      <div className='flex justify-center items-center flex-col sm:flex-row text-wrap break-all'>
                        <a href={item.site} target='_blank'>{item.site}</a>
                        <div className='lordiconcopy cursor-pointer' onClick={() => { copyText(item.site) }}>
                          <lord-icon style={{ "width": "28px", "height": "28px", "marginLeft": "8px", "marginTop": "9px" }}
                            src="https://cdn.lordicon.com/ylvuooxd.json"
                            trigger="hover">
                          </lord-icon>
                        </div>
                      </div>
                    </td>
                    <td className='text-center py-2 border border-blue-900'>
                      <div className='flex justify-center items-center flex-col sm:flex-row text-wrap break-all'>
                        <span>{item.username}</span>
                        <div className='lordiconcopy cursor-pointer' onClick={() => { copyText(item.username) }}>
                          <lord-icon style={{ "width": "28px", "height": "28px", "marginLeft": "8px", "marginTop": "9px" }}
                            src="https://cdn.lordicon.com/ylvuooxd.json"
                            trigger="hover">
                          </lord-icon>
                        </div>
                      </div>
                    </td>
                    <td className='text-center py-2 border border-blue-900'>
                      <div className='flex justify-center items-center flex-col sm:flex-row break-all'>
                        <span>{"*".repeat(item.password.length)}</span>
                        <div className='lordiconcopy cursor-pointer' onClick={() => { copyText(item.password) }}>
                          <lord-icon style={{ "width": "28px", "height": "28px", "marginLeft": "8px", "marginTop": "9px" }}
                            src="https://cdn.lordicon.com/ylvuooxd.json"
                            trigger="hover">
                          </lord-icon>
                        </div>
                      </div>
                    </td>
                    <td className='text-center py-2 border border-blue-900'>
                      <div className='flex justify-center items-center gap-1 md:gap-5 flex-col sm:flex-row'>
                        <span onClick={() => (deletePassword(item.id))}>
                          <lord-icon style={{ "width": "28px", "height": "28px", "marginLeft": "8px", "marginTop": "9px", "cursor": "pointer" }}
                            src="https://cdn.lordicon.com/skkahier.json"
                            trigger="hover"
                            colors="primary:#e83a30">
                          </lord-icon>
                        </span>
                        <span onClick={() => (editPassword(item.id))}>
                          <lord-icon style={{ "width": "28px", "height": "28px", "marginLeft": "8px", "marginTop": "9px", "cursor": "pointer" }}
                            src="https://cdn.lordicon.com/vhyuhmbl.json"
                            trigger="hover"
                            colors="primary:#ebe6ef,secondary:#ffc738,tertiary:#16c72e">
                          </lord-icon>
                        </span>
                      </div>
                    </td>
                  </tr>
                })}
              </tbody>
            </table>
          }
        </div>
      </div>
    </>
  )
}

export default Manager
