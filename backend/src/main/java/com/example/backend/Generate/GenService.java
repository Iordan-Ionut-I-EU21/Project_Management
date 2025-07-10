package com.example.backend.Generate;

import com.example.backend.BackendApplication;
import com.example.backend.Model.Class.Process;
import com.example.backend.Model.Class.*;
import com.example.backend.Model.Enum.*;
import com.example.backend.Service.*;
import net.datafaker.Faker;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import javax.sql.rowset.serial.SerialBlob;
import java.sql.Blob;
import java.sql.SQLException;
import java.time.LocalDateTime;
import java.util.*;

@Service
public class GenService {
    private static final Faker faker = new net.datafaker.Faker();
    private static final Random random = new Random();
    @Autowired
    private static final Logger LOG = LoggerFactory.getLogger(GenService.class);
    @Autowired
    private PasswordEncoder passwordEncoder;
    @Autowired
    private UserService userService;
    @Autowired
    private SuppliersService suppliersService;
    @Autowired
    private QualityChecksService qualityChecksService;
    @Autowired
    private ProcessService processService;
    @Autowired
    private ProcessLogService processLogService;
    @Autowired
    private PartSuppliersService partSuppliersService;
    @Autowired
    private PartsService partsService;
    @Autowired
    private PartProductionService partProductionService;
    @Autowired
    private MachinesService machinesService;
    @Autowired
    private EmployeesService employeesService;
    @Autowired
    private CarsService carsService;
    @Autowired
    private CarModelService carModelService;
    @Autowired
    private CarsPartsService carsPartsService;

    ///add verification to not insert the same name in tables

    public static <T extends Enum<?>> T randomEnum(Class<T> clazz) {
        T[] enumConstants = clazz.getEnumConstants();
        return enumConstants[random.nextInt(enumConstants.length)];
    }

    public static <T> T randomFromList(List<T> list) {
        if (list == null || list.isEmpty()) {
            throw new IllegalArgumentException("List must not be null or empty");
        }
        return list.get(random.nextInt(list.size()));
    }

    public void generateUserAndEmployee(int number) {
        List<Employees> employees = new ArrayList<>();
        List<User> users = new ArrayList<>();
        Set<String> existingNamesEmployees = new HashSet<>(this.employeesService.getAllNames());
        Set<String> generatedNamesEmployees = new HashSet<>();
        int attempts = 0;
        while (employees.size() < number && attempts < number * 10) {
            attempts++;
            String name = this.faker.name().fullName();
            if (existingNamesEmployees.contains(name) || generatedNamesEmployees.contains(name)) {
                System.out.println("Employee: " + name + " is duplicate");
                continue;
            }
            Employees employee = new Employees();
            employee.setId(BackendApplication.generateId());
            employee.setName(name);
            employee.setRole(randomEnum(EmployeeRole.class));
            employee.setDepartment(faker.company().industry());
            employee.setHire_date(this.generateNowDate());

            employees.add(employee);
            generatedNamesEmployees.add(name);
        }
        this.employeesService.saveAll(employees);

        int i = 0;
        Set<String> existingEmailUsers = new HashSet<>(this.userService.getAllEmails());
        Set<String> generatedEmailUsers = new HashSet<>();
        attempts = 0;
        while (users.size() < number && attempts < number * 10) {
            attempts++;
            String email = faker.internet().safeEmailAddress();
            if (existingEmailUsers.contains(email) || generatedEmailUsers.contains(email)) {
                System.out.println("User: " + email + " is duplicate");
                continue;
            }

            User user = new User();
            user.setId(BackendApplication.generateId());
            user.setUsername(faker.name().username());
            user.setPassword(this.passwordEncoder.encode("123asd,./A"));
            user.setEmail(email);
            user.setRole(randomEnum(UserRole.class));
            user.setEmployees_id(employees.get(i));

            users.add(user);
            generatedEmailUsers.add(email);
            i++;
        }
        this.userService.saveAll(users);
    }

    public void generateSuppliers(int number) throws SQLException {
        List<Suppliers> suppliers = new ArrayList<>();
        Set<String> existingNamesSuppliers = new HashSet<>(this.suppliersService.getAllName());
        Set<String> generatedNamesSuppliers = new HashSet<>();
        int attempts = 0;
        while (suppliers.size() < number && attempts < number * 10) {
            attempts++;
            String name = this.faker.company().name();
            if (existingNamesSuppliers.contains(name) || generatedNamesSuppliers.contains(name)) {
                System.out.println("Supplier: " + name + " is duplicate");
                continue;
            }
            Suppliers supplier = new Suppliers();
            supplier.setId(BackendApplication.generateId());
            supplier.setName(name);
            supplier.setContact_info(this.shortDescription());

            suppliers.add(supplier);
            generatedNamesSuppliers.add(name);
        }
        this.suppliersService.saveAll(suppliers);
    }

