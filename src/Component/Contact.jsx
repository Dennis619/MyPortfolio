import React, { useState, useEffect, useRef } from "react";
import { BsFillSendFill } from "react-icons/bs";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import emailjs from "@emailjs/browser";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

const Button = ({ title, rightIcon, containerClass, disabled }) => (
  <button
    type="submit"
    disabled={disabled}
    className={`px-8 py-3 rounded-lg font-semibold flex items-center justify-center gap-2 transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed ${containerClass}`}
  >
    {title}
    {rightIcon}
  </button>
);

const Contact = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const sectionRef = useRef(null);
  const headerRef = useRef(null);
  const titleRef = useRef(null);
  const formRef = useRef(null);
  const inputRefs = useRef([]);

  useGSAP(
    () => {
      // Header animation on scroll
      gsap.from(headerRef.current, {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          end: "top 30%",
          toggleActions: "play none none reverse",
        },
        opacity: 0,
        y: -50,
        duration: 1,
        ease: "power3.out",
      });

      // Title animation
      gsap.from(titleRef.current, {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%",
          end: "top 30%",
          toggleActions: "play none none reverse",
        },
        opacity: 0,
        y: 100,
        duration: 1.2,
        ease: "power4.out",
      });

      // Form container animation
      gsap.from(formRef.current, {
        scrollTrigger: {
          trigger: formRef.current,
          start: "top 85%",
          toggleActions: "play none none reverse",
        },
        opacity: 0,
        y: 80,
        duration: 1,
        ease: "power3.out",
      });

      // Stagger animation for form inputs
      inputRefs.current.forEach((input, index) => {
        if (input) {
          gsap.from(input, {
            scrollTrigger: {
              trigger: formRef.current,
              start: "top 80%",
              toggleActions: "play none none reverse",
            },
            opacity: 0,
            x: -50,
            duration: 0.8,
            delay: index * 0.15,
            ease: "power2.out",
          });
        }
      });

      // Floating animation for the header section
      gsap.to(headerRef.current, {
        y: -10,
        duration: 2,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });
    },
    { scope: sectionRef }
  );

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
      name: formData.fullName, // matches {{name}} in your email template
      email: formData.email, // optional, can also include {{email}} if you use it
      title: formData.subject, // matches {{subject}} in your email template
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
        setFormData({ fullName: "", email: "", subject: "" });

        // Success animation
        gsap.to(formRef.current, {
          scale: 1.02,
          duration: 0.3,
          yoyo: true,
          repeat: 1,
        });
      } else {
        setSubmitStatus("error");
        alert("Something went wrong. Please try again.");
      }
    } catch (err) {
      console.error("Error sending email:", err);
      setSubmitStatus("error");
      alert("Failed to send message. Please try again later.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const inputClasses =
    "w-full p-4 border-2 border-gray-300 rounded-lg bg-white text-black placeholder-gray-500 focus:border-yellow-400 focus:outline-none focus:ring-2 focus:ring-yellow-300 transition-all duration-300";

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="min-h-screen w-full p-6 flex flex-col items-center justify-center bg-gradient-to-b from-gray-50 to-gray-100"
    >
      <div
        ref={headerRef}
        className="relative rounded-2xl bg-gradient-to-br from-gray-900 via-black to-gray-800 py-20 px-8 text-blue-50 shadow-2xl w-full max-w-6xl overflow-hidden"
      >
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-72 h-72 bg-yellow-400 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-pulse"></div>
        <div className="absolute bottom-0 left-0 w-72 h-72 bg-blue-400 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-pulse"></div>

        <div className="relative flex flex-col items-center text-center z-10">
          <p className="font-semibold text-sm uppercase tracking-widest text-blue-400 mb-6">
            Get In Touch
          </p>
          <h2
            ref={titleRef}
            className="text-4xl md:text-6xl font-bold leading-tight max-w-4xl"
          >
            Ready to collaborate and create something extraordinary.
            <br />
            <span className="text-blue-400">I'm just a message away.</span>
          </h2>
        </div>
      </div>

      <div
        ref={formRef}
        className="w-full max-w-2xl mt-16 bg-white rounded-2xl shadow-xl p-8 md:p-12"
      >
        <form onSubmit={handleSubmit} className="space-y-6">
          <div ref={(el) => (inputRefs.current[0] = el)}>
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

          <div ref={(el) => (inputRefs.current[1] = el)}>
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

          <div ref={(el) => (inputRefs.current[2] = el)}>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Subject *
            </label>
            <input
              type="text"
              name="subject"
              placeholder="Subject"
              className={inputClasses}
              value={formData.subject}
              onChange={handleChange}
              required
            />
          </div>

          <div ref={(el) => (inputRefs.current[3] = el)}>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Message *
            </label>
            <textarea
              name="message"
              placeholder="Tell me about your project..."
              className={inputClasses}
              rows="6"
              value={formData.message}
              onChange={handleChange}
              required
            />
          </div>

          <div ref={(el) => (inputRefs.current[4] = el)} className="pt-4">
            <Button
              title={isSubmitting ? "Sending..." : "Send Message"}
              rightIcon={<BsFillSendFill />}
              containerClass="w-full text-white bg-blue-400 hover:bg-blue-900 shadow-lg"
              disabled={isSubmitting}
            />
          </div>

          {submitStatus === "success" && (
            <div className="p-4 bg-green-50 border-2 border-green-500 rounded-lg text-green-800 text-center font-semibold animate-pulse">
              ✓ Message sent successfully! I'll get back to you soon.
            </div>
          )}

          {submitStatus === "error" && (
            <div className="p-4 bg-red-50 border-2 border-red-500 rounded-lg text-red-800 text-center font-semibold">
              ✗ Failed to send message. Please try again or email me directly.
            </div>
          )}
        </form>

        <div className="mt-8 pt-8 border-t border-gray-200 text-center text-gray-600 text-sm">
          <p>You can also reach me directly at:</p>
          <a
            href="mailto:sombadennis@gmail.com"
            className="text-blue-400 hover:text-blue-900 font-semibold"
          >
            sombadennis@gmail.com
          </a>
        </div>
      </div>
    </section>
  );
};

export default Contact;
