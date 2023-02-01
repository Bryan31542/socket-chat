class Users {

    constructor() {
        this.people = [];
    }

    addPerson(id, name) {
        let person = { id, name };
        
        this.people.push(person);

        return this.people;
    }

    getPerson(id) { 
        let person = this.people.filter(p => p.id === id)[0];

        return person;
    }

    getPeople() { 
        return this.people;
    }

    getPersonForRoom(room) { 
        // todo
    }

    deletePerson(id) { 

        let personDeleted = this.getPerson(id);

        this.people = this.people.filter(p => p.id !== id);

        return personDeleted; 
    }
}

module.exports = Users;