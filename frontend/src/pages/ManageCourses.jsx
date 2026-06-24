import { useState } from "react";
import "../styles/ManageCourses.css";
import InstructorSidebar from "../components/InstructorSidebar";
import Topbar from "../components/Topbar";

function ManageCourses() {
  const [courses, setCourses] = useState([
    {
      id: 1,
      title: "Cyber Security",
      students: 120,
      modules: 12,
    },
    {
      id: 2,
      title: "Ethical Hacking",
      students: 85,
      modules: 8,
    },
    {
      id: 3,
      title: "Python For AI",
      students: 95,
      modules: 15,
    },
  ]);

  const [search, setSearch] = useState("");

  const [showModal, setShowModal] = useState(false);

  const [newCourse, setNewCourse] = useState({
    title: "",
    students: "",
    modules: "",
  });

  const [editingId, setEditingId] = useState(null);

  // ADD COURSE

  const handleSaveCourse = () => {
    if (
      !newCourse.title ||
      !newCourse.students ||
      !newCourse.modules
    ) {
      alert("Fill all fields");
      return;
    }

    if (editingId) {
      setCourses(
        courses.map((course) =>
          course.id === editingId
            ? {
                ...course,
                title: newCourse.title,
                students: Number(newCourse.students),
                modules: Number(newCourse.modules),
              }
            : course
        )
      );
    } else {
      const course = {
        id: Date.now(),
        title: newCourse.title,
        students: Number(newCourse.students),
        modules: Number(newCourse.modules),
      };

      setCourses([...courses, course]);
    }

    setShowModal(false);

    setEditingId(null);

    setNewCourse({
      title: "",
      students: "",
      modules: "",
    });
  };

  // DELETE COURSE

  const handleDelete = (id) => {
    const confirmDelete = window.confirm(
      "Delete this course?"
    );

    if (confirmDelete) {
      setCourses(
        courses.filter((course) => course.id !== id)
      );
    }
  };

  // EDIT COURSE

  const handleEdit = (course) => {
    setEditingId(course.id);

    setNewCourse({
      title: course.title,
      students: course.students,
      modules: course.modules,
    });

    setShowModal(true);
  };

  const filteredCourses = courses.filter((course) =>
    course.title
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  return (
    <div className="manage-page">

      <InstructorSidebar />

      <div className="manage-content">

        <Topbar />

        <div className="manage-header">

          <div>

            <span>COURSE MANAGEMENT</span>

            <h1>Manage Courses</h1>

            <p>
              Create, edit and organize learning
              programs.
            </p>

          </div>

          <button
            className="add-course-btn"
            onClick={() => {
              setEditingId(null);

              setNewCourse({
                title: "",
                students: "",
                modules: "",
              });

              setShowModal(true);
            }}
          >
            + Add Course
          </button>

        </div>

        <input
          className="course-search"
          type="text"
          placeholder="Search course..."
          value={search}
          onChange={(e) =>
            setSearch(e.target.value)
          }
        />

        <div className="course-list">

          {filteredCourses.length === 0 ? (
            <div className="empty-state">
              No Courses Found
            </div>
          ) : (
            filteredCourses.map((course) => (
              <div
                key={course.id}
                className="course-row"
              >
                <div>

                  <h3>{course.title}</h3>

                  <p>
                    {course.students} Students •{" "}
                    {course.modules} Modules
                  </p>

                </div>

                <div className="course-actions">

                  <button
                    onClick={() =>
                      handleEdit(course)
                    }
                  >
                    Edit
                  </button>

                  <button
                    onClick={() =>
                      handleDelete(course.id)
                    }
                  >
                    Delete
                  </button>

                </div>

              </div>
            ))
          )}

        </div>

        {showModal && (
          <div className="modal-overlay">

            <div className="course-modal">

              <h2>
                {editingId
                  ? "Edit Course"
                  : "Add Course"}
              </h2>

              <input
                type="text"
                placeholder="Course Name"
                value={newCourse.title}
                onChange={(e) =>
                  setNewCourse({
                    ...newCourse,
                    title: e.target.value,
                  })
                }
              />

              <input
                type="number"
                placeholder="Students"
                value={newCourse.students}
                onChange={(e) =>
                  setNewCourse({
                    ...newCourse,
                    students: e.target.value,
                  })
                }
              />

              <input
                type="number"
                placeholder="Modules"
                value={newCourse.modules}
                onChange={(e) =>
                  setNewCourse({
                    ...newCourse,
                    modules: e.target.value,
                  })
                }
              />

              <div className="modal-actions">

                <button
                  onClick={handleSaveCourse}
                >
                  Save
                </button>

                <button
                  onClick={() =>
                    setShowModal(false)
                  }
                >
                  Cancel
                </button>

              </div>

            </div>

          </div>
        )}

      </div>

    </div>
  );
}

export default ManageCourses;