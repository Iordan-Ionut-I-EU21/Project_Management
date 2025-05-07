package com.example.backend.Service;

import com.example.backend.BackendApplication;
import com.example.backend.Model.Class.*;
import com.example.backend.Model.Enum.*;
import com.github.javafaker.Faker;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.sql.Timestamp;
import java.time.LocalDateTime;
import java.util.*;
import java.util.stream.Collectors;

@Service
public class FakerDataService {
    private static final Faker faker = new Faker();
    private final Random random = new Random();

    @Autowired
    private PasswordEncoder passwordEncoder;
    @Autowired
    private UserService userService;
    @Autowired
    private CategoriesService categoriesService;
    @Autowired
    private ProjectsService projectsService;
    @Autowired
    private TasksService tasksService;
    @Autowired
    private TasksCommentsService tasksCommentsService;
    @Autowired
    private SubTasksService subTasksService;
    @Autowired
    private ProjectsMembersService projectsMembersService;
    @Autowired
    private MilestonesService milestonesService;
    @Autowired
    private AuditLogsService auditLogsService;
    @Autowired
    private ActivitiesService activitiesService;

    public void generateUsers(int number) {
        Set<String> usedEmails = new HashSet<>();
        List<User> users = new ArrayList<>();

        while (users.size() < number) {
            String email = faker.internet().emailAddress();
            if (usedEmails.contains(email)) continue;
            usedEmails.add(email);

            User user = new User();
            user.setId(BackendApplication.generateId());
            user.setName(faker.name().firstName());
            user.setEmail(email);

            user.setPassword(passwordEncoder.encode("123asd,./A"));
            user.setCreatedAt(this.generateNowDate());
            user.setRole(generateUserRole());
            users.add(user);
        }

        List<String> existingEmails = userService.getExistingEmails(usedEmails);
        List<User> filteredUsers = users.stream().filter(u -> !existingEmails.contains(u.getEmail())).collect(Collectors.toList());

        userService.postUsers(filteredUsers);
    }

    public void generateCategories(int number) {
        List<Categories> categories = new ArrayList<>();

        while (categories.size() < number) {
            Categories category = new Categories();
            category.setId(BackendApplication.generateId());
            category.setName(faker.commerce().department());
            category.setDescription(this.shortDescription());
            categories.add(category);
        }

        this.categoriesService.postCategories(categories);
    }

    public void generateProjects(int number) {
        List<Projects> projects = new ArrayList<>();
        List<User> users = userService.getUserByRole(UserRole.MANAGER);
        List<Categories> categories = categoriesService.getAllCategories();

        if (users.isEmpty() || categories.isEmpty()) {
            throw new IllegalStateException("Cannot generate projects: no managers or categories available.");
        }

        while (projects.size() < number) {
            Projects project = new Projects();
            project.setId(BackendApplication.generateId());
            project.setName(faker.company().buzzword());
            project.setDescription(shortDescription());
            project.setStartDate(generateNowDate());
            project.setEndDate(generateEndDate());
            project.setStatus(generateStatus());

            Categories randomCategory = categories.get(faker.random().nextInt(categories.size()));
            User randomManager = users.get(faker.random().nextInt(users.size()));

            project.setCategoryId(randomCategory);
            project.setManagerId(randomManager);

            projects.add(project);
        }

        projectsService.postProjects(projects);
    }

    public void generateTasks(int number) {
        List<Tasks> tasks = new ArrayList<>();
        List<User> users = userService.getAllUsers();
        List<Projects> projects = projectsService.getAllProjects();

        if (users.isEmpty() || projects.isEmpty()) {
            throw new IllegalStateException("Cannot generate tasks: no users or projects available.");
        }

        while (tasks.size() < number) {
            Tasks task = new Tasks();
            task.setId(BackendApplication.generateId());
            task.setTitle(faker.company().catchPhrase());
            task.setCreatedAt(generateNowDate());
            task.setDescription(shortDescription());
            task.setPriority(generatePriority());
            task.setDueDate(generateDateDueDate());
            task.setStatus(generateStatus());

            User assignedUser = users.get(faker.random().nextInt(users.size()));
            Projects project = projects.get(faker.random().nextInt(projects.size()));

            task.setAssignedId(assignedUser);
            task.setProjectId(project);

            tasks.add(task);
        }

        tasksService.postTasks(tasks);
    }

