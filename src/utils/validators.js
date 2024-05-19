const Validate = {
  password: (value) => /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$*])^[^\s]*$/.test(value),
  email: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
};

export default Validate;
