document.addEventListener("DOMContentLoaded", () => {
    const buttons = document.querySelectorAll(".filter-btn");
    const courseList = document.getElementById("course-list");

    const rootStyles = getComputedStyle(document.documentElement);
    const completedColor = rootStyles.getPropertyValue('--accent-color').trim(); // Remove extra spaces
    const incompleteColor = rootStyles.getPropertyValue('white').trim();
    const fontColor = rootStyles.getPropertyValue('black').trim();
    const buttonFont = rootStyles.getPropertyValue('--main-font').trim();
        
    const courses = [
        {
            subject: 'CSE',
            number: 110,
            title: 'Introduction to Programming',
            credits: 2,
            certificate: 'Web and Computer Programming',
            description: 'This course will introduce students to programming. It will introduce the building blocks of programming languages (variables, decisions, calculations, loops, array, and input/output) and use them to solve problems.',
            technology: [
                'Python'
            ],
            completed: true
        },
        {
            subject: 'WDD',
            number: 130,
            title: 'Web Fundamentals',
            credits: 2,
            certificate: 'Web and Computer Programming',
            description: 'This course introduces students to the World Wide Web and to careers in web site design and development. The course is hands on with students actually participating in simple web designs and programming. It is anticipated that students who complete this course will understand the fields of web design and development and will have a good idea if they want to pursue this degree as a major.',
            technology: [
                'HTML',
                'CSS'
            ],
            completed: true
        },
        {
            subject: 'CSE',
            number: 111,
            title: 'Programming with Functions',
            credits: 2,
            certificate: 'Web and Computer Programming',
            description: 'CSE 111 students become more organized, efficient, and powerful computer programmers by learning to research and call functions written by others; to write, call , debug, and test their own functions; and to handle errors within functions. CSE 111 students write programs with functions to solve problems in many disciplines, including business, physical science, human performance, and humanities.',
            technology: [
                'Python'
            ],
            completed: true
        },
        {
            subject: 'CSE',
            number: 210,
            title: 'Programming with Classes',
            credits: 2,
            certificate: 'Web and Computer Programming',
            description: 'This course will introduce the notion of classes and objects. It will present encapsulation at a conceptual level. It will also work with inheritance and polymorphism.',
            technology: [
                'C#'
            ],
            completed: true
        },
        {
            subject: 'WDD',
            number: 131,
            title: 'Dynamic Web Fundamentals',
            credits: 2,
            certificate: 'Web and Computer Programming',
            description: 'This course builds on prior experience in Web Fundamentals and programming. Students will learn to create dynamic websites that use JavaScript to respond to events, update content, and create responsive user experiences.',
            technology: [
                'HTML',
                'CSS',
                'JavaScript'
            ],
            completed: true
        },
        {
            subject: 'WDD',
            number: 231,
            title: 'Frontend Web Development I',
            credits: 2,
            certificate: 'Web and Computer Programming',
            description: 'This course builds on prior experience with Dynamic Web Fundamentals and programming. Students will focus on user experience, accessibility, compliance, performance optimization, and basic API usage.',
            technology: [
                'HTML',
                'CSS',
                'JavaScript'
            ],
            completed: false
        }
    ];


    function displayCourse(filter) {
        courseList.innerHTML = "";  // Clear existing content
        let totalCredits = 0; 

        const filteredCourses = courses.filter(course => filter === "all" || course.subject === filter);

        filteredCourses.forEach(course => {
            const button = document.createElement("button");
            button.textContent = course.title;
            button.style.backgroundColor = course.completed ? completedColor : incompleteColor;
            button.style.color = fontColor;  
            button.style.border = "none";
            button.style.padding = "10px";
            button.style.margin = "5px";
            button.style.cursor = "pointer";
            button.style.display = "block";
            button.style.width = "100%";
            button.style.fontSize = "16px";
            button.style.borderRadius = "5px";

            // add combined number of credits that is displayed under displayed courses.
            courseList.appendChild(button);

            // calculate total number of credits
            totalCredits += course.credits;
            
        });

            // display total number of credits.
            const creditsDisplay = document.createElement("p");
            creditsDisplay.innerHTML = `total Credits: <strong>${totalCredits}</strong>`;
            courseList.appendChild(creditsDisplay);
    }


    displayCourse("all");

    buttons.forEach(button => {
        button.addEventListener("click", () => {
            buttons.forEach(btn => btn.classList.remove("active"));  // Remove active class from all buttons
            button.classList.add("active");  // Add active class to clicked button
            const filterType = button.getAttribute("data-filter");  // Get filter type from data attribute
            displayCourse(filterType);
        });
    });
});