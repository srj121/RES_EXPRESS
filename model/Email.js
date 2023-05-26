class Email {
  constructor() {
    this._emailTo = '';
  }

  get emailTo() {
    return this._emailTo;
  }

  set emailTo(value) {
    this._emailTo = value;
  }
}
