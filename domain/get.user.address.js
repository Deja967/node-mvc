module.exports = class getUserAddress {
  constructor(address, unit, city, state, zip_code) {
    this.address = address;
    this.unit = unit;
    this.city = city;
    this.state = state;
    this.zip_code = zip_code;
  }

  getAddress() {
    return this.address;
  }

  setAddress(address) {
    return this.address;
  }

  getUnit() {
    return this.unit;
  }

  setUnit(unit) {
    return this.unit;
  }

  getCity() {
    return this.city;
  }

  setCity(city) {
    return this.city;
  }

  getState() {
    return this.state;
  }

  setState(state) {
    return this.state;
  }

  getZip() {
    return this.zip_code;
  }

  setZip(zip_code) {
    return this.zip_code;
  }
};
