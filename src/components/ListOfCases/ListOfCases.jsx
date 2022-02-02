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
    // e.preventDefault();
  };

  const handleButtonClick = (e, id) => {
    // e.preventDefault();
    // e.stopPropagation();
    deleteCase(id);
  };
  return (
      <div className={css.wrapper}>
        <table className="table table-hover">
          <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">License Number</th>
            <th scope="col">Type</th>
            <th scope="col">Color</th>
            <th scope="col">Description</th>
          </tr>
          </thead>

          <tbody>
          {cases &&
              cases.map((item, index) => {
                return (
                    <tr
                        className={css.cursor}
                        key={item._id}
                        onClick={() => handleRowClick(item._id)}
                    >
                      <th scope="row">{index + 1}</th>

                      <td className={css.td1}>{item.licenseNumber}</td>

                      <td className={css.td2}>{item.type}</td>

                      <td className={css.td3}>{item.color}</td>

                      <td className={css.td4}>{item.description}</td>
                      <th>
                        <button
                            type="button"
                            className="btn btn-outline-primary btn-sm"
                            id={item._id}
                            onClick={() => handleButtonClick(item._id)}
                        >
                          Delete
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