    public void generateProcess(int number) throws SQLException {
        List<Process> processes = new ArrayList<>();
        Set<String> existingNamesProcess = new HashSet<>(this.processService.getAllName());
        Set<String> generatedNamesProcess = new HashSet<>();
        int attempts = 0;
        while (processes.size() < number && attempts < number * 10) {
            attempts++;
            String name = this.faker.commerce().material();
            if (existingNamesProcess.contains(name) || generatedNamesProcess.contains(name)) {
                System.out.println("Process: " + name + " is duplicate");
                continue;
            }

            Process process = new Process();
            process.setId(new BackendApplication().generateId());
            process.setName(name);
            process.setDescription(this.shortDescription());

            processes.add(process);
            generatedNamesProcess.add(name);
        }
        this.processService.saveAll(processes);
    }

    public void generateCarModel(int number) {
        List<CarModel> carModels = new ArrayList<>();
        Set<String> existingNamesCarModel = new HashSet<>(this.carModelService.getAllName());
        Set<String> generatedNamesCarModel = new HashSet<>();
        int attempts = 0;
        while (carModels.size() < number && attempts < number * 10) {
            attempts++;
            String name = this.faker.vehicle().model();
            if (existingNamesCarModel.contains(name) || generatedNamesCarModel.contains(name)) {
                System.out.println("Car Model: " + name + " is duplicate");
                continue;
            }

            CarModel carModel = new CarModel();
            carModel.setId(new BackendApplication().generateId());
            carModel.setRelease_year(this.faker.random().nextInt(1988, 2025));
            carModel.setName(name);
            carModel.setGeneration(this.faker.random().nextInt(0, 6));

            carModels.add(carModel);
            generatedNamesCarModel.add(name);
        }
        this.carModelService.saveAll(carModels);
    }

    public void generateParts(int number) {
        List<Parts> parts = new ArrayList<>();
        Set<String> existingNamesParts = new HashSet<>(this.carModelService.getAllName());
        Set<String> generatedNamesParts = new HashSet<>();
        int attempts = 0;
        while (parts.size() < number && attempts < number * 10) {
            attempts++;
            String name = this.faker.app().name();
            if (existingNamesParts.contains(name) || generatedNamesParts.contains(name)) {
                System.out.println("Part: " + name + " is duplicate");
                continue;
            }

            Parts part = new Parts();
            part.setId(new BackendApplication().generateId());
            part.setCategory(this.randomEnum(PartCategory.class));
            part.setName(name);
            part.setUnit_cost(this.faker.random().nextDouble());

            parts.add(part);
            generatedNamesParts.add(name);
        }
        this.partsService.saveAll(parts);
    }

    public void generateMachines(int number) {
        List<Machines> machines = new ArrayList<>();
        Set<String> existingNamesMachines = new HashSet<>(this.carModelService.getAllName());
        Set<String> generatedNamesMachines = new HashSet<>();
        int attempts = 0;
        while (machines.size() < number && attempts < number * 10) {
            attempts++;
            String name = this.faker.azure().virtualMachine();
            if (existingNamesMachines.contains(name) || generatedNamesMachines.contains(name)) {
                System.out.println("Machine: " + name + " is duplicate");
                continue;
            }
            Machines machine = new Machines();
            machine.setId(new BackendApplication().generateId());
            machine.setName(name);
            machine.setLast_maintenance(LocalDateTime.now());
            machine.setStatus(this.randomEnum(MachineStatus.class));
            machine.setType(this.faker.computer().type());

            machines.add(machine);
            generatedNamesMachines.add(name);
        }
        this.machinesService.saveAll(machines);
    }

    public void generateCars(int number) {
        List<Cars> cars = new ArrayList<>();
        Set<String> existingVinCars = new HashSet<>(this.carsService.getAllVin());
        Set<String> generatedVinCars = new HashSet<>();
        List<CarModel> carModels = this.carModelService.findAll();
        Set<String> exisingNameCarModel = new HashSet<>(this.carsService.getAllModel());
        Set<String> generatedNameCarModel = new HashSet<>();
        int attempts = 0;
        while (cars.size() < number && attempts < number * 10) {
            attempts++;
            String vin = this.faker.vehicle().vin();
            CarModel carModel = this.randomFromList(carModels);
            if (existingVinCars.contains(vin) || generatedVinCars.contains(vin)) {
                System.out.println("Car vin: " + vin + " is duplicate");
                continue;
            }
            if (generatedNameCarModel.contains(carModel.getName()) || exisingNameCarModel.contains(carModel.getName())) {
                System.out.println("Car model: " + carModel.getName() + " is existing in database");
                continue;
            }
            Cars car = new Cars();
            car.setId(new BackendApplication().generateId());
            car.setStatus(this.randomEnum(CarsStatus.class));
            car.setAssembly_date(LocalDateTime.now().minusMonths(120).plusDays(faker.number().numberBetween(0, 10)).plusHours(faker.number().numberBetween(0, 48)));
            car.setVin(vin);
            car.setModel_id(carModel);

            cars.add(car);
            generatedVinCars.add(vin);
            generatedNameCarModel.add(carModel.getName());
        }
        this.carsService.saveAll(cars);
    }

