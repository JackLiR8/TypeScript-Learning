
abstract class Department {
  constructor(public name: string) {}

  printName(): void {
    console.log(`Department Name: ${this.name}`)
  }

  abstract printMeeting(): void
}

class ITDepartment extends Department {
  constructor() {
    super('IT')
  }

  printMeeting(): void {
    console.log('The IT Department meets each Monday at 10am.')
  }

  generateReports(): void {
    console.log("Generating accounting reports...");
  }
}

let department: Department
// department = new Department()
department = new ITDepartment()
department.printName()
department.printMeeting()
// department.generateReports()

class PointT {
  x: number;
  y: number;
}

interface P extends PointT {
  z: number
  [prop: string]: number
}

let pp: P = { x: 1, y: 2, z: 3}