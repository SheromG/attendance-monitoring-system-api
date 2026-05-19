import express from "express";
import {
    viewAttendance,
    viewClassSchedule,
    viewEnrolledClasses,
    submitAttendance,
    studentClassesAndSubject,
    getStudentStats
} from '../controllers/studentController.js'

const router = express.Router();

router.get("/class/:id", viewEnrolledClasses);
router.get("/classSchedule/:id", viewClassSchedule);
router.get("/attendance/:id/:classId", viewAttendance);
router.post("/submitAttendance", submitAttendance);
router.get("/classesAndSubject/:id", studentClassesAndSubject);
router.get("/stats/:id", getStudentStats);

export default router;