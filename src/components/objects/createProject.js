import { parse } from "date-fns";
import uniqid from "uniqid";

class createProject {
    constructor (name, discription, dueDate, priority) {
        this._name = name;
        this._discription = discription;
        this._dueDate = parse(dueDate, "yyyy-MM-dd", new Date());
        this._priority = priority;
        this._id = uniqid();
        this._dateCreated = new Date();
        this._dateUpdated = new Date();
        // this.tasks = tasks;
    }

    getName() {return this._name;};
    getDiscription() {return this._discription;};
    getDueDate() { return this._dueDate; };
    setDueDate(newDueDate) {
        this._dueDate = parse(newDueDate, "yyyy-MM-dd", new Date());
    };
    getPriority() { return this._priority; };
    setPriority(priority) {this._priority = priority;};
    getId() {return this._id; };
    setDateUpdated(dateUpdated) {this._dateUpdated = dateUpdated; };
}

export {createProject};