import { departments } from "../../../../data/data";
import './department.css'
const Department = () => {
  return (
    <div className="department-container">
      <div className="department-header">
        <h2>Departments</h2>
      </div>
      <div className="department-list">
        {departments.map((dept) => (
          <div key={dept.id} className="department-item">
            <div className="icon">{dept.icon}</div>
            <p>{dept.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Department;