import express from "express";
import {
    getAllSections,
    createSection,
    getAllClasses,
    createClass,
    getAllClassSchedule,
    createClassSchedule,
    addUser,
    enrollStudent,
    getStudentPerClass,
    getAttendancePerStudent,
    getTeachers,
    getStudents,
    getSubjects,
    addSubject,
    classesOfStudentNotEnrolledIn,
    classesAndSubject,
    getSectionsWithClasses,
    getEnrolledStudentsByTeacher,
    getTeacherStats

} from "../controllers/teacherController.js"

const router = express.Router();

router.get("/sections", getAllSections);
router.post("/sections", createSection);
router.get("/classes", getAllClasses);
router.post("/classes", createClass);
router.get("/schedules", getAllClassSchedule);
router.post("/schedules", createClassSchedule);
router.post("/addUser", addUser);
router.post("/enroll", enrollStudent);
router.get("/class/:id", getStudentPerClass);
router.get("/attendance/:id/:classId", getAttendancePerStudent);
router.get("/getTeachers", getTeachers);
router.get("/getStudents", getStudents);
router.get("/getSubjects/:id", getSubjects);
router.post("/addSubject", addSubject);
router.get("/classesOfStudentNotEnrolledIn/:id/:teacherId", classesOfStudentNotEnrolledIn);
router.get("/classesAndSubject/:id", classesAndSubject)
router.get("/getSectionsWithClasses/:id", getSectionsWithClasses)
router.get("/getEnrolledStudentsByTeacher/:id", getEnrolledStudentsByTeacher)
router.get("/stats/:id", getTeacherStats)

export default router;