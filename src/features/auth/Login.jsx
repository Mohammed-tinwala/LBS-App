import React, { useState } from 'react'
import { loginParent } from '../../api/authApi'
import { Eye, EyeOff } from 'lucide-react'
import { toast } from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
import { useAuth } from "../../context/AuthContext";

const Login = () => {

    const { login } = useAuth();
    const navigate = useNavigate();

    const [form, setForm] = useState({
        mobile: '',
        password: ''
    })

    const [errors, setErrors] = useState({})
    const [showPassword, setShowPassword] = useState(false)
    const [loading, setLoading] = useState(false)

    const [students, setStudents] = useState([])
    const [showModal, setShowModal] = useState(false)

    const handleChange = (e) => {
        const { name, value } = e.target
        setForm({ ...form, [name]: value })
        setErrors({ ...errors, [name]: '' })
    }

    const validate = () => {
        let newErrors = {}

        if (!form.mobile) {
            newErrors.mobile = "Mobile number is required"
        } else if (!/^\d{10}$/.test(form.mobile)) {
            newErrors.mobile = "Enter valid 10-digit number"
        }

        if (!form.password) {
            newErrors.password = "Password is required"
        } else if (form.password.length < 4) {
            newErrors.password = "Password must be at least 4 characters"
        }

        return newErrors
    }

    // ✅ Format Name
    const formatName = (name) =>
        name?.toLowerCase().replace(/\b\w/g, c => c.toUpperCase())

    // ✅ Student Select Handler
    const handleSelectStudent = (student) => {
        login(student)
        setShowModal(false)

        toast.success(`Welcome ${formatName(student.name)} 👋`)
        navigate("/home")
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        const validationErrors = validate()

        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors)
            toast.error("Please fix the errors")
            return
        }

        try {
            setLoading(true)

            const res = await loginParent(form.mobile, form.password)

            if (res.status) {
                const studentsList = res.students || []

                if (studentsList.length === 0) {
                    toast.error("No student found")
                    return
                }

                // ✅ Single student
                if (studentsList.length === 1) {
                    handleSelectStudent(studentsList[0])
                } else {
                    // ✅ Multiple → show modal
                    setStudents(studentsList)
                    setShowModal(true)
                }

            } else {
                toast.error(res.message || "Login failed")
            }

        } catch (err) {
            console.error(err)
            toast.error("Server error, try again")
        } finally {
            setLoading(false)
        }
    }

    const isDisabled = !form.mobile || !form.password || loading

    return (
        <div className='h-screen flex-center flex-col safe-area max-w-7xl mx-auto px-4'>

            {/* Logo */}
            <div className='w-18 h-18 bg-primary/40 p-2.5 mb-4 rounded-2xl flex-center'>
                <img src="/images/logo.webp" alt="Logo" className="w-14 h-14 animate-fadeIn" />
            </div>

            {/* Heading */}
            <div className='flex-center flex-col mb-10'>
                <h1 className='text-[24px] text-primary-dark font-semibold'>
                    Sign In
                </h1>
                <p className='text-[12px] text-label mt-1'>
                    Please login to your account
                </p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit}>

                {/* Mobile */}
                <label className='text-[12px]'>Mobile no.</label>
                <input
                    type="tel"
                    name="mobile"
                    value={form.mobile}
                    onChange={handleChange}
                    placeholder='Enter your mobile no.'
                    className='w-full h-14 bg-input-bg border border-primary rounded-[14px] px-4 mt-1 mb-2 outline-none focus:ring-2 focus:ring-primary/40 placeholder:text-[12px]'
                />
                {errors.mobile && (
                    <p className='text-red-500 text-xs mb-4'>{errors.mobile}</p>
                )}

                {/* Password */}
                <div>
                    <label className='text-[12px]'>Password</label>

                    <div className='relative'>
                        <input
                            type={showPassword ? "text" : "password"}
                            name="password"
                            value={form.password}
                            onChange={handleChange}
                            placeholder='Enter your password'
                            className='w-full h-14 bg-input-bg border border-primary rounded-[14px] px-4 pr-12 mt-1 mb-1 outline-none focus:ring-2 focus:ring-primary/40 placeholder:text-[12px]'
                        />

                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className='absolute right-4 top-1/2 -translate-y-1/2 text-label hover:text-primary transition'
                        >
                            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                        </button>
                    </div>
                </div>

                {errors.password && (
                    <p className='text-red-500 text-xs mb-4'>{errors.password}</p>
                )}

                {/* Button */}
                <button
                    type="submit"
                    disabled={isDisabled}
                    className={`w-full h-15 rounded-[14px] mt-4 text-white font-medium transition 
                    ${isDisabled ? 'bg-primary/50 cursor-not-allowed' : 'bg-primary active:scale-95'}`}
                >
                    {loading ? "Signing in..." : "Sign In"}
                </button>

            </form>

            {/* 🔥 STUDENT SELECTION MODAL */}
            {showModal && (
                <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 px-4">

                    <div className="bg-white w-full max-w-sm rounded-3xl p-5 animate-fadeIn">

                        <h2 className="text-lg font-semibold mb-4 text-center">
                            Select Student
                        </h2>

                        <div className="flex flex-col gap-3">
                            {students.map((std) => (
                                <div
                                    key={std.id}
                                    onClick={() => handleSelectStudent(std)}
                                    className="p-4 rounded-2xl border border-primary/30 bg-primary/10 cursor-pointer active:scale-95 transition"
                                >
                                    <h3 className="font-semibold text-[15px]">
                                        {formatName(std.name)}
                                    </h3>
                                    <p className="text-xs text-label">
                                        Enrollment: {std.enrollment}
                                    </p>
                                </div>
                            ))}
                        </div>

                    </div>
                </div>
            )}

        </div>
    )
}

export default Login