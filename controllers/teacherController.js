import * as TeacherModel from "../models/teacherModels.js"

export const getAllSections = async (req, res) => {
    const sections = await TeacherModel.getAllSections();
    return res.json(sections);
}

export const createSection = async (req, res) => {
    const result = await TeacherModel.createSection(req.body);
    return res.json({message: "Section Created"});
}

export const getAllClasses = async (req, res) => {
    const classes = await TeacherModel.getAllClasses();
    return res.json(classes);
}

export const createClass = async (req, res) => {
    const result = await TeacherModel.createClass(req.body);
    return res.json({message: "Class Created"});
}

export const getAllClassSchedule = async (req, res) => {
    const classSchedule = await TeacherModel.getAllClassSchedule();
    return res.json(classSchedule);
}

export const createClassSchedule = async (req, res) => {
    const result = await TeacherModel.createClassSchedule(req.body);
    return res.json({message: "Class Schedule Created"});
}

export const addUser = async (req, res) => {
    const result = await TeacherModel.addUser(req.body);

    if (!result.success) {
        return res.status(result.status).json({
            message: result.message
        });
    }

    const safeData = JSON.parse(
        JSON.stringify(result.data, (_, value) =>
            typeof value === "bigint" ? value.toString() : value
        )
    );

    return res.status(201).json({
        message: "Student Added",
        data: safeData
    });
}

export const enrollStudent = async (req, res) => {
    const result = await TeacherModel.enrollStudent(req.body);
    return res.json({message: "Student Enrolled"});
}

export const getStudentPerClass = async (req, res) => {
    const id = req.params.id;
    const studentPerClass = await TeacherModel.getStudentPerClass(id);
    return res.json(studentPerClass);
}

export const getAttendancePerStudent = async (req, res) => {
    const id = req.params.id;
    const classId = req.params.classId
    const attendancePerStudent = await TeacherModel.getAttendancePerStudent(id,classId);
    return res.json(attendancePerStudent);
}

export const getTeachers = async (req, res) => {
    const teachers = await TeacherModel.getTeachers();
    return res.json(teachers);
}

export const getStudents = async (req, res) => {
    const students = await TeacherModel.getStudents();
    return res.json(students);
}

export const getSubjects = async (req, res) => {
    const id = req.params.id;
    const subjects = await TeacherModel.getSubjects(id);
    return res.json(subjects);
}

export const addSubject = async (req, res) => {
    const subjects = await TeacherModel.addSubject(req.body);
    return res.json({message: "Subject Created"});
}

export const classesOfStudentNotEnrolledIn = async (req, res) => {
    const id = req.params.id;
    const teacherId = req.params.teacherId;
    const classes = await TeacherModel.classesOfStudentNotEnrolledIn(id, teacherId);
    return res.json(classes);
}

export const classesAndSubject = async (req, res) => {
    const id = req.params.id;
    const classes = await TeacherModel.classesAndSubject(id);
    return res.json(classes);
}

export const getSectionsWithClasses = async (req, res) => {
    const id = req.params.id;
    const section = await TeacherModel.getSectionsWithClasses(id);
    return res.json(section);
}

export const getEnrolledStudentsByTeacher = async (req, res) => {
    const id = req.params.id;
    const section = await TeacherModel.getEnrolledStudentsByTeacher(id);
    return res.json(section);
}

export const getTeacherStats = async (req, res) => {
    const id = req.params.id;
    const section = await TeacherModel.getTeacherStats(id);
    return res.json(section);
}