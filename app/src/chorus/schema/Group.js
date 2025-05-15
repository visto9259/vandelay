function Group(data) {
  this.description = data.description;
  this.id = data.id;
  this.name = data.name;
  this.getId = () => this.id;
  this.getName = () => this.name;
  this.getDescription = () => this.description;
  this.serialize = () => {
    return {
      id: this.id,
      name: this.name,
      description: this.description,
    };
  }
}

export default Group;