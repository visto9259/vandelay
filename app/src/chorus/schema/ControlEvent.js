function ControlEvent(data){
  this.id = data.id;
  this.remote = data.remote;
  this.timestamp = data.timestamp;
  this.content = data.content;
}

export default ControlEvent;