    public void generateTaskComments(int number) {
        List<TaskComments> taskComments = new ArrayList<>();
        List<Tasks> tasks = this.tasksService.findAllTasks();

        if (tasks.isEmpty()) {
            throw new IllegalStateException("No tasks available to comment on.");
        }

        while (taskComments.size() < number) {
            TaskComments taskComment = new TaskComments();
            taskComment.setId(BackendApplication.generateId());
            taskComment.setCreatedAt(this.generateNowDate());
            taskComment.setCommnet(this.shortDescription());

            Tasks task = tasks.get(faker.random().nextInt(tasks.size()));
            List<User> taskUsers = this.tasksService.findUserByTaskId(task.getId());

            if (taskUsers.isEmpty()) {
                continue;
            }

            User user = taskUsers.get(faker.random().nextInt(taskUsers.size()));
            taskComment.setTaskId(task);
            taskComment.setUserId(user);

            taskComments.add(taskComment);
        }

        this.tasksCommentsService.postTasksComments(taskComments);
    }

    public void generateProjectsMembers(int number) {
        List<ProjectsMembers> projectsMembers = new ArrayList<>();
        List<User> users = userService.getAllUsers();
        List<Projects> projects = projectsService.getAllProjects();
        Set<String> existingAssignments = new HashSet<>();

        if (users.isEmpty() || projects.isEmpty()) {
            throw new IllegalStateException("Cannot generate project members: no users or projects available.");
        }

        while (projectsMembers.size() < number) {
            User user = users.get(faker.random().nextInt(users.size()));
            Projects project = projects.get(faker.random().nextInt(projects.size()));
            String assignmentKey = user.getId() + ":" + project.getId();

            if (existingAssignments.contains(assignmentKey)) {
                continue;
            }

            ProjectsMembers projectsMember = new ProjectsMembers();
            projectsMember.setId(BackendApplication.generateId());
            projectsMember.setUserId(user);
            projectsMember.setProjectId(project);
            projectsMember.setRole(generateRole());

            projectsMembers.add(projectsMember);
            existingAssignments.add(assignmentKey);
        }

        projectsMembersService.postProjectsMembers(projectsMembers);
    }

    public void generateSubTasks(int number) {
        List<SubTasks> subTasks = new ArrayList<>();
        List<Tasks> tasks = this.tasksService.findAllTasks();

        if (tasks.isEmpty()) {
            throw new IllegalStateException("Cannot generate subtasks: no tasks available.");
        }

        while (subTasks.size() < number) {
            SubTasks subTask = new SubTasks();
            subTask.setId(BackendApplication.generateId());
            subTask.setTitle(faker.company().bs());
            subTask.setDescription(this.shortDescription());

            Tasks parentTask = tasks.get(faker.random().nextInt(tasks.size()));
            subTask.setTaskId(parentTask);

            subTasks.add(subTask);
        }

        this.subTasksService.postSubTasks(subTasks);
    }

    public void generateMilestones(int number) {
        List<Milestones> milestones = new ArrayList<>();
        List<Projects> projects = this.projectsService.getAllProjects();

        if (projects.isEmpty()) {
            throw new IllegalStateException("Cannot generate milestones: no projects available.");
        }

        while (milestones.size() < number) {
            Milestones milestone = new Milestones();
            milestone.setId(BackendApplication.generateId());
            milestone.setTitle(this.faker.company().buzzword());
            milestone.setDescription(this.shortDescription());
            milestone.setDueDate(this.generateDateDueDate());
            milestone.setProgress(generateProgress());

            Projects project = projects.get(this.faker.random().nextInt(projects.size()));
            milestone.setProjectId(project);

            milestones.add(milestone);
        }

        this.milestonesService.postMilestones(milestones);
    }

