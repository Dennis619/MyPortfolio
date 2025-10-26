import React, { useState, useRef } from "react";
import { BsFillSendFill } from "react-icons/bs";
import emailjs from "@emailjs/browser";
import Button from "./Button";

const Contact = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const formRef = useRef(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setSubmitStatus(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    const templateParams = {
      name: formData.fullName,
      email: formData.email,
      title: formData.subject,
      message: formData.message,
    };

    try {
      const response = await emailjs.send(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        templateParams,
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY
      );

      if (response.status === 200) {
        console.log("SUCCESS!");
        setSubmitStatus("success");
        setFormData({ fullName: "", email: "", subject: "", message: "" });
      } else {
        setSubmitStatus("error");
      }
    } catch (err) {
      console.error("Error sending email:", err);
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  const inputClasses =
    "w-full p-3 sm:p-4 border-2 border-gray-300 rounded-lg bg-white text-black text-sm sm:text-base placeholder-gray-500 focus:border-yellow-400 focus:outline-none focus:ring-2 focus:ring-yellow-300 transition-all duration-300";

  return (
    <section
      id="contact"
      className="min-h-screen w-full py-12 md:py-16 lg:py-20 px-4 sm:px-6 lg:px-8 flex flex-col items-center justify-center bg-gradient-to-b from-gray-50 to-gray-100"
    >
      {/* Header Section */}
      <div className="relative rounded-xl md:rounded-2xl bg-gradient-to-br from-gray-900 via-black to-gray-800 py-12 sm:py-16 md:py-20 px-4 sm:px-6 md:px-8 lg:px-12 text-blue-50 shadow-2xl w-full max-w-6xl overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-48 h-48 sm:w-64 sm:h-64 md:w-72 md:h-72 bg-yellow-400 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-pulse"></div>
        <div className="absolute bottom-0 left-0 w-48 h-48 sm:w-64 sm:h-64 md:w-72 md:h-72 bg-blue-400 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-pulse"></div>

        <div className="relative flex flex-col items-center text-center z-10">
          <p className="font-semibold text-xs sm:text-sm uppercase tracking-widest text-blue-400 mb-4 sm:mb-6">
            Get In Touch
          </p>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold leading-tight max-w-4xl px-2">
            Ready to collaborate and create something extraordinary.
            <br className="hidden sm:block" />
            <span className="block sm:inline mt-2 sm:mt-0"> </span>
            <span className="text-blue-400">I'm just a message away.</span>
          </h2>
        </div>
      </div>

      {/* Form Section */}
      <div
        ref={formRef}
        className="w-full max-w-2xl mt-8 sm:mt-12 md:mt-16 bg-white rounded-xl md:rounded-2xl shadow-xl p-6 sm:p-8 md:p-12"
      >
        <form onSubmit={handleSubmit} className="space-y-5 sm:space-y-6">
          {/* Full Name */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Full Name *
            </label>
            <input
              type="text"
              name="fullName"
              placeholder="John Doe"
              className={inputClasses}
              value={formData.fullName}
              onChange={handleChange}
              required
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Email Address *
            </label>
            <input
              type="email"
              name="email"
              placeholder="john@example.com"
              className={inputClasses}
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          {/* Subject */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Subject *
            </label>
            <input
              type="text"
              name="subject"
              placeholder="Project Inquiry"
              className={inputClasses}
              value={formData.subject}
              onChange={handleChange}
              required
            />
          </div>

          {/* Message */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Message *
            </label>
            <textarea
              name="message"
              placeholder="Tell me about your project..."
              className={inputClasses}
              rows="5"
              value={formData.message}
              onChange={handleChange}
              required
            />
          </div>

          {/* Submit Button */}
          <div className="pt-2 sm:pt-4">
            <Button
              title={isSubmitting ? "Sending..." : "Send Message"}
              rightIcon={<BsFillSendFill className="w-4 h-4 sm:w-5 sm:h-5" />}
              containerClass="w-full text-white text-sm sm:text-base bg-blue-500 hover:bg-blue-600 shadow-lg"
              disabled={isSubmitting}
            />
          </div>

          {/* Success Message */}
          {submitStatus === "success" && (
            <div className="p-3 sm:p-4 bg-green-50 border-2 border-green-500 rounded-lg text-green-800 text-center text-sm sm:text-base font-semibold animate-pulse">
              ✓ Message sent successfully! I'll get back to you soon.
            </div>
          )}

          {/* Error Message */}
          {submitStatus === "error" && (
            <div className="p-3 sm:p-4 bg-red-50 border-2 border-red-500 rounded-lg text-red-800 text-center text-sm sm:text-base font-semibold">
              ✗ Failed to send message. Please try again or email me directly.
            </div>
          )}
        </form>

        {/* Direct Contact */}
        <div className="mt-6 sm:mt-8 pt-6 sm:pt-8 border-t border-gray-200 text-center text-gray-600 text-xs sm:text-sm">
          <p className="mb-2">You can also reach me directly at:</p>
          <a
            href="mailto:sombadennis@gmail.com"
            className="text-blue-500 hover:text-blue-600 font-semibold break-all"
          >
            sombadennis@gmail.com
          </a>
        </div>
      </div>
    </section>
  );
};

export default Contact;
