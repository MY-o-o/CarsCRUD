import "./Input.css";

function Input({ label, name, type = "text", value, onChange, required, ...rest }) {
  return (
    <div className="input-group">
      <label htmlFor={name}>{label}</label>
      <input
        id={name}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        required={required}
        className="input-field"
        {...rest}
      />
    </div>
  );
}

export default Input;