    public void generateAuditLogs(int number) {
        List<AuditLogs> auditLogs = new ArrayList<>();
        while (auditLogs.size() < number) {
            AuditLogs auditLog = new AuditLogs();
            auditLog.setId(BackendApplication.generateId());
            auditLog.setDescription(this.shortDescription());
            auditLog.setCreatedAt(this.generateNowDate());
            auditLog.setAction(this.faker.ancient().titan());
            auditLogs.add(auditLog);
        }
        this.auditLogsService.postAuditLogs(auditLogs);
    }

    public void generateActivities(int number) {
        List<Activities> activities = new ArrayList<>();
        List<Projects> projects = projectsService.getAllProjects();

        if (projects.isEmpty()) {
            throw new IllegalStateException("No projects found for activity generation.");
        }

        while (activities.size() < number) {
            Projects project = projects.get(faker.random().nextInt(projects.size()));
            List<User> projectUsers = userService.getUserByProjects(project.getId());

            if (projectUsers.isEmpty()) {
                continue;
            }

            User user = projectUsers.get(faker.random().nextInt(projectUsers.size()));

            Activities activitie = new Activities();
            activitie.setId(BackendApplication.generateId());
            activitie.setCreatedAt(generateNowDate());
            activitie.setAction(this.faker.yoda().quote());
            activitie.setUserId(user);
            activitie.setProjectId(project);

            activities.add(activitie);
        }
        activitiesService.postActivities(activities);
    }



    private Status generateStatus() {
        int rand = random.nextInt(3);
        if (rand < 1) {
            return Status.PENDING;
        } else if (rand < 2) {
            return Status.COMPLETED;
        } else {
            return Status.ONGOING;
        }
    }

    private Priority generatePriority() {
        int rand = random.nextInt(3);
        if (rand < 1) {
            return Priority.LOW;
        } else if (rand < 2) {
            return Priority.MEDIUM;
        } else {
            return Priority.HIGH;
        }
    }

    private UserRole generateUserRole() {
        int rand = random.nextInt(12);
        if (rand < 7) {
            return UserRole.TEAM_MEMBER;
        } else if (rand < 11) {
            return UserRole.MANAGER;
        } else {
            return UserRole.ADMIN;
        }
    }

    private Role generateRole() {
        int rand = random.nextInt(12);
        if (rand < 7) {
            return Role.WORKER;
        } else if (rand < 11) {
            return Role.ARCHITECTS;
        } else {
            return Role.MANAGER;
        }
    }

    private Progress generateProgress() {
        int rand = random.nextInt(3);
        if (rand < 1) {
            return Progress.IN_PROGRESS;
        } else if (rand < 2) {
            return Progress.COMPLETED;
        } else {
            return Progress.NOT_STARTED;
        }
    }

    private Timestamp generateNowDate() {
        return Timestamp.valueOf(LocalDateTime.now());
    }

    private Timestamp generateEndDate() {
        LocalDateTime futureDate = LocalDateTime.now().plusYears(1).plusDays(faker.number().numberBetween(0, 100)).plusHours(faker.number().numberBetween(0, 2400));
        return Timestamp.valueOf(futureDate);
    }

    private Timestamp generateDateDueDate() {
        return Timestamp.valueOf(LocalDateTime.now().plusDays(faker.number().numberBetween(0, 1000)).plusHours(faker.number().numberBetween(0, 2400)));
    }

    private String shortDescription() {
        String paragraph = faker.lorem().paragraph();
        return paragraph.length() > 100 ? paragraph.substring(0, 97) + "..." : paragraph;
    }
}
