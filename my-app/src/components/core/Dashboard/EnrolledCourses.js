import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { getUserEnrolledCourses } from '../../../services/operations/profileAPI';
import ProgressBar from '@ramonak/react-progress-bar';
import { useNavigate } from 'react-router-dom';

const EnrolledCourses = () => {

    const {token}  = useSelector((state) => state.auth);
    const navigate = useNavigate()
    const [enrolledCourses, setEnrolledCourses] = useState(null);
    const [localEnrolledCourses, setLocalEnrolledCourses] = useState([]);
    const [activeLocalVideo, setActiveLocalVideo] = useState("");


    const getEnrolledCourses = async() => {
        try{
            const response = await getUserEnrolledCourses(token);
            setEnrolledCourses(response);
        }
        catch(error) {
            console.log("Unable to Fetch Enrolled Courses");
        }
    }

    useEffect(()=> {
        getEnrolledCourses();
        const localCourses = JSON.parse(localStorage.getItem("localEnrolledCourses") || "[]");
        setLocalEnrolledCourses(localCourses);
    },[]);


  return (
    <>
    <div className="text-3xl text-gray-50">Enrolled Courses</div>

    {localEnrolledCourses.length > 0 && (
      <div className="my-8 rounded-lg border border-gray-700 bg-gray-800 p-5 text-gray-50">
        <p className="text-xl font-semibold">Your Purchased Courses</p>
        <div className="mt-4 space-y-4">
          {localEnrolledCourses.map((course, idx) => (
            <div key={idx} className="rounded-md border border-gray-700 bg-gray-900 p-4">
              <div className="flex flex-wrap items-center gap-4">
                <img
                  src={course.thumbnail}
                  alt={course.title}
                  className="h-20 w-32 rounded-md object-cover border border-gray-700"
                />
                <div className="flex-1">
                  <p className="font-semibold">{course.title}</p>
                  <p className="text-sm text-gray-300">{course.description}</p>
                  <p className="mt-1 text-xs text-gray-400">Duration: {course.totalDuration}</p>
                </div>
                <button
                  className="rounded-md bg-yellow-300 px-4 py-2 text-sm font-semibold text-gray-900"
                  onClick={() => setActiveLocalVideo(course.embedUrl + "&autoplay=1")}
                >
                  Watch Now
                </button>
              </div>
            </div>
          ))}
        </div>

        {activeLocalVideo && (
          <div className="mt-5 overflow-hidden rounded-lg border border-gray-700 bg-black">
            <iframe
              className="w-full aspect-video"
              src={activeLocalVideo}
              title="Purchased Course Player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            />
          </div>
        )}
      </div>
    )}

    {!enrolledCourses ? (
      <div className="grid min-h-[calc(100vh-3.5rem)] place-items-center">
        <div className="spinner"></div>
      </div>
    ) : !enrolledCourses.length ? (
      <p className="grid h-[10vh] w-full place-content-center text-gray-50">
        You have not enrolled in any course yet.
        {/* TODO: Modify this Empty State */}
      </p>
    ) : (
      <div className="my-8 text-gray-50">
        {/* Headings */}
        <div className="flex rounded-t-lg bg-gray-500 ">
          <p className="w-[45%] px-5 py-3">Course Name</p>
          <p className="w-1/4 px-2 py-3">Duration</p>
          <p className="flex-1 px-2 py-3">Progress</p>
        </div>
        {/* Course Names */}
        {enrolledCourses.map((course, i, arr) => (
          <div
            className={`flex items-center border border-gray-700 ${
              i === arr.length - 1 ? "rounded-b-lg" : "rounded-none"
            }`}
            key={i}
          >
            <div
              className="flex w-[45%] cursor-pointer items-center gap-4 px-5 py-3"
              onClick={() => {
                navigate(
                  `/view-course/${course?._id}/section/${course.courseContent?.[0]?._id}/sub-section/${course.courseContent?.[0]?.subSection?.[0]?._id}`
                )
              }}
            >
              <img
                src={course.thumbnail}
                alt="course_img"
                className="h-14 w-14 rounded-lg object-cover"
              />
              <div className="flex max-w-xs flex-col gap-2">
                <p className="font-semibold">{course.courseName}</p>
                <p className="text-xs text-gray-300">
                  {course.description.length > 50
                    ? `${course.description.slice(0, 50)}...`
                    : course.description}
                </p>
              </div>
            </div>
            <div className="w-1/4 px-2 py-3">{course?.totalDuration}</div>
            <div className="flex w-1/5 flex-col gap-2 px-2 py-3">
              <p>Progress: {course.progressPercentage || 0}%</p>
              <ProgressBar
                completed={course.progressPercentage || 0}
                height="8px"
                isLabelVisible={false}
              />
            </div>
          </div>
        ))}
      </div>
    )}
  </>
  )
}

export default EnrolledCourses
