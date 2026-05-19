import db from "../config/db.js"

const sections = "sections";
const class_schedules = "class_schedules"
const enroll = "enrolled_students";
const attendance = "attendance"

export const viewEnrolledClasses = async (student_id) => {
    return await db
        .selectFrom(enroll)
        .selectAll()
        .execute();
}

export const viewClassSchedule = async (student_id) => {
    return await db
        .selectFrom(class_schedules)
        .selectAll()
        .execute();
}

export const viewAttendance = async (student_id, class_id) => {
    return await db
        .selectFrom(attendance)
        .selectAll()
        .where('student_id', '=', student_id)
        .where('class_id', '=', class_id)
        .execute();
}

export const submitAttendance = async (data) => {
    return await db.insertInto(attendance).values(data).execute();
}

export const studentClassesAndSubject = async (student_id) => {
    return await db
        .selectFrom('enrolled_students as es')

        .innerJoin('classes as c', 'c.class_id', 'es.class_id')
        .innerJoin('sections as s', 's.section_id', 'c.section_id')
        .innerJoin('subjects as sub', 'sub.subject_id', 'c.subject_id')

        .leftJoin('class_schedules as cs', 'cs.class_id', 'c.class_id')
        .leftJoin('users as u', 'u.user_id', 'c.teacher_id')

        .leftJoin('attendance', 'attendance.class_id', 'c.class_id')

        .select([
            'es.enrollment_id',
            'es.student_id',
            'es.enrolled_at',

            'c.class_id',
            'c.teacher_id',
            'c.section_id',
            'c.subject_id',
            'c.semester',

            's.section_name',
            'sub.subject_name',

            'cs.schedule_id',
            'cs.type',
            'cs.day',
            'cs.start_time',
            'cs.end_time',
            'cs.assigned_room',

            'u.firstname as teacher_firstName',
            'u.lastname as teacher_lastName',

            'attendance.attendance_id',
            'attendance.student_id',
            'attendance.status',
            'attendance.submitted_at',
        ])

        .where('es.student_id', '=', student_id)
        .execute();
};

export const getStudentStats = async (student_id) => {

    const classes = await db
        .selectFrom("enrolled_students")
        .select(({ fn }) => fn.count("class_id").distinct().as("count"))
        .where("student_id", "=", student_id)
        .executeTakeFirst();

    const attendance = await db
        .selectFrom("attendance")
        .select(({ fn }) => fn.count("attendance_id").as("count"))
        .where("student_id", "=", student_id)
        .executeTakeFirst();

    return {
        classes: Number(classes?.count ?? 0),
        attendance: Number(attendance?.count ?? 0),
    };
};