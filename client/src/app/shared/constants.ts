export class Constants {
  // tslint:disable-next-line:max-line-length
  public static regex: RegExp = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  public static firstName = 'Please enter first name';
  public static lastName = 'Please enter last name';
  public static email = 'Please enter a valid email id.';
  public static contact = 'Please enter valid mobile no.';
  public static address = 'Please enter valid address';
  public static profileImage = 'Please add profile image';

  public static columns = ['firstName', 'lastName', 'email', 'phoneNumber', 'profileImage'];

  // response
  public static success = 'success';
  public static failed = 'failed';
  public static userAdded = 'User Added';
  public static taskFailed = 'Task Failed';
  public static formError = 'Form Error';

  public static validateEmail(email: string): boolean {
    const re = Constants.regex;
    return re.test(String(email).toLowerCase());
  }

  // warnings
  public static getWarnings(field) {
    let warn = '';
    if (field === 'email') {
      warn = this.email;
    } else if (field === 'firstName') {
      warn = this.firstName;
    } else if (field === 'secondName') {
      warn = this.lastName;
    } else if (field === 'contact') {
      warn = this.contact;
    } else if (field === 'address') {
      warn = this.address;
    } else if (field === 'profileImage') {
      warn = this.profileImage;
    } else {
      warn = 'Form Error';
    }
    return warn;
  }
}
