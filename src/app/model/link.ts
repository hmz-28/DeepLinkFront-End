export class Link {
  id: number;
  linkname: String;
  linkvalue: String;
  cryptedlinkvalue:string;
  customer: String;
  environment: String;
  editedby: String;
  modificationdate: Date;
  status: String;
  description: String;
  profile:string;


  constructor(id: number, linkname: String, linkvalue: String, customer: String, environment: String, editedby: String, modificationdate: Date, status: String, description: String, profile: string) {
    this.id = id;
    this.linkname = linkname;
    this.linkvalue = linkvalue;
    this.customer = customer;
    this.environment = environment;
    this.editedby = editedby;
    this.modificationdate = modificationdate;
    this.status = status;
    this.description = description;
    this.profile = profile;
  }
}
