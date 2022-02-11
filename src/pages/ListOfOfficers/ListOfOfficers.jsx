import React, { useEffect } from "react";
import { connect } from "react-redux";
import { useNavigate } from "react-router-dom";
import css from "./ListOfOfficers.module.css";
import employees from "../../assets/icons/employeesIcon.svg";
import {
  deleteOfficer,
  getAllOfficers,
} from "../../store/reducers/officersReducer";
import SecondaryButton from "../../components/SecondaryButton";
import LoadingSpinner from "../../components/LoadingSpinner/LoadingSpinner";
import Message from "../../components/Message/Message";
import { handleClickMessageButton } from "../../store/reducers/officersReducer";

const ListOfOfficers = (props) => {
  const {
    officers,
    getAllOfficers,
    deleteOfficer,
    isLoading,
    message,
    handleClickMessageButton,
  } = props;

  const navigate = useNavigate();

  useEffect(() => {
    getAllOfficers();
  }, []);

  const handleRowClick = (id, e) => {
    navigate(`/officers/${id}`);
    e.preventDefault();
  };

  const handleButtonClick = (id, e) => {
    deleteOfficer(id);
    e.stopPropagation();
  };

  const handleClickMessage = () => {
    navigate(`/`);
    handleClickMessageButton();
  };

  return (
    <div className={css.wrapper}>
      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <>
          {message ? (
            <Message message={message} onClick={handleClickMessage} />
          ) : (
            <table className="table table-hover">
              <thead>
                <tr>
                  <th scope="col">
                    <img src={employees} icon={"Employee"} />
                  </th>
                  <th>Имя</th>
                  <th>E-mail</th>
                  <th className={css.theadCell3}>Одобрен</th>
                </tr>
              </thead>
              <tbody>
                {officers &&
                  officers.map((item, index) => {
                    return (
                      <tr
                        className={css.cursor}
                        key={item._id}
                        onClick={(e) => handleRowClick(item._id, e)}
                      >
                        <th scope="row" className={css.cell1}>
                          {index + 1}
                        </th>
                        <td className={css.cell2}>
                          {!item.firstName && !item.lastName
                            ? `Имя и фамилия не введены`
                            : `${
                                item.firstName && item.lastName
                                  ? `${item.firstName} ${item.lastName}`
                                  : `${item.firstName || item.lastName}`
                              }`}
                        </td>
                        <td className={css.cell3}>{item.email}</td>
                        <td className={css.cell4}>
                          <div
                            className={`form-check form-switch ${css.switchInput}`}
                          >
                            <input
                              className="form-check-input"
                              type="checkbox"
                              name={"approved"}
                              defaultChecked={item.approved}
                            />
                          </div>
                        </td>
                        <th className={css.cell5}>
                          <SecondaryButton
                            title={"Удалить"}
                            type={"button"}
                            className="btn-sm"
                            onClick={(e) => handleButtonClick(item._id, e)}
                          />
                        </th>
                      </tr>
                    );
                  })}
              </tbody>
            </table>
          )}
        </>
      )}
    </div>
  );
};
export default connect(
  (state) => {
    return {
      officers: state.officersReducer.officers,
      isLoading: state.officersReducer.isLoading,
      message: state.officersReducer.message,
    };
  },
  (dispatch) => {
    return {
      getAllOfficers: () => dispatch(getAllOfficers()),
      deleteOfficer: (id) => dispatch(deleteOfficer(id)),
      handleClickMessageButton: () => dispatch(handleClickMessageButton()),
    };
  }
)(ListOfOfficers);
