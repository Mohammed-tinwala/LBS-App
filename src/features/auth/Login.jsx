import React, { useState } from 'react'
import { Eye, EyeOff } from 'lucide-react'
import { toast } from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'

const Login = () => {

    const navigate = useNavigate();

    const [form, setForm] = useState({
        mobile: '',
        password: ''
    })

    const [errors, setErrors] = useState({})
    const [showPassword, setShowPassword] = useState(false)
    const [loading, setLoading] = useState(false)

    const handleChange = (e) => {
        const { name, value } = e.target

        setForm({ ...form, [name]: value })

        // Clear error while typing
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

    const handleSubmit = async (e) => {
        e.preventDefault()

        const validationErrors = validate()

        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors)
            toast.error("Please fix the errors") // ❌ error toast
            return
        }

        try {
            setLoading(true)

            // Simulate API
            await new Promise((res) => setTimeout(res, 1500))

            toast.success("Login successful 🎉") // ✅ success toast

            console.log(form)

            navigate("/")

        } catch (err) {
            toast.error("Something went wrong")
        } finally {
            setLoading(false)
        }
    }

    const isDisabled = !form.mobile || !form.password || loading

    return (
        <div className='h-screen flex-center flex-col safe-area max-w-7xl mx-auto px-4'>

            {/* Logo */}
            <div className='w-22.5 h-22.5 bg-primary/40 p-2.5 mb-10 rounded-3xl flex-center'>
                <img src="/images/logo.png" alt="Logo" className="w-16 h-16 animate-fadeIn" />
            </div>

            {/* Heading */}
            <div className='flex-center flex-col mb-10'>
                <h1 className='text-[32px] text-primary-dark font-semibold mt-4'>
                    Sign In
                </h1>
                <p className='text-sm text-label mt-1 mb-6'>
                    Please login to your account
                </p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit}>

                {/* Mobile */}
                <label className='text-[14px]'>Mobile no.</label>
                <input
                    type="tel"
                    name="mobile"
                    value={form.mobile}
                    onChange={handleChange}
                    placeholder='Enter your mobile no.'
                    className='w-full h-15 bg-input-bg border border-primary rounded-[14px] px-4 mt-1 mb-2 outline-none focus:ring-2 focus:ring-primary/40'
                />
                {errors.mobile && (
                    <p className='text-red-500 text-xs mb-4'>{errors.mobile}</p>
                )}

                {/* Password */}
                <div className='relative'>
                    <label className='text-[14px]'>Password</label>
                    <input
                        type={showPassword ? "text" : "password"}
                        name="password"
                        value={form.password}
                        onChange={handleChange}
                        placeholder='Enter your password'
                        className='w-full h-15 bg-input-bg border border-primary rounded-[14px] px-4 pr-12 mt-1 mb-1 outline-none focus:ring-2 focus:ring-primary/40'
                    />

                    <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className='absolute right-4 top-1/2 text-label hover:text-primary transition'
                    >
                        {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                    </button>
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
        </div>
    )
}

export default Login