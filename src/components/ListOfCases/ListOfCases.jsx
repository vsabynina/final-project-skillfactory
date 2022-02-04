import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { connect } from "react-redux";
import css from "./ListOfCases.module.css";
import { deleteCase, getAllCases } from "../../store/reducers/casesReducer";

const ListOfCases = (props) => {
  const { cases, getAllCases, deleteCase } = props;

  const navigate = useNavigate();

  useEffect(() => {
    getAllCases();
  }, []);

  const handleRowClick = (id, e) => {
    navigate(`/cases/${id}`);
    e.stopPropagation();
  };

  const handleButtonClick = (id, e) => {
    deleteCase(id);
    e.stopPropagation();
  };
  return (
    <div className={css.wrapper}>
      <table className="table table-hover">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Лицензионный номер</th>
            <th scope="col">Тип</th>
            <th scope="col">Цвет</th>
            <th scope="col">Описание</th>
          </tr>
        </thead>

        <tbody>
          {cases.map((item, index) => {
            return (
              <tr
                className={css.cursor}
                key={item._id}
                onClick={(e) => handleRowClick(item._id, e)}
              >
                <th scope="row" className={css.cell1}>
                  {index + 1}
                </th>

                <td className={css.cell2}>{item.licenseNumber}</td>

                <td className={css.cell3}>
                  {(item.type === "sport" && "Sport") ||
                    (item.type === "general" && "General")}
                </td>

                <td className={css.cell4}>{item.color}</td>

                <td className={css.cell5}>{item.description}</td>
                <th className={css.cell6}>
                  <button
                    type="button"
                    className="btn btn-outline-primary btn-sm"
                    id={item._id}
                    onClick={(e) => handleButtonClick(item._id, e)}
                  >
                    Удалить
                  </button>
                </th>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};
export default connect(
  (state) => {
    return { cases: state.casesReducer.cases };
  },
  (dispatch) => {
    return {
      deleteCase: (id) => dispatch(deleteCase(id)),
      getAllCases: () => dispatch(getAllCases()),
    };
  }
)(ListOfCases);
