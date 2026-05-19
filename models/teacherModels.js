import db from "../config/db.js"
import bcrypt from "bcrypt";

const sections = "sections";
const classes = "classes"
const class_schedules = "class_schedules"
const enroll = "enrolled_students";
const attendance = "attendance"
const users = "users"
const subjects = "subjects"

export const getAllSections = async () => {
    return await db
        .selectFrom(sections)
        .selectAll()
        .execute();
}

export const createSection = async (data) => {
    return await db.insertInto(sections).values(data).execute();
}

export const getAllClasses = async () => {
    return await db
        .selectFrom(classes)
        .selectAll()
        .execute();
}

export const createClass = async (data) => {
    return await db.insertInto(classes).values(data).execute();
}

export const getAllClassSchedule = async () => {
    return await db
        .selectFrom(class_schedules)
        .selectAll()
        .execute();
}

export const createClassSchedule = async (data) => {
    return await db.insertInto(class_schedules).values(data).execute();
}

export const addUser = async (data) => {
    const existing = await db
        .selectFrom(users)
        .select(["user_id", "username"])
        .where((field) =>
            field.or([
                field("user_id", "=", data.user_id),
                field("username", "=", data.username)
            ])
        )
        .executeTakeFirst();
    
    if(existing){
        if(existing.user_id === data.user_id) {
            return {
                success: false,
                status: 409,
                message: "User ID already exists"
            };
        }

        if(existing.username === data.username) {
            return {
                success: false,
                status: 409,
                message: "Username already exists"
            };
        }
    }

    const hashedPassword = await bcrypt.hash(data.password, 10);

    const result = await db
        .insertInto(users)
        .values({
            user_id: data.user_id,
            username: data.username,
            password: hashedPassword,
            firstname: data.firstName,
            lastname: data.lastName,
            email: data.email,
            role: data.role,
            created_date: new Date()
        })
        .execute();

    return {
        success: true,
        status: 201,
        data: result
    };
}

export const enrollStudent = async (data) => {
    return await db.insertInto(enroll).values(data).execute();
}

export const getStudentPerClass = async (class_id) => {
    return await db
        .selectFrom(enroll)
        .selectAll()
        .where("class_id", "=", class_id)
        .execute();
}

export const getAttendancePerStudent = async (student_id, class_id) => {
    return await db
        .selectFrom(attendance)
        .selectAll()
        .where("student_id", "=", student_id)
        .where("class_id", "=", class_id)
        .execute();
}

export const getTeachers = async () => {
    return await db
        .selectFrom(users)
        .selectAll()
        .where("role", "=", "teacher")
        .execute();
}

export const getStudents = async () => {
    return await db
        .selectFrom(users)
        .selectAll()
        .where("role", "=", "student")
        .execute();
}

export const getSubjects = async (teacher_id) => {
    return await db
        .selectFrom("classes as c")
        .innerJoin("subjects as s", "s.subject_id", "c.subject_id")
        .select([
            "s.subject_id",
            "s.subject_code",
            "s.subject_name",
            "s.description"
        ])
        .where("c.teacher_id", "=", teacher_id)
        .groupBy([
            "s.subject_id",
            "s.subject_code",
            "s.subject_name",
            "s.description"
        ])
        .execute();
};

export const addSubject = async (data) => {
    return await db.insertInto(subjects).values(data).execute();
}

export const classesOfStudentNotEnrolledIn = async (student_id, teacher_id) => {
    return await db
        .selectFrom('classes as c')
        .innerJoin('subjects as s', 's.subject_id', 'c.subject_id')
        .leftJoin('enrolled_students as es', (join) =>
            join
                .onRef('es.class_id', '=', 'c.class_id')
                .on('es.student_id', '=', student_id)
        )
        .select([
            'c.class_id',
            'c.teacher_id',
            'c.section_id',
            'c.subject_id',
            'c.semester',
            's.subject_code',
            's.subject_name',
            's.description'
        ])
        .where('es.class_id', 'is', null)
        .where('c.teacher_id', '=', teacher_id)
        .execute();
};

export const classesAndSubject = async (teacher_id) => {
    return await db
        .selectFrom('classes as c')

        .innerJoin('sections as s', 's.section_id', 'c.section_id')
        .innerJoin('subjects as sub', 'sub.subject_id', 'c.subject_id')

        .leftJoin('class_schedules as cs', 'cs.class_id', 'c.class_id')
        .leftJoin('enrolled_students as es', 'es.class_id', 'c.class_id')
        .leftJoin('users as u', 'u.user_id', 'es.student_id')

        .select([
            'c.class_id',
            'c.teacher_id',
            'c.section_id',
            's.section_name',

            'c.subject_id',
            'sub.subject_name',

            'c.semester',

            'cs.schedule_id',
            'cs.type',
            'cs.day',
            'cs.start_time',
            'cs.end_time',
            'cs.assigned_room',

            'es.enrollment_id',
            'es.student_id',
            'es.enrolled_at',

            'u.firstname as firstName',
            'u.lastname as lastName',
        ])

        .where('c.teacher_id', '=', teacher_id)

        .execute();
}

export const getSectionsWithClasses = async (teacher_id) => {
    return await db
        .selectFrom('sections as s')
        .innerJoin('classes as c', 'c.section_id', 's.section_id')
        .innerJoin('subjects as sub', 'sub.subject_id', 'c.subject_id')
        .select([
            's.section_id',
            's.section_name',
            's.year_level',
            's.school_year',

            'c.class_id',
            'c.semester',

            'sub.subject_name',
        ])
        .where('c.teacher_id', '=', teacher_id)
        .execute();
};

export const getEnrolledStudentsByTeacher = async (teacher_id) => {
    return await db
        .selectFrom('enrolled_students as es')

        .innerJoin('classes as c', 'c.class_id', 'es.class_id')
        .innerJoin('users as u', 'u.user_id', 'es.student_id')
        .innerJoin('subjects as sub', 'sub.subject_id', 'c.subject_id')
        .innerJoin('sections as s', 's.section_id', 'c.section_id')

        .select([
            'u.user_id',
            'u.firstname as firstName',
            'u.lastname as lastName',
            'u.email',

            'c.class_id',
            's.section_name',
            'sub.subject_name',
            'c.semester',

            'es.enrolled_at'
        ])

        .where('c.teacher_id', '=', teacher_id)

        .execute();
};

export const getTeacherStats = async (teacher_id) => {

    const classes = await db
        .selectFrom("classes")
        .select(({ fn }) => fn.count("class_id").as("count"))
        .where("teacher_id", "=", teacher_id)
        .executeTakeFirst();

    const sections = await db
        .selectFrom("classes")
        .select(({ fn }) => fn.count("section_id").distinct().as("count"))
        .where("teacher_id", "=", teacher_id)
        .executeTakeFirst();

    const subjects = await db
        .selectFrom("classes")
        .select(({ fn }) => fn.count("subject_id").distinct().as("count"))
        .where("teacher_id", "=", teacher_id)
        .executeTakeFirst();

    const students = await db
        .selectFrom("enrolled_students as es")
        .innerJoin("classes as c", "c.class_id", "es.class_id")
        .select(({ fn }) => fn.count("es.student_id").distinct().as("count"))
        .where("c.teacher_id", "=", teacher_id)
        .executeTakeFirst();

    return {
        classes: Number(classes?.count ?? 0),
        sections: Number(sections?.count ?? 0),
        subjects: Number(subjects?.count ?? 0),
        students: Number(students?.count ?? 0),
    };
};