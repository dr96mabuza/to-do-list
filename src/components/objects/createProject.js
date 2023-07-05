import { parse } from "date-fns";
import { uniqid } from "uniqid";

class createProject {

    /**
     * create new project object.
     * @param { String } name 
     * @param { String } discription 
     * @param { String } dueDate 
     * @param { String } priority 
     */
    constructor (name, discription, dueDate, priority) {
        this._name = name;
        this._discription = discription;
        this._dueDate = parse(dueDate, "yyyy-MM-dd", new Date());
        this._priority = priority;
        this._id = uniqid.process();
        this._dateCreated = new Date();
        this._dateUpdated = new Date();
        this._completed = false;
        // this.tasks = tasks;
    }

    /**
     * returns project name.
     * @returns { String }
     */
    getName() {return this._name;};

    /**
     * retuns the project discription.
     * @returns { String }
     */
    getDiscription() {return this._discription;};

    /**
     * returns the current project due date.
     * @returns { Date }
     */
    getDueDate() { return this._dueDate; };
    
    /**
     * get project due date as a string and convert to {Date}.
     * @param { String } newDueDate 
     */
    setDueDate(newDueDate) {
        this._dueDate = parse(newDueDate, "yyyy-MM-dd", new Date());
    };
    
    /**
     * returns the current project priority.
     * @returns { String }
     */
    getPriority() { return this._priority; };
    
    /**
     * change the priority of the project.
     * @param { String } priority 
     */
    setPriority(priority) {this._priority = priority;};
    
    /**
     * return project id.
     * @returns { uniqid } 
     */
    getId() {return this._id; };
    
    /**
     * set new date when ever the project gets updated.
     * @param { Date } dateUpdated 
     */
    setDateUpdated(dateUpdated) {this._dateUpdated = dateUpdated; };
    
    /**
     * get the state of the project if completed or not.
     * @returns { Boolean } 
     */
    getCompleted() {return this._completed;};
    
    /**
     * set project completed, true if completed. false if not.
     * @param { Boolean } completed 
     */
    setCompleted(completed) {this._completed = completed;};
}

export {createProject};