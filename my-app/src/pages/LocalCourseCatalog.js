import React from "react";
import Footer from "../components/common/Footer";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

const courseData = {
  python: {
    title: "Python Course",
    subtitle: "Python Language Full Course (2026)",
    description: "Complete Python course for beginners to advanced with projects.",
    price: 7999,
    totalDuration: "9 lessons",
    thumbnail: "https://img.youtube.com/vi/rfscVS0vtbw/hqdefault.jpg",
    embedUrl: "https://www.youtube.com/embed/rfscVS0vtbw?rel=0",
  },
  "web-development": {
    title: "Web Development Course",
    subtitle: "Web Development Full Course (2026)",
    description: "Full stack roadmap with HTML, CSS, JS, React, Node and MongoDB.",
    price: 9999,
    totalDuration: "9 lessons",
    thumbnail: "https://img.youtube.com/vi/zJSY8tbf_ys/hqdefault.jpg",
    embedUrl: "https://www.youtube.com/embed/zJSY8tbf_ys?rel=0",
  },
  java: {
    title: "Java Full Course",
    subtitle: "Java Full Course (2026)",
    description: "Beginner to advanced Java course with OOP and projects.",
    price: 8999,
    totalDuration: "10+ hours",
    thumbnail: "https://img.youtube.com/vi/UmnCZ7-9yDY/hqdefault.jpg",
    embedUrl: "https://www.youtube.com/embed/UmnCZ7-9yDY?rel=0",
  },
  dsa: {
    title: "DSA Full Course",
    subtitle: "Data Structures and Algorithms (2026)",
    description: "Data Structures and Algorithms with coding interview focused problems.",
    price: 10999,
    totalDuration: "12+ hours",
    thumbnail: "https://img.youtube.com/vi/B31LgI4Y4DQ/hqdefault.jpg",
    embedUrl: "https://www.youtube.com/embed/B31LgI4Y4DQ?rel=0",
  },
  "mern-stack": {
    title: "MERN Stack Course",
    subtitle: "MERN Stack Full Course (2026)",
    description: "Build full stack apps with MongoDB, Express, React and Node.js.",
    price: 11999,
    totalDuration: "11+ hours",
    thumbnail: "https://img.youtube.com/vi/7CqJlxBYj-M/hqdefault.jpg",
    embedUrl: "https://www.youtube.com/embed/7CqJlxBYj-M?rel=0",
  },
  c: {
    title: "C Programming Course",
    subtitle: "C Programming Full Course (2026)",
    description: "Learn C from basics to problem solving with practical examples.",
    price: 6999,
    totalDuration: "8+ hours",
    thumbnail: "https://img.youtube.com/vi/KJgsSFOSQv0/hqdefault.jpg",
    embedUrl: "https://www.youtube.com/embed/KJgsSFOSQv0?rel=0",
  },
  "c-plus-plus": {
    title: "C++ Programming Course",
    subtitle: "C++ Full Course (2026)",
    description: "Complete C++ course with OOP, STL and coding problems.",
    price: 8499,
    totalDuration: "10+ hours",
    thumbnail: "https://img.youtube.com/vi/vLnPwxZdW4Y/hqdefault.jpg",
    embedUrl: "https://www.youtube.com/embed/vLnPwxZdW4Y?rel=0",
  },
};