    public void generateCarParts(int number) {
        List<CarParts> carParts = new ArrayList<>();
        List<Employees> employees = this.employeesService.findAll();
        List<Parts> parts = this.partsService.findAll();
        List<Cars> cars = this.carsService.findAll();
        int attempts = 0;
        while (carParts.size() < number && attempts < number * 10) {
            attempts = 0;
            CarParts carPart = new CarParts();
            carPart.setId(new BackendApplication().generateId());
            carPart.setQuantity(this.faker.random().nextInt(100, 1000000));
            carPart.setInstalled_at(LocalDateTime.now().minusMonths(2).plusDays(faker.number().numberBetween(0, 10)).plusHours(faker.number().numberBetween(0, 48)));
            carPart.setInstalled_by(this.randomFromList(employees));
            carPart.setPart_id(this.randomFromList(parts));
            carPart.setCar_id(this.randomFromList(cars));

            carParts.add(carPart);
        }
        this.carsPartsService.saveAll(carParts);
    }

    public void generatePartProduction(int number) {
        List<PartProduction> partProductions = new ArrayList<>();
        List<Parts> parts = this.partsService.findAll();
        List<Machines> machines = this.machinesService.findAll();
        for (int i = 0; i < number; i++) {
            PartProduction partProduction = new PartProduction();
            partProduction.setId(new BackendApplication().generateId());
            partProduction.setQuantity(this.faker.random().nextInt(1000, 20000000));
            partProduction.setProduced_date(this.generateNowDate());
            partProduction.setPart_id(this.randomFromList(parts));
            partProduction.setMachine_id(this.randomFromList(machines));

            partProductions.add(partProduction);
        }
        this.partProductionService.saveAll(partProductions);
    }

    public void generatePartSuppliers(int number) {
        List<PartSuppliers> partSuppliers = new ArrayList<>();
        List<Suppliers> suppliers = this.suppliersService.findAll();
        List<Parts> parts = this.partsService.findAll();
        for (int i = 0; i < number; i++) {
            PartSuppliers partSupplier = new PartSuppliers();
            partSupplier.setId(new BackendApplication().generateId());
            partSupplier.setDelivery_time_days(generateNowDate());
            partSupplier.setPart_id(this.randomFromList(parts));
            partSupplier.setSupplier_id(this.randomFromList(suppliers));

            partSuppliers.add(partSupplier);
        }
        this.partSuppliersService.saveAll(partSuppliers);
    }

    public void generateProcessLog(int number) {
        //need to be Process one to one
        List<ProcessLog> processLogs = new ArrayList<>();
        List<Machines> machines = this.machinesService.findAll();
        List<Process> processes = this.processService.findAll();
        List<Employees> employees = this.employeesService.findAll();
        List<Cars> cars = this.carsService.findAll();
        while (processLogs.size() < number) {
            ProcessLog processLog = new ProcessLog();
            processLog.setId(new BackendApplication().generateId());
            processLog.setStatus(this.randomEnum(ProcessLogStatus.class));
            processLog.setMachine_id(this.randomFromList(machines));
            processLog.setProcess_id(this.randomFromList(processes));
            processLog.setEmployee_id(this.randomFromList(employees));
            processLog.setCar_id(this.randomFromList(cars));

            LocalDateTime end = this.generateEndDate();
            LocalDateTime now = this.generateNowDate();
            if (end.isBefore(now)) {
                System.out.println("End date: " + end + " " + " Now date: " + now);
                continue;
            }

            processLog.setEnd_time(this.generateEndDate());
            processLog.setStart_time(this.generateNowDate());

            processLogs.add(processLog);
        }
        this.processLogService.saveAll(processLogs);
    }

    public void generateQualityChecks(int number) throws SQLException {
        List<QualityChecks> qualityChecks = new ArrayList<>();
        List<Employees> employees = this.employeesService.findAll();
        List<Cars> cars = this.carsService.findAll();
        for (int i = 0; i < number; i++) {
            QualityChecks qualityCheck = new QualityChecks();
            qualityCheck.setId(new BackendApplication().generateId());
            qualityCheck.setCheck_date(LocalDateTime.now().minusMonths(2).plusDays(faker.number().numberBetween(0, 10)).plusHours(faker.number().numberBetween(0, 48)));
            qualityCheck.setPassed(this.faker.random().nextBoolean());
            qualityCheck.setNotes(this.shortDescription());
            qualityCheck.setInspector_id(this.randomFromList(employees));
            qualityCheck.setCar_id(this.randomFromList(cars));

            qualityChecks.add(qualityCheck);
        }
        this.qualityChecksService.saveAll(qualityChecks);
    }


    private LocalDateTime generateNowDate() {
        return LocalDateTime.now().plusMonths(2).plusDays(faker.number().numberBetween(0, 10)).plusHours(faker.number().numberBetween(0, 48));
    }

    private LocalDateTime generateEndDate() {
        return LocalDateTime.now().plusMonths(5).plusDays(faker.number().numberBetween(0, 10)).plusHours(faker.number().numberBetween(0, 48));

    }

    private Blob shortDescription() throws SQLException {
        String paragraph = faker.lorem().paragraph(5);
//        return paragraph.length() > 200 ? paragraph.substring(0, 198) + "..." : paragraph;
        return new SerialBlob(paragraph.getBytes());
    }
}