import * as StudentModel from '../models/studentModels.js'

export const viewEnrolledClasses = async (req, res) => {
    const id = req.params.id;
    const classes = await StudentModel.viewEnrolledClasses(id);
    return res.json(classes);
}

export const viewClassSchedule = async (req, res) => {
    const id = req.params.id;
    const classSchedule = await StudentModel.viewClassSchedule(id);
    return res.json(classSchedule);
}

export const viewAttendance = async (req, res) => {
    const id = req.params.id;
    const classId = req.params.classId;
    const attendance = await StudentModel.viewAttendance(id, classId);
    return res.json(attendance);
}

export const submitAttendance = async (req, res) => {
    const result = await StudentModel.submitAttendance(req.body);
    return res.json({message: "Attendance Submitted"});
}

export const studentClassesAndSubject = async (req, res) => {
    const id = req.params.id;
    const result = await StudentModel.studentClassesAndSubject(id);
    return res.json(result);
}

export const getStudentStats = async (req, res) => {
    const id = req.params.id;
    const result = await StudentModel.getStudentStats(id);
    return res.json(result);
}