const LocalCourseCatalog = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const subject = location.pathname.split("/").pop();
  const page = courseData[subject];
  const [isBought, setIsBought] = useState(false);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("UPI");

  useEffect(() => {
    const enrolled = JSON.parse(localStorage.getItem("localEnrolledCourses") || "[]");
    const alreadyExists = enrolled.find((item) => item.slug === subject);
    setIsBought(Boolean(alreadyExists));
  }, [subject]);

  const enrollCourse = () => {
    const enrolled = JSON.parse(localStorage.getItem("localEnrolledCourses") || "[]");
    const alreadyExists = enrolled.find((item) => item.slug === subject);
    if (alreadyExists) {
      setIsBought(true);
      navigate("/dashboard/enrolled-courses");
      return;
    }

    const courseToSave = {
      slug: subject,
      title: page.title,
      description: page.description,
      totalDuration: page.totalDuration,
      thumbnail: page.thumbnail,
      embedUrl: page.embedUrl,
      progressPercentage: 0,
    };
    localStorage.setItem("localEnrolledCourses", JSON.stringify([...enrolled, courseToSave]));
    setIsBought(true);
    navigate("/dashboard/enrolled-courses");
  };

  const handleDummyPayment = () => {
    setShowPaymentModal(false);
    enrollCourse();
  };

  if (!page) {
    return (
      <>
        <div className="min-h-[70vh] w-11/12 max-w-maxContent mx-auto text-gray-100 py-16">
          <h1 className="text-3xl font-semibold">Course not found</h1>
          <p className="mt-4 text-gray-300">Please select a valid course from Catalog.</p>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <div className="w-11/12 max-w-maxContent mx-auto py-12 text-gray-100">
        <p className="text-sm text-gray-400">Home / Catalog / {page.title}</p>
        <h1 className="text-4xl font-semibold mt-3">{page.title}</h1>
        <p className="text-gray-300 mt-2">{page.subtitle}</p>

        <div className="mt-8 rounded-xl border border-gray-700 bg-gray-800 p-6">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-[260px_1fr]">
            <img
              src={page.thumbnail}
              alt={page.title}
              className="h-44 w-full rounded-lg object-cover border border-gray-700"
            />
            <div>
              <p className="text-lg font-semibold">{page.title}</p>
              <p className="mt-2 text-gray-300">{page.description}</p>
              <p className="mt-3 text-sm text-gray-300">Duration: {page.totalDuration}</p>
              <p className="mt-2 text-2xl font-bold text-yellow-300">Rs. {page.price}</p>
              <button
                onClick={() => (isBought ? navigate("/dashboard/enrolled-courses") : setShowPaymentModal(true))}
                className="mt-4 rounded-md bg-yellow-300 px-5 py-2 font-semibold text-gray-900"
              >
                {isBought ? "Go to Enrolled Courses" : "Buy Now"}
              </button>
              {isBought && (
                <p className="mt-3 text-sm font-medium text-green-400">
                  You already bought this course.
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
      {showPaymentModal && (
        <div className="fixed inset-0 z-[1000] grid place-items-center bg-black/60 p-4">
          <div className="w-full max-w-md rounded-lg border border-gray-700 bg-gray-900 p-5 text-gray-100">
            <h3 className="text-xl font-semibold">Dummy Payment</h3>
            <p className="mt-1 text-sm text-gray-300">Course: {page.title}</p>
            <p className="mt-1 text-sm text-gray-300">Amount: Rs. {page.price}</p>

            <div className="mt-4">
              <p className="text-sm text-gray-300">Select Payment Method</p>
              <div className="mt-2 flex gap-3">
                {["UPI", "Card", "NetBanking"].map((method) => (
                  <button
                    key={method}
                    onClick={() => setPaymentMethod(method)}
                    className={`rounded-md border px-3 py-2 text-sm ${
                      paymentMethod === method
                        ? "border-yellow-300 bg-yellow-300 text-gray-900"
                        : "border-gray-600 bg-gray-800 text-gray-100"
                    }`}
                  >
                    {method}
                  </button>
                ))}
              </div>
            </div>

            <div className="mt-5 flex justify-end gap-3">
              <button
                onClick={() => setShowPaymentModal(false)}
                className="rounded-md border border-gray-600 px-4 py-2 text-sm"
              >
                Cancel
              </button>
              <button
                onClick={handleDummyPayment}
                className="rounded-md bg-yellow-300 px-4 py-2 text-sm font-semibold text-gray-900"
              >
                Pay Rs. {page.price}
              </button>
            </div>
          </div>
        </div>
      )}
      <Footer />
    </>
  );
};

export default LocalCourseCatalog;
