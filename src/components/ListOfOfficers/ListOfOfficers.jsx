import React, { useEffect } from "react";
import { connect } from "react-redux";
import { useNavigate } from "react-router-dom";
import css from "./ListOfOfficers.module.css";
import employees from "../../assets/icons/employees.svg";
import {
  deleteOfficer,
  getAllOfficers,
} from "../../store/reducers/officersReducer";
import { deleteOfficerSuccess } from "../../store/actions";

const ListOfOfficers = (props) => {
  const { officers, getAllOfficers, handleClick } = props;

  const navigate = useNavigate();

  useEffect(() => {
    getAllOfficers();
  }, []);

  const handleRowClick = (id, e) => {
    navigate(`/officers/${id}`);
    // e.preventDefault();
  };

  const handleButtonClick = (id) => {
    deleteOfficer(id);
  };

  return (
      <div className={css.wrapper}>
        <table className="table table-hover">
          <thead>
          <tr>
            <th scope="col">
              <img src={employees} />
            </th>
          </tr>
          </thead>
          <tbody>
          {officers &&
              officers.map((item, index) => {
                return (
                    <tr
                        className={css.cursor}
                        key={item._id}
                        onClick={() => handleRowClick(item._id)}
                    >
                      <th scope="row" className={css.thIndex}>
                        {index + 1}
                      </th>
                      <td className={css.td1}>
                        {!item.firstName || !item.lastName
                            ? "First and last names are not provided"
                            : `${item.firstName} ${item.lastName}`}
                      </td>
                      <td className={css.td1}>{item.email}</td>
                      <th className={css.thButton}>
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
      return { officers: state.officersReducer.officers };
    },
    (dispatch) => {
      return {
        getAllOfficers: () => dispatch(getAllOfficers()),
        deleteOfficer: (id) => dispatch(deleteOfficer(id)),
      };
    }
)(ListOfOfficers);
