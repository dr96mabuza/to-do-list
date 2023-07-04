import { parse } from "date-fns";
import uniqid from "uniqid";

class createProject {

    /**
     * create new project object.
     * @param {string} name 
     * @param {string} discription 
     * @param {string} dueDate 
     * @param {string} priority 
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
     * @returns {string}
     */
    getName() {return this._name;};

    /**
     * retuns the project discription.
     * @returns {string}
     */
    getDiscription() {return this._discription;};

    /**
     * returns the current project due date.
     * @returns {Date}
     */
    getDueDate() { return this._dueDate; };
    
    /**
     * get project due date as a string and convert to {Date}.
     * @param {string} newDueDate 
     */
    setDueDate(newDueDate) {
        this._dueDate = parse(newDueDate, "yyyy-MM-dd", new Date());
    };
    
    /**
     * returns the current project priority.
     * @returns {string}
     */
    getPriority() { return this._priority; };
    
    /**
     * change the priority of the project.
     * @param {string} priority 
     */
    setPriority(priority) {this._priority = priority;};
    
    /**
     * return project id.
     * @returns {uniqid} 
     */
    getId() {return this._id; };
    
    /**
     * set new date when ever the project gets updated.
     * @param {Date} dateUpdated 
     */
    setDateUpdated(dateUpdated) {this._dateUpdated = dateUpdated; };
    
    /**
     * get the state of the project if completed or not.
     * @returns {boolean} 
     */
    getCompleted() {return this._completed;};
    
    /**
     * set project completed, true if completed. false if not.
     * @param {boolean} completed 
     */
    setCompleted(completed) {this._completed = completed;};
}

export {createProject};